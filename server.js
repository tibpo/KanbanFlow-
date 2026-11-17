const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { execFile } = require('child_process');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = __dirname;
const DATA_DIR = path.join(PUBLIC_DIR, 'data');
const DATA_FILE = path.join(DATA_DIR, 'kanban.json');

// Pastas locais que a landing pode abrir no gerenciador de arquivos do sistema.
// Lista branca fixa: nada fora destes diretórios pode ser aberto pela API.
const MODULE_DIRECTORIES = {
  servidor: 'modulos/servidor',
  nuvem: 'modulos/nuvem',
  motion: 'modulos/motion',
  fila: 'modulos/fila',
  urgente: 'modulos/urgente',
  reativo: 'modulos/reativo'
};

// Ensure data folder and initial json file exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Memory cache for fast reads and writes
let sharedData = { projects: [], tasks: [] };

function loadDataFromFile() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, 'utf8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed.projects) && Array.isArray(parsed.tasks)) {
        sharedData = parsed;
        return;
      }
    }
  } catch (err) {
    console.error('Erro ao ler data/kanban.json:', err);
  }
}

function saveDataToFile() {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(sharedData, null, 2), 'utf8');
  } catch (err) {
    console.error('Erro ao salvar data/kanban.json:', err);
  }
}

loadDataFromFile();

// Connected SSE clients
const sseClients = new Set();

function broadcastEvent(eventName, payload) {
  const message = `event: ${eventName}\ndata: ${JSON.stringify(payload)}\n\n`;
  for (const client of sseClients) {
    try {
      client.write(message);
    } catch (err) {
      sseClients.delete(client);
    }
  }
}

// Keepalive heartbeat every 20 seconds
setInterval(() => {
  for (const client of sseClients) {
    try {
      client.write(': ping\n\n');
    } catch {
      sseClients.delete(client);
    }
  }
}, 20000);

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  // CORS headers to facilitate local network testing
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    return res.end();
  }

  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = parsedUrl.pathname;

  // ================= API: Server-Sent Events (SSE) =================
  if (pathname === '/api/events' && req.method === 'GET') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive'
    });

    res.write(`event: connected\ndata: ${JSON.stringify({ clientCount: sseClients.size + 1 })}\n\n`);
    sseClients.add(res);

    broadcastEvent('presence', { count: sseClients.size });

    req.on('close', () => {
      sseClients.delete(res);
      broadcastEvent('presence', { count: sseClients.size });
    });
    return;
  }

  // ================= API: Get Current State =================
  if (pathname === '/api/state' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    return res.end(JSON.stringify({
      success: true,
      data: sharedData,
      connectedUsers: sseClients.size
    }));
  }

  // ================= API: Update State & Broadcast =================
  if (pathname === '/api/state' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const payload = JSON.parse(body);
        const { senderId, data } = payload;

        if (!data || !Array.isArray(data.projects) || !Array.isArray(data.tasks)) {
          res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
          return res.end(JSON.stringify({ success: false, error: 'Dados inválidos' }));
        }

        // Update in-memory state and save to disk
        sharedData = {
          projects: data.projects,
          tasks: data.tasks
        };
        saveDataToFile();

        // Broadcast change in real-time to all other connected clients
        broadcastEvent('sync', {
          senderId: senderId || 'anonymous',
          data: sharedData,
          timestamp: Date.now()
        });

        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ success: true, timestamp: Date.now() }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ success: false, error: err.message }));
      }
    });
    return;
  }

  // ================= API: Reset State & Broadcast =================
  if (pathname === '/api/reset' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const payload = JSON.parse(body || '{}');
        const defaultData = payload.data || { projects: [], tasks: [] };

        sharedData = defaultData;
        saveDataToFile();

        broadcastEvent('sync', {
          senderId: payload.senderId || 'system',
          data: sharedData,
          timestamp: Date.now(),
          isReset: true
        });

        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ success: true }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ success: false, error: err.message }));
      }
    });
    return;
  }

  // ================= API: Signal Pulse (ping do canal em tempo real) =================
  if (pathname === '/api/ping' && req.method === 'GET') {
    res.writeHead(200, {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store, no-cache, must-revalidate'
    });
    return res.end(JSON.stringify({
      success: true,
      timestamp: Date.now(),
      port: Number(PORT),
      clients: sseClients.size,
      storage: DATA_FILE
    }));
  }

  // ================= API: Abrir a pasta de um módulo no Explorer/Finder =================
  if (pathname === '/api/open-directory' && req.method === 'POST') {
    const remote = (req.socket.remoteAddress || '').replace('::ffff:', '');
    const isLocalMachine = remote === '127.0.0.1' || remote === '::1' || remote === 'localhost';

    if (!isLocalMachine) {
      res.writeHead(403, { 'Content-Type': 'application/json; charset=utf-8' });
      return res.end(JSON.stringify({
        success: false,
        error: 'Por segurança, abrir pastas no sistema só é permitido na própria máquina que roda o servidor.'
      }));
    }

    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const payload = JSON.parse(body || '{}');
        const relative = MODULE_DIRECTORIES[payload.module];

        if (!relative) {
          res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
          return res.end(JSON.stringify({ success: false, error: 'Módulo desconhecido.' }));
        }

        const targetDir = path.resolve(PUBLIC_DIR, relative);
        if (!targetDir.startsWith(PUBLIC_DIR) || !fs.existsSync(targetDir)) {
          res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
          return res.end(JSON.stringify({ success: false, error: 'Pasta do módulo não encontrada.', path: targetDir }));
        }

        const opener = process.platform === 'win32'
          ? 'explorer.exe'
          : (process.platform === 'darwin' ? 'open' : 'xdg-open');

        execFile(opener, [targetDir], (err) => {
          // No Windows o explorer.exe pode retornar código 1 mesmo abrindo a pasta;
          // só tratamos como falha quando o executável não existe.
          if (err && err.code === 'ENOENT') {
            res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
            return res.end(JSON.stringify({
              success: false,
              error: `Nenhum gerenciador de arquivos disponível (${opener}).`,
              path: targetDir
            }));
          }

          res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
          res.end(JSON.stringify({
            success: true,
            module: payload.module,
            relative,
            path: targetDir,
            opener
          }));
        });
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ success: false, error: err.message }));
      }
    });
    return;
  }

  // ================= Static File Serving =================
  let safePath = path.normalize(decodeURI(pathname));
  if (safePath === '/' || safePath === '\\') {
    safePath = '/index.html';
  }

  const filePath = path.join(PUBLIC_DIR, safePath);

  // Security check: ensure path is inside PUBLIC_DIR
  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    return res.end('403 Proibido');
  }

  fs.stat(filePath, (err, stats) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      return res.end('404 Não Encontrado');
    }

    const resolvedFile = stats.isDirectory() ? path.join(filePath, 'index.html') : filePath;
    if (stats.isDirectory() && !resolvedFile.startsWith(PUBLIC_DIR)) {
      res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
      return res.end('403 Proibido');
    }

    const ext = path.extname(resolvedFile).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'no-cache'
    });

    const stream = fs.createReadStream(resolvedFile);
    stream.on('error', () => {
      if (!res.headersSent) {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      }
      res.end('404 Não Encontrado');
    });
    stream.pipe(res);
  });
});

// Find local network IP
function getLocalIp() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
}

server.listen(PORT, '0.0.0.0', () => {
  const localIp = getLocalIp();
  console.log(`\n=============================================================`);
  console.log(`🚀 KanbanFlow - Servidor em Tempo Real Ativo!`);
  console.log(`📡 Local:        http://localhost:${PORT}`);
  console.log(`👥 Rede Local:   http://${localIp}:${PORT} (Compartilhe com a equipe)`);
  console.log(`📂 Armazenamento: ${DATA_FILE}`);
  console.log(`⚡ Sincronização em tempo real (SSE) ativada.`);
  console.log(`Pressione Ctrl+C para encerrar.`);
  console.log(`=============================================================\n`);
});

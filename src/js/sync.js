/**
 * sync.js - Cliente de Sincronização em Tempo Real (Server-Sent Events + API)
 */

class SyncManager {
  constructor() {
    this.clientId = 'client_' + Math.random().toString(36).substring(2, 10);
    this.eventSource = null;
    this.status = 'offline'; // 'connected' | 'connecting' | 'offline'
    this.connectedUsers = 1;
    this.pushDebounceTimer = null;
    this.isReceivingRemote = false;
    this.onStatusChangeCallbacks = [];
  }

  /**
   * Registra callback para alterações de status de conexão.
   */
  onStatusChange(callback) {
    this.onStatusChangeCallbacks.push(callback);
  }

  notifyStatus() {
    this.onStatusChangeCallbacks.forEach(cb => {
      try {
        cb({ status: this.status, count: this.connectedUsers });
      } catch (err) {
        console.error('Erro no callback de status:', err);
      }
    });
  }

  /**
   * Inicializa o canal em tempo real se executado via HTTP/HTTPS.
   */
  async init(state, onRemoteChange) {
    // Se for aberto diretamente via file://, a sincronização servidor fica desativada
    if (window.location.protocol !== 'http:' && window.location.protocol !== 'https:') {
      this.status = 'offline';
      this.notifyStatus();
      return;
    }

    // Se estiver hospedado em servidor estático (ex.: GitHub Pages)
    if (window.location.hostname.endsWith('github.io')) {
      this.status = 'static';
      this.notifyStatus();
      return;
    }

    this.status = 'connecting';
    this.notifyStatus();

    // 1. Carrega o estado atual mais recente do servidor
    try {
      const res = await fetch('/api/state');
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data && Array.isArray(json.data.projects)) {
          this.isReceivingRemote = true;
          state.applyRemoteState(json.data);
          this.isReceivingRemote = false;
        }
      } else {
        // Se a API não existir (ambiente estático como GitHub Pages ou Vercel sem backend)
        this.status = 'static';
        this.notifyStatus();
        return;
      }
    } catch (err) {
      this.status = 'static';
      this.notifyStatus();
      return;
    }

    // 2. Conecta ao fluxo SSE para receber alterações em tempo real de outros usuários
    this.connectSSE(state, onRemoteChange);
  }

  connectSSE(state, onRemoteChange) {
    try {
      if (this.eventSource) {
        this.eventSource.close();
      }

      this.eventSource = new EventSource('/api/events');

      this.eventSource.addEventListener('connected', (e) => {
        this.status = 'connected';
        try {
          const info = JSON.parse(e.data);
          if (info.clientCount) this.connectedUsers = info.clientCount;
        } catch {}
        this.notifyStatus();
      });

      this.eventSource.addEventListener('presence', (e) => {
        try {
          const info = JSON.parse(e.data);
          if (info.count !== undefined) {
            this.connectedUsers = info.count;
            this.notifyStatus();
          }
        } catch {}
      });

      this.eventSource.addEventListener('sync', (e) => {
        try {
          const payload = JSON.parse(e.data);

          // Ignora mensagens enviadas por esta mesma janela para evitar loops
          if (payload.senderId === this.clientId) {
            return;
          }

          if (payload.data && Array.isArray(payload.data.projects)) {
            this.isReceivingRemote = true;
            state.applyRemoteState(payload.data);
            this.isReceivingRemote = false;

            if (typeof onRemoteChange === 'function') {
              onRemoteChange(payload);
            }
          }
        } catch (err) {
          console.error('Erro ao processar evento de sincronização:', err);
        }
      });

      this.eventSource.onerror = () => {
        this.status = 'connecting';
        this.notifyStatus();
      };
    } catch (err) {
      console.warn('Falha ao iniciar EventSource:', err);
      this.status = 'offline';
      this.notifyStatus();
    }
  }

  /**
   * Envia as alterações locais para o servidor para que todos os clientes recebam.
   */
  broadcastState(data) {
    // Se a alteração veio de outro cliente, não reenviamos
    if (this.isReceivingRemote) return;
    if (window.location.protocol !== 'http:' && window.location.protocol !== 'https:') return;

    clearTimeout(this.pushDebounceTimer);
    this.pushDebounceTimer = setTimeout(async () => {
      try {
        await fetch('/api/state', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            senderId: this.clientId,
            data: {
              projects: data.projects,
              tasks: data.tasks
            }
          })
        });
      } catch (err) {
        console.warn('Erro ao sincronizar com servidor:', err);
      }
    }, 60);
  }

  /**
   * Envia comando de restauração para o servidor.
   */
  async broadcastReset(defaultData) {
    if (window.location.protocol !== 'http:' && window.location.protocol !== 'https:') return;
    try {
      await fetch('/api/reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          senderId: this.clientId,
          data: defaultData
        })
      });
    } catch (err) {
      console.warn('Erro ao sincronizar reset:', err);
    }
  }
}

export const sync = new SyncManager();

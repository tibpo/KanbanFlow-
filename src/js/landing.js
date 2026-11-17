/**
 * landing.js - Controle da Landing Page com Seletor Circular (Motion Frame), LEDs e Navegação por Módulos
 */

import { state } from './state.js';
import { sync } from './sync.js';
import { modal } from './modal.js';
import { UniverseBackground } from './universe.js';

const MODULES_INFO = {
  servidor: {
    key: 'servidor',
    name: 'Servidor HTTP + SSE (Tempo Real)',
    ledClass: 'led-green',
    color: '#10b981',
    directory: 'modulos/servidor/',
    page: 'modulos/servidor/index.html',
    board: { columnId: null, priority: 'all' },
    description: 'Servidor backend nativo em Node.js com transmissão contínua de eventos Server-Sent Events (SSE). Conecta múltiplas janelas e dispositivos locais na porta 3000 com gravação atômica em disco.',
    telemetry: () => [
      { label: 'Porta Ativa', val: '3000' },
      { label: 'Protocolo', val: 'HTTP/1.1 + SSE' },
      { label: 'Clientes Online', val: `${sync.connectedUsers || 1} Conexão(ões)` },
      { label: 'Precisão', val: '< 5ms (Tempo Real)' }
    ]
  },
  nuvem: {
    key: 'nuvem',
    name: 'Sincronização & Broadcast em Nuvem',
    ledClass: 'led-cyan',
    color: '#06b6d4',
    directory: 'modulos/nuvem/',
    page: 'modulos/nuvem/index.html',
    board: { columnId: null, priority: 'all', refresh: true },
    description: 'Controlador de sincronização em tempo real. Intercepta mutações locais, aplica debouncing inteligente de 60ms e sincroniza o estado em todas as instâncias ativas sem necessidade de refresh.',
    telemetry: () => [
      { label: 'Endpoint', val: '/api/events' },
      { label: 'Status da Nuvem', val: sync.status === 'connected' ? '🟢 Conectado' : '🟡 Local' },
      { label: 'Debounce Buffer', val: '60ms' },
      { label: 'Canal', val: 'Bidirecional' }
    ]
  },
  motion: {
    key: 'motion',
    name: 'Motor de Movimento Orbital (Motion Frame)',
    ledClass: 'led-purple',
    color: '#a855f7',
    directory: 'modulos/motion/',
    page: 'modulos/motion/index.html',
    board: { columnId: null, priority: 'all' },
    description: 'Renderizador matemático de órbitas circulares. Distribui os nós de projetos equidistantemente em 360 graus e sincroniza 3 anéis concêntricos contra-rotativos acelerados por hardware.',
    telemetry: () => [
      { label: 'Taxa de Quadros', val: '60 FPS Fluido' },
      { label: 'Raio de Órbita', val: '175px' },
      { label: 'Anéis Ativos', val: '3 Concéntricos' },
      { label: 'Aceleração', val: 'GPU Hardware' }
    ]
  },
  fila: {
    key: 'fila',
    name: 'Fila de Tarefas & Banco JSON Local',
    ledClass: 'led-amber',
    color: '#f59e0b',
    directory: 'modulos/fila/',
    page: 'modulos/fila/index.html',
    board: { columnId: 'todo', priority: 'all' },
    description: 'Armazenamento persistente estruturado no diretório local data/kanban.json. Mantém os dados unificados e sincronizados entre todos os membros conectados.',
    telemetry: () => [
      { label: 'Tarefas na Fila', val: `${(state.tasks || []).length} Tarefas` },
      { label: 'Projetos Carregados', val: `${(state.projects || []).length} Projetos` },
      { label: 'Arquivo Local', val: 'data/kanban.json' },
      { label: 'Persistência', val: 'Automática' }
    ]
  },
  urgente: {
    key: 'urgente',
    name: 'Módulo de Prioridade Alta & Auditoria',
    ledClass: 'led-red',
    color: '#ef4444',
    directory: 'modulos/urgente/',
    page: 'modulos/urgente/index.html',
    board: { columnId: 'in_progress', priority: 'urgent' },
    description: 'Sistema de monitoramento e auditoria de demandas críticas. Detecta automaticamente prazos em atraso e tarefas urgentes, destacando-as com micro-LEDs rubi de alta visibilidade.',
    telemetry: () => {
      const urgentCount = (state.tasks || []).filter(t => t.priority === 'urgent').length;
      return [
        { label: 'Demandas Urgentes', val: `${urgentCount} Crítica(s)` },
        { label: 'Alerta de Prazo', val: 'Ativo' },
        { label: 'Notificação', val: 'Toast em Tela' },
        { label: 'Auditoria', val: 'Em Tempo Real' }
      ];
    }
  },
  reativo: {
    key: 'reativo',
    name: 'Interface Reativa, LEDs & Cursor LERP',
    ledClass: 'led-pink',
    color: '#ec4899',
    directory: 'modulos/reativo/',
    page: 'modulos/reativo/index.html',
    board: { columnId: null, priority: 'all' },
    description: 'Camada interativa com física de amortecimento LERP no cursor do mouse, botões 3D cibernéticos e diodos LED cintilantes sincronizados dinamicamente.',
    telemetry: () => [
      { label: 'Física do Cursor', val: 'LERP Suave (0.22)' },
      { label: 'Cintilação de LEDs', val: 'Descompassada' },
      { label: 'Botões', val: '3D Cyber-Glass' },
      { label: 'Tema', val: state.theme === 'dark' ? 'Escuro Neon' : 'Claro' }
    ]
  }
};

class LandingController {
  constructor() {
    this.overlay = null;
    this.isOpen = false;
    this.selectedNodeId = null;
    this.activeModule = 'servidor';
  }

  init() {
    this.overlay = document.getElementById('landingOverlay');
    this.coreElement = document.getElementById('circularCore');
    this.coreTitle = document.getElementById('coreTitle');
    this.coreMeta = document.getElementById('coreMeta');
    this.coreIcon = document.getElementById('coreIcon');
    this.nodesContainer = document.getElementById('circularNodesContainer');
    this.inspectorBody = document.getElementById('inspectorBody');
    this.inspectorActiveTag = document.getElementById('inspectorActiveTag');
    this.modulesInspector = document.getElementById('modulesInspector');
    this.ledRailLeft = document.getElementById('ledRailLeft');
    this.ledRailRight = document.getElementById('ledRailRight');
    this.stageElement = document.querySelector('.circular-stage');
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Ambiente 3D imersivo de universo (inicia apenas quando a landing abre)
    this.universeCanvas = document.getElementById('universeCanvas');
    if (this.universeCanvas) {
      this.universe = new UniverseBackground(this.universeCanvas);
      this.universe.init();
    }

    // LEDs laterais em degradê azul → roxo → vermelho
    this.setupAmbientLeds();

    // Inclinação 3D suave do seletor orbital acompanhando o mouse
    this.setupStageParallax();

    // Botões de abrir/fechar
    const btnToggle = document.getElementById('btnOpenLanding');
    if (btnToggle) {
      btnToggle.addEventListener('click', () => this.open());
    }

    const btnClose = document.getElementById('landingCloseBtn');
    if (btnClose) {
      btnClose.addEventListener('click', () => this.close());
    }

    const btnEnterBoard = document.getElementById('btnEnterBoard');
    if (btnEnterBoard) {
      btnEnterBoard.addEventListener('click', () => this.close());
    }

    // Clique no núcleo central entra no quadro com o projeto selecionado
    if (this.coreElement) {
      this.coreElement.addEventListener('click', () => {
        if (this.selectedNodeId) {
          state.setActiveProject(this.selectedNodeId);
        }
        this.close();
      });
    }

    // Configura os LEDs interativos e direcionamento de módulos
    this.setupLedsAndModules();

    // Renderiza o módulo inicial do inspetor
    this.renderModuleInspector(this.activeModule);

    // Atualiza os círculos orbitais e telemetria quando o estado mudar
    state.subscribe(() => {
      if (this.isOpen) {
        this.renderCircularSelector();
        this.renderModuleInspector(this.activeModule);
      }
    });

    // Tecla Escape fecha a landing
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });

    // #mod-servidor (e os demais) abre a landing já na seção daquele módulo
    window.addEventListener('hashchange', () => {
      const fromHash = this.moduleFromLocation();
      if (fromHash) this.directToModule(fromHash, { fromHash: true });
    });

    const initialModule = this.moduleFromLocation();
    if (initialModule) {
      this.activeModule = initialModule;
      this.directToModule(initialModule, { fromHash: true });
    }
  }

  moduleFromLocation() {
    const match = (window.location.hash || '').match(/^#mod-(servidor|nuvem|motion|fila|urgente|reativo)$/);
    return match ? match[1] : null;
  }

  open() {
    if (!this.overlay) return;
    this.overlay.hidden = false;
    this.overlay.scrollTop = 0;
    this.isOpen = true;
    this.renderCircularSelector();
    this.renderModuleInspector(this.activeModule);
    if (this.universe) this.universe.start();
  }

  close() {
    if (!this.overlay) return;
    this.overlay.hidden = true;
    this.isOpen = false;
    if (this.universe) this.universe.stop();
  }

  /**
   * Renderiza os nós circulares em órbita geométrica ao redor do Motion Frame
   */
  renderCircularSelector() {
    if (!this.nodesContainer) return;
    this.nodesContainer.innerHTML = '';

    const projects = state.projects || [];
    if (projects.length === 0) return;

    const activeProject = state.getActiveProject() || projects[0];
    this.selectedNodeId = activeProject.id;
    this.updateCoreDisplay(activeProject);

    // Raio da órbita circular
    const radius = 175; // pixels a partir do centro
    const totalNodes = projects.length;
    const centerX = 220;
    const centerY = 220;

    const projectIcons = ['🚀', '📱', '⚡', '🎨', '🛡️', '🌐', '🔥', '💎'];

    projects.forEach((proj, index) => {
      const angle = (index / totalNodes) * (2 * Math.PI) - (Math.PI / 2);
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);

      const nodeEl = document.createElement('div');
      const isActive = proj.id === activeProject.id;
      nodeEl.className = `orbit-node ${isActive ? 'active' : ''}`;
      nodeEl.style.left = `${x}px`;
      nodeEl.style.top = `${y}px`;
      nodeEl.style.color = proj.color || '#6366f1';
      nodeEl.style.borderColor = isActive ? '#ffffff' : (proj.color || '#6366f1');
      nodeEl.title = `${proj.name} (Clique para selecionar)`;

      const icon = projectIcons[index % projectIcons.length];
      nodeEl.innerHTML = icon;

      nodeEl.addEventListener('click', (e) => {
        e.stopPropagation();
        this.selectedNodeId = proj.id;
        state.setActiveProject(proj.id);
        this.updateCoreDisplay(proj);

        this.nodesContainer.querySelectorAll('.orbit-node').forEach(n => n.classList.remove('active'));
        nodeEl.classList.add('active');

        this.triggerLedFlash(proj.color);
      });

      this.nodesContainer.appendChild(nodeEl);
    });
  }

  updateCoreDisplay(project) {
    if (!project) return;
    const tasksCount = (state.tasks || []).filter(t => t.projectId === project.id).length;

    if (this.coreTitle) this.coreTitle.textContent = project.name;
    if (this.coreMeta) this.coreMeta.textContent = `${tasksCount} Tarefas Ativas`;
    if (this.coreElement) {
      this.coreElement.style.boxShadow = `0 12px 40px rgba(0, 0, 0, 0.7), 0 0 35px ${project.color || '#6366f1'}`;
    }
  }

  /**
   * Configura cliques nos botões de LEDs para direcionar a seções locais da landing page
   */
  setupLedsAndModules() {
    const activateModule = (element, event) => {
      const modKey = element.dataset.mod;
      if (!modKey || !MODULES_INFO[modKey]) return;

      // Ctrl/Cmd/Shift+Clique (ou clique do meio) abre a pasta real do módulo
      // no gerenciador de arquivos do sistema (Explorer/Finder).
      const wantsDirectory = event && (event.ctrlKey || event.metaKey || event.shiftKey || event.button === 1);
      if (wantsDirectory) {
        if (event) event.preventDefault();
        this.openModuleDirectory(modKey);
        return;
      }

      // Clique normal navega suavemente até a seção do módulo dentro da landing.
      this.directToModule(modKey);
    };

    // 1. Botões de LEDs da barra superior
    document.querySelectorAll('.led-item[data-mod]').forEach(item => {
      item.addEventListener('click', (event) => activateModule(item, event));
      item.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          activateModule(item, event);
        }
      });
      item.addEventListener('auxclick', (event) => {
        if (event.button === 1) activateModule(item, event);
      });
    });

    // 2. Abas do Inspetor de Diretórios
    document.querySelectorAll('.mod-tab[data-mod]').forEach(tab => {
      tab.addEventListener('click', (event) => activateModule(tab, event));
      tab.addEventListener('auxclick', (event) => {
        if (event.button === 1) activateModule(tab, event);
      });
    });
  }

  /**
   * Cria os LEDs decorativos das laterais da landing.
   * O degradê vai do azul ao roxo e termina no vermelho, com brilho e
   * pulsação levemente descompassados entre os dois trilhos.
   */
  setupAmbientLeds() {
    const palette = ['#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#d946ef', '#ef4444'];
    const rails = [this.ledRailLeft, this.ledRailRight];

    rails.forEach((rail, railIndex) => {
      if (!rail) return;
      rail.innerHTML = '';

      const count = 16;
      for (let i = 0; i < count; i += 1) {
        const led = document.createElement('span');
        led.className = 'rail-led';
        led.style.setProperty('--led-color', palette[(i + railIndex * 2) % palette.length]);
        led.style.setProperty('--delay', `${(i * 0.13 + railIndex * 0.35).toFixed(2)}s`);
        rail.appendChild(led);
      }
    });
  }

  /**
   * Inclina levemente o seletor orbital em 3D conforme o mouse se move.
   */
  setupStageParallax() {
    if (!this.overlay || !this.stageElement || this.reducedMotion) return;

    this.overlay.addEventListener('pointermove', (event) => {
      if (!this.isOpen) return;
      const x = event.clientX / window.innerWidth - 0.5;
      const y = event.clientY / window.innerHeight - 0.5;
      this.stageElement.style.setProperty('--tilt-x', `${(-y * 6).toFixed(2)}deg`);
      this.stageElement.style.setProperty('--tilt-y', `${(x * 8).toFixed(2)}deg`);
    }, { passive: true });

    this.overlay.addEventListener('pointerleave', () => {
      this.stageElement.style.setProperty('--tilt-x', '0deg');
      this.stageElement.style.setProperty('--tilt-y', '0deg');
    });
  }

  /**
   * Abre a pasta real do módulo no gerenciador de arquivos do sistema.
   *
   * Com o servidor Node ativo, usa a API /api/open-directory, que executa
   * o Explorer (Windows), Finder (macOS) ou xdg-open (Linux) na pasta do módulo.
   * Em modo file:// (ou servidor estático) não é possível abrir o sistema,
   * então o caminho absoluto é copiado para a área de transferência.
   */
  async openModuleDirectory(modKey) {
    const mod = MODULES_INFO[modKey];
    if (!mod) return;

    const isHttp = window.location.protocol === 'http:' || window.location.protocol === 'https:';

    if (isHttp) {
      try {
        const res = await fetch('/api/open-directory', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ module: modKey })
        });
        const json = await res.json().catch(() => ({}));

        if (res.ok && json.success) {
          modal.showToast(`Pasta aberta no gerenciador de arquivos: ${json.relative || mod.directory}`, 'success');
          return;
        }

        this.copyDirectoryPath(mod, json.error);
        return;
      } catch {
        this.copyDirectoryPath(mod);
        return;
      }
    }

    this.copyDirectoryPath(mod);
  }

  /**
   * Monta o caminho absoluto da pasta do módulo para exibição/cópia.
   */
  getAbsoluteDirectory(mod) {
    const relative = mod.directory.replace(/\/+$/, '');

    if (window.location.protocol === 'file:') {
      const basePath = decodeURIComponent(window.location.pathname).replace(/\/[^/]*$/, '');
      const full = `${basePath}/${relative}`.replace(/\/{2,}/g, '/').replace(/^\//, '');
      return full.replace(/\//g, '\\');
    }

    try {
      return new URL(`${relative}/`, window.location.href).href;
    } catch {
      return relative;
    }
  }

  /**
   * Fallback quando o sistema não pode abrir a pasta: copia o caminho.
   */
  copyDirectoryPath(mod, reason) {
    const fullPath = this.getAbsoluteDirectory(mod);
    const fallbackMessage = () => modal.showToast(
      reason ? `${reason} Caminho: ${fullPath}` : `Abra manualmente a pasta: ${fullPath}`,
      'info'
    );

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(fullPath)
        .then(() => modal.showToast(`Caminho da pasta copiado: ${fullPath}`, 'info'))
        .catch(fallbackMessage);
    } else {
      fallbackMessage();
    }
  }

  /**
   * Fecha a apresentação e leva ao quadro Kanban já posicionado no módulo:
   * coluna correspondente e/ou filtro de prioridade.
   */
  accessBoard(modKey) {
    const mod = MODULES_INFO[modKey];
    if (!mod) return;

    const board = mod.board || {};
    this.close();

    let message = 'Quadro Kanban aberto.';

    if (board.refresh) {
      this.refreshFromServer().then((refreshed) => {
        if (refreshed) modal.showToast('Quadro sincronizado com o servidor em tempo real.', 'success');
      });
    }

    if (modKey === 'servidor') {
      message = `Quadro aberto · ${sync.connectedUsers || 1} conexão(ões) em tempo real.`;
    }

    const nextPriority = board.priority || 'all';
    if (state.priorityFilter !== nextPriority) {
      state.setPriorityFilter(nextPriority);
    }

    // Deixa o overlay fechar e o quadro re-renderizar antes de posicionar.
    window.setTimeout(() => {
      let columnId = board.columnId;

      if (nextPriority !== 'all') {
        const matchingTask = (state.tasks || [])
          .filter(t => t.projectId === state.activeProjectId && t.priority === nextPriority)
          .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))[0];

        if (matchingTask) {
          columnId = matchingTask.columnId;
          message = `Quadro filtrado por prioridade ${nextPriority === 'urgent' ? 'urgente' : nextPriority}.`;
        }
      }

      if (columnId) {
        const column = this.scrollBoardToColumn(columnId);
        const title = column ? column.querySelector('.column-title')?.textContent : '';
        if (title) message += ` Coluna "${title}" em destaque.`;
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }

      modal.showToast(message, 'success');
    }, 160);
  }

  /**
   * Recarrega o estado mais recente do servidor (usado pelo módulo Nuvem).
   */
  async refreshFromServer() {
    if (window.location.protocol !== 'http:' && window.location.protocol !== 'https:') return false;

    try {
      const res = await fetch('/api/state', { cache: 'no-store' });
      const json = await res.json();
      if (json.success && json.data) {
        state.applyRemoteState(json.data);
        return true;
      }
    } catch {
      /* modo offline: mantém o estado local */
    }
    return false;
  }

  /**
   * Rola o quadro até a coluna indicada e a destaca por alguns instantes.
   */
  scrollBoardToColumn(columnId) {
    const column = document.querySelector(`.kanban-column[data-column-id="${columnId}"]`);
    if (!column) return null;

    column.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    column.classList.remove('is-focus-pulse');
    void column.offsetWidth;
    column.classList.add('is-focus-pulse');
    window.setTimeout(() => column.classList.remove('is-focus-pulse'), 1400);
    return column;
  }

  /**
   * Pulso de sinal: mede a latência real do canal em tempo real.
   *
   * Envia um ping ao servidor (/api/ping), calcula o tempo de ida e volta,
   * mostra o resultado no próprio botão, dispara uma onda de LEDs e um toast.
   */
  async testSignalPulse(modKey, button) {
    const mod = MODULES_INFO[modKey];
    if (!mod) return;

    const label = button ? button.querySelector('#btnModTestLabel') : null;
    const startedAt = performance.now();
    let ok = false;
    let rtt = 0;
    let clients = sync.connectedUsers || 1;
    let detail = '';

    if (button) {
      button.classList.add('is-sending');
      button.disabled = true;
    }

    try {
      const res = await fetch(`/api/ping?ts=${Date.now()}`, { cache: 'no-store' });
      const json = await res.json();
      rtt = Math.max(1, Math.round(performance.now() - startedAt));
      ok = res.ok && json.success !== false;
      if (Number.isFinite(json.clients)) clients = json.clients;
      detail = ok ? 'canal SSE respondendo' : 'resposta inesperada do servidor';
    } catch {
      rtt = Math.max(1, Math.round(performance.now() - startedAt));
      detail = 'sem conexão com o servidor (modo offline)';
    }

    if (button) {
      button.classList.remove('is-sending');
      button.disabled = false;
    }

    this.triggerLedFlash(mod.color);

    if (label) {
      label.textContent = ok ? `Pulso OK · ${rtt} ms · ${clients} online` : `Sem sinal · ${rtt} ms`;
      if (button) {
        button.classList.toggle('is-ok', ok);
        button.classList.toggle('is-fail', !ok);
      }

      window.setTimeout(() => {
        if (!label.isConnected) return;
        label.textContent = 'Testar Pulso de Sinal';
        if (button) button.classList.remove('is-ok', 'is-fail');
      }, 5000);
    }

    if (ok) {
      const quality = rtt < 60 ? 'excelente' : (rtt < 150 ? 'boa' : 'lenta');
      modal.showToast(
        `Pulso de sinal ${quality}: ${rtt} ms · ${clients} cliente(s) online · ${detail}`,
        rtt < 150 ? 'success' : 'info'
      );
    } else {
      modal.showToast(`Pulso de sinal indisponível: ${rtt} ms · ${detail}`, 'error');
    }
  }

  /**
   * Atualiza a telemetria do módulo no painel ao lado, sem rolar a página.
   */
  directToModule(modKey, options = {}) {
    if (!MODULES_INFO[modKey]) return;
    if (!this.isOpen) this.open();
    this.activeModule = modKey;
    this.renderModuleInspector(modKey);

    if (!options.fromHash) {
      const nextHash = `#mod-${modKey}`;
      if (window.location.hash !== nextHash) {
        history.pushState(null, '', nextHash);
      }
    }

    // Efeito de pulso no LED correspondente
    const targetItem = document.querySelector(`.led-item[data-mod="${modKey}"]`);
    if (targetItem) {
      const lamp = targetItem.querySelector('.led-lamp');
      if (lamp) {
        lamp.style.transform = 'scale(1.5)';
        lamp.style.filter = 'brightness(2.2)';
        setTimeout(() => {
          lamp.style.transform = '';
          lamp.style.filter = '';
        }, 350);
      }
    }

    // Destaca o painel de telemetria no lugar, sem tirar o usuário da posição.
    if (this.modulesInspector) {
      this.modulesInspector.classList.remove('is-updating');
      // Reinicia a animação mesmo em cliques consecutivos.
      void this.modulesInspector.offsetWidth;
      this.modulesInspector.classList.add('is-updating');
      window.setTimeout(() => this.modulesInspector.classList.remove('is-updating'), 560);
    }
  }

  /**
   * Renderiza a visão detalhada do módulo, seu diretório e telemetria em tempo real
   */
  renderModuleInspector(modKey) {
    const mod = MODULES_INFO[modKey];
    if (!mod || !this.inspectorBody) return;

    // Atualiza abas ativas
    document.querySelectorAll('.mod-tab').forEach(tab => {
      tab.classList.toggle('active', tab.dataset.mod === modKey);
    });

    if (this.modulesInspector) {
      this.modulesInspector.style.borderColor = mod.color;
      this.modulesInspector.style.boxShadow = `0 16px 48px rgba(0, 0, 0, 0.6), 0 0 25px ${mod.color}33`;
    }

    if (this.inspectorActiveTag) {
      this.inspectorActiveTag.textContent = mod.name;
      this.inspectorActiveTag.style.borderColor = mod.color;
      this.inspectorActiveTag.style.color = mod.color;
    }

    const telemetryItems = mod.telemetry();
    const telemetryCardsHtml = telemetryItems.map(item => `
      <div class="telemetry-card">
        <div class="t-label">${item.label}</div>
        <div class="t-val">${item.val}</div>
      </div>
    `).join('');

    this.inspectorBody.innerHTML = `
      <div class="mod-meta-row">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span class="site-led ${mod.ledClass}"></span>
          <strong style="font-size: 1.05rem; color: #ffffff;">${mod.name}</strong>
        </div>
        <a class="mod-dir-badge" id="btnModDirBadge" href="${mod.page}" title="Abrir a pasta ${mod.directory} no gerenciador de arquivos do sistema">
          <span>📁</span>
          <span>${mod.directory}</span>
          <span aria-hidden="true">↗</span>
        </a>
      </div>

      <div class="mod-description">
        ${mod.description}
      </div>

      <div class="mod-telemetry-grid">
        ${telemetryCardsHtml}
      </div>

      <div class="mod-actions">
        <button class="btn btn-primary" id="btnModAction" style="background: ${mod.color} !important;" title="Fecha a apresentação e abre o quadro Kanban já posicionado neste módulo">
          <span>Acessar no Quadro</span>
        </button>
        <button class="btn btn-outline" id="btnModDirectory" title="Abre a pasta ${mod.directory} no Explorer/Finder através do servidor local">
          <span>📁 Abrir Diretório Local</span>
        </button>
        <button class="btn btn-outline" id="btnModTest" title="Envia um ping ao servidor e mede a latência real do canal de tempo real (SSE)">
          <span class="signal-dot" aria-hidden="true"></span>
          <span id="btnModTestLabel">Testar Pulso de Sinal</span>
        </button>
      </div>
    `;

    // Ações dentro do módulo
    const btnModAction = this.inspectorBody.querySelector('#btnModAction');
    if (btnModAction) {
      btnModAction.addEventListener('click', () => this.accessBoard(modKey));
    }

    const btnModDirectory = this.inspectorBody.querySelector('#btnModDirectory');
    if (btnModDirectory) {
      btnModDirectory.addEventListener('click', () => this.openModuleDirectory(modKey));
    }

    const btnModDirBadge = this.inspectorBody.querySelector('#btnModDirBadge');
    if (btnModDirBadge) {
      btnModDirBadge.addEventListener('click', (event) => {
        event.preventDefault();
        this.openModuleDirectory(modKey);
      });
    }

    const btnModTest = this.inspectorBody.querySelector('#btnModTest');
    if (btnModTest) {
      btnModTest.addEventListener('click', () => this.testSignalPulse(modKey, btnModTest));
    }
  }

  triggerLedFlash(colorHex) {
    const leds = document.querySelectorAll('.led-lamp');
    leds.forEach((led, i) => {
      setTimeout(() => {
        led.style.transform = 'scale(1.35)';
        led.style.filter = 'brightness(1.8)';
        setTimeout(() => {
          led.style.transform = '';
          led.style.filter = '';
        }, 220);
      }, i * 60);
    });
  }
}

export const landing = new LandingController();

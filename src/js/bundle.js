(function() {
  "use strict";

  // ==================== config.js ====================
/**
 * config.js - Configurações, Definições de Colunas e Dados Iniciais de Demonstração (pt-BR)
 */

const COLUMNS = [
  { id: 'todo', title: 'A Fazer' },
  { id: 'in_progress', title: 'Em Progresso' },
  { id: 'review', title: 'Em Revisão' },
  { id: 'done', title: 'Concluído' }
];

const STORAGE_KEY = 'kanban_flow_data_pt_v1';
const THEME_KEY = 'kanban_flow_theme';

const INITIAL_DATA = {
  projects: [
    {
      id: 'proj_ecommerce',
      name: 'Plataforma E-Commerce',
      description: 'Construção de uma loja moderna headless com checkout ultrarrápido.',
      color: '#6366f1'
    },
    {
      id: 'proj_mobile',
      name: 'Aplicativo Mobile v2.0',
      description: 'Redesenho do app multiplataforma em Flutter com sincronização offline.',
      color: '#10b981'
    },
    {
      id: 'proj_infra',
      name: 'DevOps & Infraestrutura',
      description: 'Containerização com Docker e pipeline automatizado de CI/CD.',
      color: '#f59e0b'
    }
  ],
  tasks: [
    {
      id: 'task_1',
      projectId: 'proj_ecommerce',
      columnId: 'todo',
      title: 'Desenhar fluxo de checkout do Pix e Cartão',
      description: 'Criar telas responsivas com cálculo automático de frete e validação de cupons.',
      priority: 'high',
      dueDate: '2026-11-25',
      assignee: 'Sara Lima',
      tags: ['ui', 'pagamentos', 'checkout'],
      order: 0,
      createdAt: '2026-11-10T10:00:00Z'
    },
    {
      id: 'task_2',
      projectId: 'proj_ecommerce',
      columnId: 'todo',
      title: 'Configurar cache de sessões com Redis',
      description: 'Implementar cluster Redis para gerenciar carrinhos ativos e sessões com alta disponibilidade.',
      priority: 'medium',
      dueDate: '2026-11-28',
      assignee: 'Davi Silva',
      tags: ['backend', 'redis', 'cache'],
      order: 1,
      createdAt: '2026-11-11T14:30:00Z'
    },
    {
      id: 'task_3',
      projectId: 'proj_ecommerce',
      columnId: 'in_progress',
      title: 'Implementar busca com filtros avançados',
      description: 'Construir busca instantânea por preço, departamento, marca e avaliações de clientes.',
      priority: 'urgent',
      dueDate: '2026-11-20',
      assignee: 'Alex Moreira',
      tags: ['frontend', 'busca', 'api'],
      order: 0,
      createdAt: '2026-11-12T09:15:00Z'
    },
    {
      id: 'task_4',
      projectId: 'proj_ecommerce',
      columnId: 'review',
      title: 'Auditoria de segurança nas APIs GraphQL',
      description: 'Revisar limitadores de profundidade de consultas e validações de tokens JWT.',
      priority: 'high',
      dueDate: '2026-11-18',
      assignee: 'Helena Rocha',
      tags: ['seguranca', 'graphql', 'api'],
      order: 0,
      createdAt: '2026-11-13T11:00:00Z'
    },
    {
      id: 'task_5',
      projectId: 'proj_ecommerce',
      columnId: 'done',
      title: 'Configurar Design System e Tailwind CSS',
      description: 'Criação dos tokens de cores, tipografia, botões e componentes básicos de formulário.',
      priority: 'low',
      dueDate: '2026-11-05',
      assignee: 'Alex Moreira',
      tags: ['design', 'css', 'ui'],
      order: 0,
      createdAt: '2026-11-01T08:00:00Z'
    },
    {
      id: 'task_6',
      projectId: 'proj_mobile',
      columnId: 'todo',
      title: 'Integração de Notificações Push via Firebase',
      description: 'Configurar canal de notificações push para avisos de entrega de pedidos em tempo real.',
      priority: 'high',
      dueDate: '2026-12-01',
      assignee: 'Sara Lima',
      tags: ['mobile', 'firebase', 'notificacoes'],
      order: 0,
      createdAt: '2026-11-14T15:00:00Z'
    },
    {
      id: 'task_7',
      projectId: 'proj_mobile',
      columnId: 'in_progress',
      title: 'Desbloqueio biométrico (FaceID e Biometria)',
      description: 'Implementar autenticação rápida e segura integrada ao Keychain e Keystore do sistema.',
      priority: 'urgent',
      dueDate: '2026-11-22',
      assignee: 'Helena Rocha',
      tags: ['mobile', 'seguranca'],
      order: 0,
      createdAt: '2026-11-15T12:00:00Z'
    },
    {
      id: 'task_8',
      projectId: 'proj_infra',
      columnId: 'todo',
      title: 'Provisionamento de cluster Kubernetes com Terraform',
      description: 'Estruturar infraestrutura como código (IaC) com autoscaling horizontal e monitoramento.',
      priority: 'high',
      dueDate: '2026-11-30',
      assignee: 'Davi Silva',
      tags: ['devops', 'terraform', 'aws'],
      order: 0,
      createdAt: '2026-11-15T16:00:00Z'
    }
  ]
};


  // ==================== storage.js ====================
/**
 * storage.js - LocalStorage persistence and JSON Data Export/Import
 */


const storage = {
  /**
   * Load data from LocalStorage or initialize with defaults.
   */
  loadData() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        this.saveData(INITIAL_DATA);
        return JSON.parse(JSON.stringify(INITIAL_DATA));
      }
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed.projects) || !Array.isArray(parsed.tasks)) {
        throw new Error('Invalid data schema in LocalStorage');
      }
      return parsed;
    } catch (err) {
      console.warn('Failed to load data from LocalStorage, resetting to default.', err);
      this.saveData(INITIAL_DATA);
      return JSON.parse(JSON.stringify(INITIAL_DATA));
    }
  },

  /**
   * Save data state to LocalStorage.
   */
  saveData(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      return true;
    } catch (err) {
      console.error('Failed to save data to LocalStorage:', err);
      return false;
    }
  },

  /**
   * Reset data to default initial seed.
   */
  resetData() {
    this.saveData(INITIAL_DATA);
    return JSON.parse(JSON.stringify(INITIAL_DATA));
  },

  /**
   * Export the current state as a downloadable JSON file.
   */
  exportData(data) {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const dateStr = new Date().toISOString().split('T')[0];

    const a = document.createElement('a');
    a.href = url;
    a.download = `kanbanflow_backup_${dateStr}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  },

  /**
   * Import data from a user-selected JSON file.
   */
  importData(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const parsed = JSON.parse(e.target.result);
          if (!Array.isArray(parsed.projects) || !Array.isArray(parsed.tasks)) {
            return reject(new Error('Estrutura inválida de arquivo de backup: projetos ou tarefas ausentes'));
          }
          this.saveData(parsed);
          resolve(parsed);
        } catch (err) {
          reject(new Error('Não foi possível ler o arquivo JSON: ' + err.message));
        }
      };
      reader.onerror = () => reject(new Error('Falha ao ler o arquivo'));
      reader.readAsText(file);
    });
  },

  /**
   * Theme persistence.
   */
  loadTheme() {
    return localStorage.getItem(THEME_KEY) || 'dark';
  },

  saveTheme(theme) {
    localStorage.setItem(THEME_KEY, theme);
  }
};


  // ==================== sync.js ====================
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

const sync = new SyncManager();


  // ==================== state.js ====================
/**
 * state.js - Central State Management & Business Logic (Reactive Store)
 */



class State {
  constructor() {
    this.listeners = [];
    this.projects = [];
    this.tasks = [];
    this.activeProjectId = null;
    this.searchQuery = '';
    this.priorityFilter = 'all';
    this.theme = 'dark';
  }

  /**
   * Initialize state from storage.
   */
  init() {
    const data = storage.loadData();
    this.projects = data.projects || [];
    this.tasks = data.tasks || [];
    this.theme = storage.loadTheme();

    // Default to first project if available
    if (this.projects.length > 0) {
      this.activeProjectId = this.projects[0].id;
    }

    this.notify({ skipBroadcast: true });
  }

  /**
   * Subscribe to state changes.
   */
  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  /**
   * Notify all listeners, persist data and broadcast to server.
   */
  notify(options = {}) {
    storage.saveData({
      projects: this.projects,
      tasks: this.tasks
    });

    if (!options.skipBroadcast) {
      sync.broadcastState({
        projects: this.projects,
        tasks: this.tasks
      });
    }

    this.listeners.forEach(fn => {
      try {
        fn(this);
      } catch (err) {
        console.error('State subscriber error:', err);
      }
    });
  }

  /**
   * Apply updates received in real-time from other connected users.
   */
  applyRemoteState(data) {
    if (!data || !Array.isArray(data.projects) || !Array.isArray(data.tasks)) return;

    this.projects = data.projects;
    this.tasks = data.tasks;

    if (!this.projects.some(p => p.id === this.activeProjectId)) {
      this.activeProjectId = this.projects[0]?.id || null;
    }

    this.notify({ skipBroadcast: true });
  }

  // ================= Project Operations =================

  setActiveProject(projectId) {
    if (this.activeProjectId !== projectId && this.projects.some(p => p.id === projectId)) {
      this.activeProjectId = projectId;
      this.notify();
    }
  }

  getActiveProject() {
    return this.projects.find(p => p.id === this.activeProjectId) || this.projects[0] || null;
  }

  addProject({ name, description = '', color = '#6366f1' }) {
    const newProject = {
      id: 'proj_' + Date.now(),
      name: name.trim(),
      description: description.trim(),
      color
    };
    this.projects.push(newProject);
    this.activeProjectId = newProject.id;
    this.notify();
    return newProject;
  }

  updateProject(id, { name, description, color }) {
    const proj = this.projects.find(p => p.id === id);
    if (!proj) return null;

    if (name !== undefined) proj.name = name.trim();
    if (description !== undefined) proj.description = description.trim();
    if (color !== undefined) proj.color = color;

    this.notify();
    return proj;
  }

  deleteProject(id) {
    if (this.projects.length <= 1) {
      throw new Error('Você não pode excluir o único projeto restante.');
    }

    // Remove project
    this.projects = this.projects.filter(p => p.id !== id);

    // Remove all tasks in that project
    this.tasks = this.tasks.filter(t => t.projectId !== id);

    // Switch active project if current was deleted
    if (this.activeProjectId === id) {
      this.activeProjectId = this.projects[0]?.id || null;
    }

    this.notify();
  }

  // ================= Task Operations =================

  addTask({ title, description = '', columnId = 'todo', priority = 'medium', dueDate = '', assignee = '', tags = [] }) {
    if (!this.activeProjectId) throw new Error('Nenhum projeto ativo selecionado.');

    // Calculate next order in column
    const columnTasks = this.tasks.filter(t => t.projectId === this.activeProjectId && t.columnId === columnId);
    const nextOrder = columnTasks.length > 0 ? Math.max(...columnTasks.map(t => t.order ?? 0)) + 1 : 0;

    const newTask = {
      id: 'task_' + Date.now(),
      projectId: this.activeProjectId,
      columnId,
      title: title.trim(),
      description: description.trim(),
      priority,
      dueDate,
      assignee: assignee.trim(),
      tags: Array.isArray(tags) ? tags : [],
      order: nextOrder,
      createdAt: new Date().toISOString()
    };

    this.tasks.push(newTask);
    this.notify();
    return newTask;
  }

  updateTask(id, updates) {
    const task = this.tasks.find(t => t.id === id);
    if (!task) return null;

    if (updates.title !== undefined) task.title = updates.title.trim();
    if (updates.description !== undefined) task.description = updates.description.trim();
    if (updates.columnId !== undefined) task.columnId = updates.columnId;
    if (updates.priority !== undefined) task.priority = updates.priority;
    if (updates.dueDate !== undefined) task.dueDate = updates.dueDate;
    if (updates.assignee !== undefined) task.assignee = updates.assignee.trim();
    if (updates.tags !== undefined) task.tags = updates.tags;

    this.notify();
    return task;
  }

  deleteTask(id) {
    this.tasks = this.tasks.filter(t => t.id !== id);
    this.notify();
  }

  /**
   * Move task to a target column at a specific index.
   */
  moveTask(taskId, targetColumnId, targetIndex = null) {
    const task = this.tasks.find(t => t.id === taskId);
    if (!task) return;

    const currentColumnId = task.columnId;
    const sameColumn = currentColumnId === targetColumnId;

    // Get all tasks in target column except the moving one
    let targetTasks = this.tasks
      .filter(t => t.projectId === this.activeProjectId && t.columnId === targetColumnId && t.id !== taskId)
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

    // Update the task column
    task.columnId = targetColumnId;

    // Insert at index or at the end
    if (targetIndex === null || targetIndex >= targetTasks.length) {
      targetTasks.push(task);
    } else {
      targetTasks.splice(Math.max(0, targetIndex), 0, task);
    }

    // Re-index orders
    targetTasks.forEach((t, idx) => {
      t.order = idx;
    });

    // If moved from another column, re-index source column as well
    if (!sameColumn) {
      const sourceTasks = this.tasks
        .filter(t => t.projectId === this.activeProjectId && t.columnId === currentColumnId && t.id !== taskId)
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

      sourceTasks.forEach((t, idx) => {
        t.order = idx;
      });
    }

    this.notify();
  }

  // ================= Query & Filter Helpers =================

  setSearch(query) {
    this.searchQuery = (query || '').toLowerCase().trim();
    this.notify();
  }

  setPriorityFilter(priority) {
    this.priorityFilter = priority || 'all';
    this.notify();
  }

  setTheme(theme) {
    this.theme = theme;
    storage.saveTheme(theme);
    this.notify();
  }

  /**
   * Get tasks for the active project matching search & priority filters.
   */
  getFilteredTasks() {
    if (!this.activeProjectId) return [];

    return this.tasks.filter(task => {
      // Must belong to active project
      if (task.projectId !== this.activeProjectId) return false;

      // Filter by priority
      if (this.priorityFilter !== 'all' && task.priority !== this.priorityFilter) {
        return false;
      }

      // Filter by search query
      if (this.searchQuery) {
        const matchesTitle = task.title.toLowerCase().includes(this.searchQuery);
        const matchesDesc = (task.description || '').toLowerCase().includes(this.searchQuery);
        const matchesAssignee = (task.assignee || '').toLowerCase().includes(this.searchQuery);
        const matchesTags = (task.tags || []).some(tag => tag.toLowerCase().includes(this.searchQuery));

        if (!matchesTitle && !matchesDesc && !matchesAssignee && !matchesTags) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }

  /**
   * Get metrics for the current project.
   */
  getProjectStats() {
    if (!this.activeProjectId) return { total: 0, done: 0, percentage: 0 };

    const projectTasks = this.tasks.filter(t => t.projectId === this.activeProjectId);
    const total = projectTasks.length;
    const done = projectTasks.filter(t => t.columnId === 'done').length;
    const percentage = total === 0 ? 0 : Math.round((done / total) * 100);

    return { total, done, percentage };
  }

  /**
   * Reset data to initial seeds and broadcast to all users.
   */
  resetAll() {
    const data = storage.resetData();
    this.projects = data.projects;
    this.tasks = data.tasks;
    this.activeProjectId = this.projects[0]?.id || null;
    this.searchQuery = '';
    this.priorityFilter = 'all';
    sync.broadcastReset(data);
    this.notify({ skipBroadcast: true });
  }

  /**
   * Import data from JSON file.
   */
  async importFromFile(file) {
    const data = await storage.importData(file);
    this.projects = data.projects;
    this.tasks = data.tasks;
    this.activeProjectId = this.projects[0]?.id || null;
    this.notify();
  }
}

const state = new State();


  // ==================== dragDrop.js ====================
/**
 * dragDrop.js - Native HTML5 Drag and Drop Controller
 */


let draggedCardId = null;
let currentDropIndicator = null;

const dragDrop = {
  /**
   * Initialize drag events on a single card element.
   */
  bindCardEvents(cardEl) {
    cardEl.setAttribute('draggable', 'true');

    cardEl.addEventListener('dragstart', (e) => {
      draggedCardId = cardEl.dataset.taskId;
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', draggedCardId);

      // Timeout allows element to render drag ghost before opacity is applied
      setTimeout(() => {
        cardEl.classList.add('dragging');
      }, 0);
    });

    cardEl.addEventListener('dragend', () => {
      cardEl.classList.remove('dragging');
      draggedCardId = null;
      removeDropIndicator();
      document.querySelectorAll('.kanban-column').forEach(col => col.classList.remove('drag-over'));
    });
  },

  /**
   * Initialize dropzone events on a column cards container.
   */
  bindColumnEvents(columnEl) {
    const container = columnEl.querySelector('.cards-container');
    const columnId = columnEl.dataset.columnId;

    columnEl.addEventListener('dragenter', (e) => {
      e.preventDefault();
      columnEl.classList.add('drag-over');
    });

    columnEl.addEventListener('dragleave', (e) => {
      // Only remove if leaving the column boundary completely
      if (!columnEl.contains(e.relatedTarget)) {
        columnEl.classList.remove('drag-over');
      }
    });

    columnEl.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';

      if (!draggedCardId) return;

      // Determine drop insertion point
      const afterElement = getDragAfterElement(container, e.clientY);
      showDropIndicator(container, afterElement);
    });

    columnEl.addEventListener('drop', (e) => {
      e.preventDefault();
      columnEl.classList.remove('drag-over');

      const taskId = e.dataTransfer.getData('text/plain') || draggedCardId;
      if (!taskId) return;

      const afterElement = getDragAfterElement(container, e.clientY);

      // Calculate target index in this column
      let targetIndex = null;
      if (afterElement) {
        // Drop before afterElement
        const cards = Array.from(container.querySelectorAll('.task-card:not(.dragging)'));
        targetIndex = cards.indexOf(afterElement);
      } else {
        // Drop at the end of the column
        const cards = Array.from(container.querySelectorAll('.task-card:not(.dragging)'));
        targetIndex = cards.length;
      }

      removeDropIndicator();
      state.moveTask(taskId, columnId, targetIndex);
    });
  }
};

/**
 * Calculate the nearest task card element directly below the dragging cursor.
 */
function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll('.task-card:not(.dragging)')];

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;

    if (offset < 0 && offset > closest.offset) {
      return { offset, element: child };
    } else {
      return closest;
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}

/**
 * Render visual drop indicator bar.
 */
function showDropIndicator(container, afterElement) {
  if (!currentDropIndicator) {
    currentDropIndicator = document.createElement('div');
    currentDropIndicator.className = 'drop-indicator';
  }

  if (afterElement) {
    container.insertBefore(currentDropIndicator, afterElement);
  } else {
    container.appendChild(currentDropIndicator);
  }
}

/**
 * Remove drop indicator bar.
 */
function removeDropIndicator() {
  if (currentDropIndicator && currentDropIndicator.parentNode) {
    currentDropIndicator.parentNode.removeChild(currentDropIndicator);
  }
}


  // ==================== modal.js ====================
/**
 * modal.js - Modal dialog managers for Tasks & Projects, and Toast notifications
 */


const modal = {
  // Elements
  taskBackdrop: document.getElementById('taskModalBackdrop'),
  taskForm: document.getElementById('taskForm'),
  taskIdInput: document.getElementById('taskId'),
  taskTitleInput: document.getElementById('taskTitle'),
  taskDescInput: document.getElementById('taskDescription'),
  taskColumnSelect: document.getElementById('taskColumn'),
  taskPrioritySelect: document.getElementById('taskPriority'),
  taskDueDateInput: document.getElementById('taskDueDate'),
  taskAssigneeInput: document.getElementById('taskAssignee'),
  taskTagsInput: document.getElementById('taskTags'),
  taskModalTitle: document.getElementById('taskModalTitle'),
  btnDeleteTask: document.getElementById('btnDeleteTask'),

  projectBackdrop: document.getElementById('projectModalBackdrop'),
  projectForm: document.getElementById('projectForm'),
  projectIdInput: document.getElementById('projectId'),
  projectNameInput: document.getElementById('projectName'),
  projectDescInput: document.getElementById('projectDescription'),
  projectModalTitle: document.getElementById('projectModalTitle'),
  btnDeleteProject: document.getElementById('btnDeleteProject'),

  toastContainer: document.getElementById('toastContainer'),

  init() {
    // Task modal close triggers
    document.getElementById('taskModalClose').addEventListener('click', () => this.closeTaskModal());
    document.getElementById('btnCancelTask').addEventListener('click', () => this.closeTaskModal());
    this.taskBackdrop.addEventListener('click', (e) => {
      if (e.target === this.taskBackdrop) this.closeTaskModal();
    });

    // Project modal close triggers
    document.getElementById('projectModalClose').addEventListener('click', () => this.closeProjectModal());
    document.getElementById('btnCancelProject').addEventListener('click', () => this.closeProjectModal());
    this.projectBackdrop.addEventListener('click', (e) => {
      if (e.target === this.projectBackdrop) this.closeProjectModal();
    });

    // Task Form Submit
    this.taskForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleTaskSubmit();
    });

    // Delete Task button
    this.btnDeleteTask.addEventListener('click', () => {
      const id = this.taskIdInput.value;
      if (id && confirm('Tem certeza de que deseja excluir esta tarefa?')) {
        state.deleteTask(id);
        this.closeTaskModal();
        this.showToast('Tarefa excluída com sucesso', 'info');
      }
    });

    // Project Form Submit
    this.projectForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleProjectSubmit();
    });

    // Delete Project button
    this.btnDeleteProject.addEventListener('click', () => {
      const id = this.projectIdInput.value;
      if (id && confirm('Tem certeza de que deseja excluir este projeto e todas as suas tarefas?')) {
        try {
          state.deleteProject(id);
          this.closeProjectModal();
          this.showToast('Projeto excluído com sucesso', 'info');
        } catch (err) {
          alert(err.message);
        }
      }
    });

    // Close on Escape key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (!this.taskBackdrop.hidden) this.closeTaskModal();
        if (!this.projectBackdrop.hidden) this.closeProjectModal();
      }
    });
  },

  // ================= Task Modal =================

  openCreateTaskModal(defaultColumn = 'todo') {
    this.taskForm.reset();
    this.taskIdInput.value = '';
    this.taskModalTitle.textContent = 'Nova Tarefa';
    this.taskColumnSelect.value = defaultColumn;
    this.taskPrioritySelect.value = 'medium';
    this.btnDeleteTask.hidden = true;
    this.taskBackdrop.hidden = false;
    setTimeout(() => this.taskTitleInput.focus(), 50);
  },

  openEditTaskModal(taskId) {
    const task = state.tasks.find(t => t.id === taskId);
    if (!task) return;

    this.taskIdInput.value = task.id;
    this.taskModalTitle.textContent = 'Editar Tarefa';
    this.taskTitleInput.value = task.title;
    this.taskDescInput.value = task.description || '';
    this.taskColumnSelect.value = task.columnId;
    this.taskPrioritySelect.value = task.priority || 'medium';
    this.taskDueDateInput.value = task.dueDate || '';
    this.taskAssigneeInput.value = task.assignee || '';
    this.taskTagsInput.value = (task.tags || []).join(', ');

    this.btnDeleteTask.hidden = false;
    this.taskBackdrop.hidden = false;
    setTimeout(() => this.taskTitleInput.focus(), 50);
  },

  closeTaskModal() {
    this.taskBackdrop.hidden = true;
    this.taskForm.reset();
  },

  handleTaskSubmit() {
    const id = this.taskIdInput.value;
    const tags = this.taskTagsInput.value
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    const taskData = {
      title: this.taskTitleInput.value,
      description: this.taskDescInput.value,
      columnId: this.taskColumnSelect.value,
      priority: this.taskPrioritySelect.value,
      dueDate: this.taskDueDateInput.value,
      assignee: this.taskAssigneeInput.value,
      tags
    };

    if (id) {
      state.updateTask(id, taskData);
      this.showToast('Tarefa atualizada com sucesso', 'success');
    } else {
      state.addTask(taskData);
      this.showToast('Tarefa criada com sucesso', 'success');
    }

    this.closeTaskModal();
  },

  // ================= Project Modal =================

  openCreateProjectModal() {
    this.projectForm.reset();
    this.projectIdInput.value = '';
    this.projectModalTitle.textContent = 'Criar Novo Projeto';
    this.btnDeleteProject.hidden = true;

    // Reset radio selection
    const defaultRadio = this.projectForm.querySelector('input[name="projectColor"][value="#6366f1"]');
    if (defaultRadio) defaultRadio.checked = true;

    this.projectBackdrop.hidden = false;
    setTimeout(() => this.projectNameInput.focus(), 50);
  },

  openEditProjectModal(projectId) {
    const proj = state.projects.find(p => p.id === projectId);
    if (!proj) return;

    this.projectIdInput.value = proj.id;
    this.projectModalTitle.textContent = 'Editar Projeto';
    this.projectNameInput.value = proj.name;
    this.projectDescInput.value = proj.description || '';

    const colorRadio = this.projectForm.querySelector(`input[name="projectColor"][value="${proj.color}"]`);
    if (colorRadio) {
      colorRadio.checked = true;
    }

    this.btnDeleteProject.hidden = state.projects.length <= 1;
    this.projectBackdrop.hidden = false;
    setTimeout(() => this.projectNameInput.focus(), 50);
  },

  closeProjectModal() {
    this.projectBackdrop.hidden = true;
    this.projectForm.reset();
  },

  handleProjectSubmit() {
    const id = this.projectIdInput.value;
    const selectedColor = this.projectForm.querySelector('input[name="projectColor"]:checked')?.value || '#6366f1';

    const projectData = {
      name: this.projectNameInput.value,
      description: this.projectDescInput.value,
      color: selectedColor
    };

    if (id) {
      state.updateProject(id, projectData);
      this.showToast('Projeto atualizado com sucesso', 'success');
    } else {
      state.addProject(projectData);
      this.showToast('Novo projeto criado com sucesso', 'success');
    }

    this.closeProjectModal();
  },

  // ================= Toast Alerts =================

  showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let icon = 'ℹ️';
    if (type === 'success') icon = '✅';
    if (type === 'error') icon = '⚠️';

    toast.innerHTML = `<span>${icon}</span><span>${escapeHtml(message)}</span>`;
    this.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('hiding');
      setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 200);
    }, 3200);
  }
};

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, m => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[m]);
}


  // ==================== ui.js ====================
/**
 * ui.js - DOM Rendering Engine for Projects, Columns, Task Cards, and Progress Metrics
 */




const ui = {
  // Container Elements
  projectsList: document.getElementById('projectsList'),
  projectCountBadge: document.getElementById('projectCount'),
  kanbanTrack: document.getElementById('kanbanTrack'),
  headerProjectName: document.getElementById('headerProjectName'),
  headerProjectColor: document.getElementById('headerProjectColor'),
  currentProjectTitle: document.getElementById('currentProjectTitle'),
  currentProjectDesc: document.getElementById('currentProjectDesc'),

  // Metrics
  statsProgressBar: document.getElementById('statsProgressBar'),
  statsPercentage: document.getElementById('statsPercentage'),
  statsTotal: document.getElementById('statsTotal'),
  statsDone: document.getElementById('statsDone'),

  /**
   * Main render method invoked whenever state changes.
   */
  render(state) {
    this.renderTheme(state.theme);
    this.renderFilters(state);
    this.renderProjects(state);
    this.renderActiveProjectHeader(state);
    this.renderColumnsAndCards(state);
    this.renderMetrics(state);
  },

  /**
   * Mantém os controles de filtro da barra superior sincronizados com o estado,
   * inclusive quando o filtro é alterado pela landing page.
   */
  renderFilters(state) {
    const prioritySelect = document.getElementById('priorityFilter');
    if (prioritySelect && prioritySelect.value !== state.priorityFilter) {
      prioritySelect.value = state.priorityFilter;
    }

    const searchInput = document.getElementById('searchInput');
    if (searchInput && state.searchQuery && searchInput.value.trim().toLowerCase() !== state.searchQuery) {
      searchInput.value = state.searchQuery;
    }
  },

  /**
   * Sync theme attribute on document.
   */
  renderTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    const themeIcon = document.getElementById('themeIcon');
    if (themeIcon) {
      themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
  },

  /**
   * Render sidebar projects list.
   */
  renderProjects(state) {
    this.projectsList.innerHTML = '';
    this.projectCountBadge.textContent = state.projects.length;

    state.projects.forEach(project => {
      const taskCount = state.tasks.filter(t => t.projectId === project.id).length;
      const isActive = project.id === state.activeProjectId;

      const itemEl = document.createElement('div');
      itemEl.className = `project-item ${isActive ? 'active' : ''}`;
      itemEl.dataset.projectId = project.id;

      itemEl.innerHTML = `
        <div class="project-item-left">
          <span class="project-item-dot" style="background-color: ${escapeHtml(project.color || '#6366f1')}"></span>
          <span class="project-item-title" title="${escapeHtml(project.name)}">${escapeHtml(project.name)}</span>
        </div>
        <div style="display: flex; align-items: center; gap: 6px;">
          <span class="site-led ${isActive ? 'led-cyan' : 'led-purple'}" style="width: 6px; height: 6px;"></span>
          <span class="project-item-badge">${taskCount}</span>
        </div>
      `;

      itemEl.addEventListener('click', () => {
        state.setActiveProject(project.id);
      });

      this.projectsList.appendChild(itemEl);
    });
  },

  /**
   * Update header project info and top board title.
   */
  renderActiveProjectHeader(state) {
    const activeProject = state.getActiveProject();

    if (!activeProject) {
      this.headerProjectName.textContent = 'Nenhum Projeto';
      this.headerProjectColor.style.backgroundColor = '#94a3b8';
      this.currentProjectTitle.textContent = 'Nenhum Projeto Selecionado';
      this.currentProjectDesc.textContent = 'Crie um projeto na barra lateral esquerda para começar.';
      return;
    }

    this.headerProjectName.textContent = activeProject.name;
    this.headerProjectColor.style.backgroundColor = activeProject.color || '#6366f1';
    this.currentProjectTitle.textContent = activeProject.name;
    this.currentProjectDesc.textContent = activeProject.description || 'Gerencie tarefas, acompanhe o progresso e organize as etapas do projeto.';
  },

  /**
   * Render kanban columns and cards.
   */
  renderColumnsAndCards(state) {
    this.kanbanTrack.innerHTML = '';

    const filteredTasks = state.getFilteredTasks();

    COLUMNS.forEach(column => {
      const columnTasks = filteredTasks.filter(t => t.columnId === column.id);

      const colEl = document.createElement('section');
      colEl.className = 'kanban-column';
      colEl.dataset.columnId = column.id;

      const colLeds = {
        todo: 'led-blue',
        in_progress: 'led-cyan',
        review: 'led-purple',
        done: 'led-green'
      };
      const ledClass = colLeds[column.id] || 'led-cyan';

      // Header
      const headerEl = document.createElement('div');
      headerEl.className = 'column-header';
      headerEl.innerHTML = `
        <div class="column-header-left">
          <span class="site-led ${ledClass}"></span>
          <span class="column-title">${escapeHtml(column.title)}</span>
          <span class="column-count">${columnTasks.length}</span>
        </div>
        <button class="column-btn-add" title="Adicionar tarefa em ${escapeHtml(column.title)}" aria-label="Adicionar tarefa">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </button>
      `;

      headerEl.querySelector('.column-btn-add').addEventListener('click', () => {
        modal.openCreateTaskModal(column.id);
      });

      colEl.appendChild(headerEl);

      // Cards Container
      const cardsContainer = document.createElement('div');
      cardsContainer.className = 'cards-container';

      if (columnTasks.length === 0) {
        cardsContainer.innerHTML = `
          <div class="column-empty">
            <div class="column-empty-icon">📭</div>
            <span>Nenhuma tarefa em ${escapeHtml(column.title)}</span>
          </div>
        `;
      } else {
        columnTasks.forEach(task => {
          const cardEl = this.createTaskCardElement(task);
          cardsContainer.appendChild(cardEl);
          dragDrop.bindCardEvents(cardEl);
        });
      }

      colEl.appendChild(cardsContainer);
      dragDrop.bindColumnEvents(colEl);

      this.kanbanTrack.appendChild(colEl);
    });
  },

  /**
   * Create DOM node for a single task card.
   */
  createTaskCardElement(task) {
    const cardEl = document.createElement('article');
    cardEl.className = 'task-card';
    cardEl.dataset.taskId = task.id;

    // Tags HTML
    const tagsHtml = (task.tags || [])
      .map(tag => `<span class="tag-badge">#${escapeHtml(tag)}</span>`)
      .join('');

    // Due Date format & Overdue check
    let dueDateHtml = '';
    if (task.dueDate) {
      const today = new Date().toISOString().split('T')[0];
      const isOverdue = task.dueDate < today && task.columnId !== 'done';
      dueDateHtml = `
        <span class="task-due-date ${isOverdue ? 'overdue' : ''}" title="${isOverdue ? 'Atrasada!' : 'Data de entrega'}">
          🗓️ ${escapeHtml(task.dueDate)}
        </span>
      `;
    }

    // Assignee initials avatar
    let assigneeHtml = '';
    if (task.assignee) {
      const initials = task.assignee
        .split(' ')
        .map(w => w[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();
      assigneeHtml = `<span class="task-assignee" title="Responsável: ${escapeHtml(task.assignee)}">${escapeHtml(initials)}</span>`;
    }

    const priorityLabels = {
      urgent: 'Urgente',
      high: 'Alta',
      medium: 'Média',
      low: 'Baixa'
    };
    const priorityLeds = {
      urgent: 'led-red',
      high: 'led-amber',
      medium: 'led-amber',
      low: 'led-green'
    };
    const priorityText = priorityLabels[task.priority] || task.priority;
    const priorityLed = priorityLeds[task.priority] || 'led-cyan';

    cardEl.innerHTML = `
      <div class="task-card-header">
        <h4 class="task-card-title">${escapeHtml(task.title)}</h4>
        <div class="task-card-actions">
          <button class="task-card-btn edit-task-btn" title="Editar tarefa" aria-label="Editar tarefa">✏️</button>
        </div>
      </div>
      ${task.description ? `<p class="task-card-desc">${escapeHtml(task.description)}</p>` : ''}
      ${tagsHtml ? `<div class="task-tags">${tagsHtml}</div>` : ''}
      <div class="task-card-footer">
        <div class="task-footer-left">
          <span class="task-priority-pill ${task.priority}" style="display: inline-flex; align-items: center; gap: 4px;">
            <span class="site-led ${priorityLed}" style="width: 6px; height: 6px;"></span>
            ${escapeHtml(priorityText)}
          </span>
          ${dueDateHtml}
        </div>
        ${assigneeHtml}
      </div>
    `;

    // Click on card or edit button opens edit modal
    cardEl.addEventListener('click', (e) => {
      // Don't trigger if dragging
      if (cardEl.classList.contains('dragging')) return;
      modal.openEditTaskModal(task.id);
    });

    return cardEl;
  },

  /**
   * Update bottom stats card in sidebar.
   */
  renderMetrics(state) {
    const stats = state.getProjectStats();
    this.statsPercentage.textContent = `${stats.percentage}%`;
    this.statsProgressBar.style.width = `${stats.percentage}%`;
    this.statsTotal.textContent = stats.total;
    this.statsDone.textContent = stats.done;
  }
};

function escapeHtml(str) {
  return String(str || '').replace(/[&<>"']/g, m => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[m]);
}


  // ==================== universe.js ====================
/**
 * universe.js - Ambiente 3D imersivo da landing page.
 *
 * Campo de estrelas em perspectiva real (profundidade, parallax de mouse,
 * rastro de velocidade e estrelas cadentes). As nebulosas em degradê ficam
 * no CSS, atrás do canvas, para manter o custo de renderização baixo.
 */

class UniverseBackground {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas ? canvas.getContext('2d', { alpha: true }) : null;
    this.stars = [];
    this.running = false;
    this.rafId = 0;
    this.width = 0;
    this.height = 0;
    this.dpr = 1;
    this.lastTime = 0;
    this.time = 0;
    this.pointer = { x: 0, y: 0 };
    this.camera = { x: 0, y: 0 };
    this.shootingStar = null;
    this.nextShootingStar = 4 + Math.random() * 6;
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.palette = ['#ffffff', '#bfdbfe', '#93c5fd', '#c4b5fd', '#f0abfc', '#fca5a5'];

    this.loop = this.loop.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.handlePointerMove = this.handlePointerMove.bind(this);
  }

  init() {
    if (!this.canvas || !this.ctx) return;

    this.handleResize();
    this.buildStars();
    window.addEventListener('resize', this.handleResize);
    window.addEventListener('pointermove', this.handlePointerMove, { passive: true });

    if (this.reducedMotion) this.drawFrame(0);
  }

  getStarCount() {
    const area = window.innerWidth * window.innerHeight;
    return Math.max(130, Math.min(280, Math.round(area / 8200)));
  }

  buildStars() {
    const count = this.getStarCount();
    this.stars = Array.from({ length: count }, () => this.createStar(true));
  }

  createStar(randomDepth = false) {
    return {
      x: (Math.random() - 0.5) * 2,
      y: (Math.random() - 0.5) * 2,
      z: randomDepth ? 0.12 + Math.random() * 0.88 : 1,
      size: 0.45 + Math.random() * 1.7,
      color: this.palette[(Math.random() * this.palette.length) | 0],
      phase: Math.random() * Math.PI * 2,
      twinkle: 0.5 + Math.random() * 1.8
    };
  }

  handleResize() {
    if (!this.canvas || !this.ctx) return;

    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);

    this.canvas.width = Math.round(this.width * this.dpr);
    this.canvas.height = Math.round(this.height * this.dpr);
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);

    if (!this.stars.length) this.buildStars();
    if (!this.running) this.drawFrame(0);
  }

  handlePointerMove(event) {
    this.pointer.x = Math.max(-1, Math.min(1, (event.clientX / window.innerWidth - 0.5) * 2));
    this.pointer.y = Math.max(-1, Math.min(1, (event.clientY / window.innerHeight - 0.5) * 2));
  }

  start() {
    if (!this.canvas || !this.ctx) return;
    if (this.reducedMotion) {
      this.drawFrame(0);
      return;
    }
    if (this.running) return;

    this.running = true;
    this.lastTime = 0;
    this.rafId = requestAnimationFrame(this.loop);
  }

  stop() {
    this.running = false;
    if (this.rafId) cancelAnimationFrame(this.rafId);
    this.rafId = 0;
  }

  loop(now) {
    if (!this.running) return;

    const dt = this.lastTime ? Math.min((now - this.lastTime) / 1000, 0.05) : 0.016;
    this.lastTime = now;
    this.time += dt;

    this.drawFrame(dt);
    this.rafId = requestAnimationFrame(this.loop);
  }

  project(star, focal, cx, cy, z) {
    const scale = 0.55 / Math.max(0.06, z);
    const depth = 1 - Math.max(0, Math.min(1, z));
    const parallax = 90 * depth;
    return {
      x: cx + (star.x * this.width * 0.5 + this.camera.x * parallax) * scale,
      y: cy + (star.y * this.height * 0.5 + this.camera.y * parallax) * scale,
      scale
    };
  }

  drawFrame(dt) {
    const ctx = this.ctx;
    if (!ctx) return;

    ctx.clearRect(0, 0, this.width, this.height);

    const ease = this.reducedMotion ? 1 : 0.045;
    this.camera.x += (this.pointer.x - this.camera.x) * ease;
    this.camera.y += (this.pointer.y - this.camera.y) * ease;

    const cx = this.width / 2;
    const cy = this.height / 2;
    const focal = Math.min(this.width, this.height) * 1.15;

    // Desenha de trás para frente para que as estrelas próximas fiquem por cima.
    const ordered = this.stars.slice().sort((a, b) => b.z - a.z);

    for (const star of ordered) {
      if (!this.reducedMotion) {
        star.z -= dt * (0.035 + (1 - star.z) * 0.16);
        if (star.z <= 0.055) {
          Object.assign(star, this.createStar(false));
        }
      }

      const z = Math.max(0.055, Math.min(1, star.z));
      const pos = this.project(star, focal, cx, cy, z);
      const depth = 1 - z;
      const radius = Math.max(0.25, star.size * (0.35 + depth * 2.1));

      // Rastro de velocidade apenas para as estrelas mais próximas.
      if (!this.reducedMotion && z < 0.45) {
        const tail = this.project(star, focal, cx, cy, Math.min(1, z + 0.075));
        ctx.globalAlpha = Math.min(0.5, depth * 0.55);
        ctx.strokeStyle = star.color;
        ctx.lineWidth = Math.max(0.5, radius * 0.55);
        ctx.beginPath();
        ctx.moveTo(tail.x, tail.y);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
      }

      const twinkle = this.reducedMotion
        ? 1
        : 0.72 + 0.28 * Math.sin(this.time * star.twinkle + star.phase);

      ctx.globalAlpha = Math.min(1, (0.2 + depth * 1.15) * twinkle);
      ctx.fillStyle = star.color;
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2);
      ctx.fill();
    }

    if (!this.reducedMotion) {
      this.updateShootingStar(dt, ctx);
    }

    ctx.globalAlpha = 1;
  }

  updateShootingStar(dt, ctx) {
    this.nextShootingStar -= dt;

    if (!this.shootingStar && this.nextShootingStar <= 0) {
      const fromLeft = Math.random() > 0.5;
      this.shootingStar = {
        x: fromLeft ? -40 : this.width + 40,
        y: this.height * (0.12 + Math.random() * 0.45),
        vx: (fromLeft ? 1 : -1) * (280 + Math.random() * 240),
        vy: 120 + Math.random() * 90,
        life: 1,
        length: 90 + Math.random() * 90
      };
      this.nextShootingStar = 7 + Math.random() * 9;
    }

    const meteor = this.shootingStar;
    if (!meteor) return;

    meteor.x += meteor.vx * dt;
    meteor.y += meteor.vy * dt;
    meteor.life -= dt * 0.55;

    const speed = Math.hypot(meteor.vx, meteor.vy) || 1;
    const tailX = meteor.x - (meteor.vx / speed) * meteor.length;
    const tailY = meteor.y - (meteor.vy / speed) * meteor.length;

    const gradient = ctx.createLinearGradient(tailX, tailY, meteor.x, meteor.y);
    gradient.addColorStop(0, 'rgba(147, 197, 253, 0)');
    gradient.addColorStop(0.65, 'rgba(196, 181, 253, 0.55)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0.95)');

    ctx.globalAlpha = Math.max(0, meteor.life);
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.moveTo(tailX, tailY);
    ctx.lineTo(meteor.x, meteor.y);
    ctx.stroke();

    if (meteor.life <= 0 || meteor.x < -160 || meteor.x > this.width + 160 || meteor.y > this.height + 160) {
      this.shootingStar = null;
    }
  }
}


  // ==================== landing.js ====================
/**
 * landing.js - Controle da Landing Page com Seletor Circular (Motion Frame), LEDs e Navegação por Módulos
 */





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

const landing = new LandingController();


  // ==================== cursor.js ====================
/**
 * cursor.js - Cursor Cybernético Personalizado com Efeito de Rastro e Estados Reativos
 */

class CustomCursor {
  constructor() {
    this.dot = null;
    this.ring = null;
    this.mouseX = -100;
    this.mouseY = -100;
    this.ringX = -100;
    this.ringY = -100;
    this.rafId = null;
    this.isHovering = false;
    this.isClicking = false;
    this.enabled = true;
  }

  init() {
    // Apenas ativa se o dispositivo suportar mouse/ponteiro fino
    if (window.matchMedia('(pointer: coarse)').matches) {
      this.enabled = false;
      return;
    }

    // Cria elementos visuais do cursor
    this.dot = document.createElement('div');
    this.dot.className = 'custom-cursor-dot';

    this.ring = document.createElement('div');
    this.ring.className = 'custom-cursor-ring';

    document.body.appendChild(this.ring);
    document.body.appendChild(this.dot);

    // Eventos de movimento do mouse
    window.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;

      if (this.dot) {
        this.dot.style.transform = `translate3d(${this.mouseX}px, ${this.mouseY}px, 0) translate(-50%, -50%)`;
      }
    }, { passive: true });

    // Eventos de clique (Down / Up)
    window.addEventListener('mousedown', () => {
      this.isClicking = true;
      if (this.ring) this.ring.classList.add('cursor-clicking');
      if (this.dot) this.dot.classList.add('cursor-clicking');
    });

    window.addEventListener('mouseup', () => {
      this.isClicking = false;
      if (this.ring) this.ring.classList.remove('cursor-clicking');
      if (this.dot) this.dot.classList.remove('cursor-clicking');
    });

    // Detecta hover sobre elementos interativos
    document.addEventListener('mouseover', (e) => {
      const target = e.target;
      const isInteractive = target.closest('button, a, input, select, textarea, .task-card, .project-item, .orbit-node, .led-item, .circular-core, [role="button"]');

      if (isInteractive) {
        this.isHovering = true;
        if (this.ring) this.ring.classList.add('cursor-hover');
        if (this.dot) this.dot.classList.add('cursor-hover');
      }
    }, { passive: true });

    document.addEventListener('mouseout', (e) => {
      const target = e.target;
      const isInteractive = target.closest('button, a, input, select, textarea, .task-card, .project-item, .orbit-node, .led-item, .circular-core, [role="button"]');

      if (isInteractive) {
        this.isHovering = false;
        if (this.ring) this.ring.classList.remove('cursor-hover');
        if (this.dot) this.dot.classList.remove('cursor-hover');
      }
    }, { passive: true });

    // Esconde cursor ao sair da janela
    document.addEventListener('mouseleave', () => {
      if (this.dot) this.dot.style.opacity = '0';
      if (this.ring) this.ring.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
      if (this.dot) this.dot.style.opacity = '1';
      if (this.ring) this.ring.style.opacity = '1';
    });

    // Inicia loop de animação suave para o anel (LERP)
    this.renderLoop();
  }

  renderLoop() {
    if (!this.enabled) return;

    // Linear Interpolation para movimento orgânico do anel
    this.ringX += (this.mouseX - this.ringX) * 0.22;
    this.ringY += (this.mouseY - this.ringY) * 0.22;

    if (this.ring) {
      this.ring.style.transform = `translate3d(${this.ringX}px, ${this.ringY}px, 0) translate(-50%, -50%)`;
    }

    this.rafId = requestAnimationFrame(() => this.renderLoop());
  }
}

const cursor = new CustomCursor();


  // ==================== app.js ====================
/**
 * app.js - Main Application Entrypoint & Event Orchestrator
 */








function initApp() {
  // 1. Initialize Modals & Toasts
  modal.init();

  // 2. Subscribe UI renderer to reactive State updates
  state.subscribe((currentState) => {
    ui.render(currentState);
  });

  // 3. Bind Header & Global Controls
  setupHeaderControls();

  // 4. Bind Keyboard Shortcuts
  setupKeyboardShortcuts();

  // 5. Initialize State from Storage
  state.init();

  // 6. Connect to Real-time Sync Server
  setupRealtimeSync();

  // 7. Initialize Landing Page Showcase with Motion Frame and LEDs
  landing.init();

  // 8. Initialize Cybernetic Custom Cursor
  cursor.init();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

function setupHeaderControls() {
  // New Task button
  const btnNewTask = document.getElementById('btnNewTask');
  if (btnNewTask) {
    btnNewTask.addEventListener('click', () => {
      modal.openCreateTaskModal('todo');
    });
  }

  // New Project button in sidebar
  const btnNewProject = document.getElementById('btnNewProject');
  if (btnNewProject) {
    btnNewProject.addEventListener('click', () => {
      modal.openCreateProjectModal();
    });
  }

  // Edit Current Project button
  const btnEditCurrentProject = document.getElementById('btnEditCurrentProject');
  if (btnEditCurrentProject) {
    btnEditCurrentProject.addEventListener('click', () => {
      if (state.activeProjectId) {
        modal.openEditProjectModal(state.activeProjectId);
      }
    });
  }

  // Search Input & Clear Search
  const searchInput = document.getElementById('searchInput');
  const clearSearchBtn = document.getElementById('clearSearchBtn');

  if (searchInput && clearSearchBtn) {
    searchInput.addEventListener('input', (e) => {
      const val = e.target.value;
      state.setSearch(val);
      clearSearchBtn.hidden = !val;
    });

    clearSearchBtn.addEventListener('click', () => {
      searchInput.value = '';
      state.setSearch('');
      clearSearchBtn.hidden = true;
      searchInput.focus();
    });
  }

  // Priority Filter
  const priorityFilter = document.getElementById('priorityFilter');
  if (priorityFilter) {
    priorityFilter.addEventListener('change', (e) => {
      state.setPriorityFilter(e.target.value);
    });
  }

  // Theme Toggle
  const btnThemeToggle = document.getElementById('btnThemeToggle');
  if (btnThemeToggle) {
    btnThemeToggle.addEventListener('click', () => {
      const nextTheme = state.theme === 'dark' ? 'light' : 'dark';
      state.setTheme(nextTheme);
    });
  }

  // More Options Dropdown Toggle
  const btnMenuToggle = document.getElementById('btnMenuToggle');
  const dropdownMenu = document.getElementById('headerDropdownMenu');

  if (btnMenuToggle && dropdownMenu) {
    btnMenuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdownMenu.classList.toggle('show');
    });

    document.addEventListener('click', (e) => {
      if (!dropdownMenu.contains(e.target) && e.target !== btnMenuToggle) {
        dropdownMenu.classList.remove('show');
      }
    });
  }

  // Export Data JSON
  const btnExportData = document.getElementById('btnExportData');
  if (btnExportData) {
    btnExportData.addEventListener('click', () => {
      storage.exportData({
        projects: state.projects,
        tasks: state.tasks
      });
      dropdownMenu.classList.remove('show');
      modal.showToast('Dados exportados com sucesso', 'success');
    });
  }

  // Import Data JSON
  const fileImportData = document.getElementById('fileImportData');
  if (fileImportData) {
    fileImportData.addEventListener('change', async (e) => {
      const file = e.target.files?.[0];
      if (!file) return;

      try {
        await state.importFromFile(file);
        modal.showToast('Dados importados com sucesso!', 'success');
      } catch (err) {
        modal.showToast(err.message, 'error');
      } finally {
        fileImportData.value = '';
        dropdownMenu.classList.remove('show');
      }
    });
  }

  // Reset to Default Data
  const btnResetData = document.getElementById('btnResetData');
  if (btnResetData) {
    btnResetData.addEventListener('click', () => {
      dropdownMenu.classList.remove('show');
      if (confirm('Restaurar todos os projetos e tarefas para os dados padrão? Suas alterações serão substituídas.')) {
        state.resetAll();
        modal.showToast('Dados padrão restaurados com sucesso', 'info');
      }
    });
  }
}

function setupKeyboardShortcuts() {
  window.addEventListener('keydown', (e) => {
    // Ignore shortcuts when user is typing inside input or textarea
    const activeTag = document.activeElement?.tagName?.toLowerCase();
    const isTyping = activeTag === 'input' || activeTag === 'textarea' || activeTag === 'select';

    // Search focus on '/'
    if (e.key === '/' && !isTyping) {
      e.preventDefault();
      document.getElementById('searchInput')?.focus();
      return;
    }

    // New Task on 'Ctrl+N' or 'n' key
    if ((e.ctrlKey && e.key.toLowerCase() === 'n') || (e.key === 'n' && !isTyping && !e.ctrlKey && !e.metaKey)) {
      e.preventDefault();
      modal.openCreateTaskModal('todo');
      return;
    }
  });
}

function setupRealtimeSync() {
  const syncStatusPill = document.getElementById('syncStatusPill');
  const syncText = document.getElementById('syncText');

  sync.onStatusChange(({ status, count }) => {
    if (!syncStatusPill || !syncText) return;

    syncStatusPill.className = `sync-status-pill ${status}`;
    if (status === 'connected') {
      syncText.textContent = count > 1 ? `${count} online` : 'Ao vivo';
      syncStatusPill.title = `Conectado em tempo real (${count} usuário(s) conectado(s))`;
    } else if (status === 'connecting') {
      syncText.textContent = 'Conectando...';
      syncStatusPill.title = 'Conectando ao servidor em tempo real...';
    } else if (status === 'static') {
      syncText.textContent = 'GitHub Pages';
      syncStatusPill.title = 'Executando em hospedagem estática (dados salvos localmente no navegador)';
    } else {
      syncText.textContent = 'Modo Local';
      syncStatusPill.title = 'Executando em modo local offline';
    }
  });

  // Start real-time connection and listen for changes made by other people
  sync.init(state, (remotePayload) => {
    if (remotePayload.isReset) {
      modal.showToast('O quadro foi restaurado para os dados padrão por outro usuário.', 'info');
    } else {
      modal.showToast('Quadro sincronizado em tempo real.', 'info');
    }
  });
}


})();

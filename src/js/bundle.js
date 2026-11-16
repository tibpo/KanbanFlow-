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
    this.renderProjects(state);
    this.renderActiveProjectHeader(state);
    this.renderColumnsAndCards(state);
    this.renderMetrics(state);
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


  // ==================== landing.js ====================
/**
 * landing.js - Controle da Landing Page com Seletor Circular (Motion Frame) e Painel de LEDs
 */


class LandingController {
  constructor() {
    this.overlay = null;
    this.isOpen = false;
    this.selectedNodeId = null;
  }

  init() {
    this.overlay = document.getElementById('landingOverlay');
    this.coreElement = document.getElementById('circularCore');
    this.coreTitle = document.getElementById('coreTitle');
    this.coreMeta = document.getElementById('coreMeta');
    this.coreIcon = document.getElementById('coreIcon');
    this.nodesContainer = document.getElementById('circularNodesContainer');

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

    // Configura os LEDs interativos
    this.setupLeds();

    // Atualiza os círculos orbitais quando o estado mudar
    state.subscribe(() => {
      if (this.isOpen) {
        this.renderCircularSelector();
      }
    });

    // Tecla Escape fecha a landing
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });
  }

  open() {
    if (!this.overlay) return;
    this.overlay.hidden = false;
    this.isOpen = true;
    this.renderCircularSelector();
  }

  close() {
    if (!this.overlay) return;
    this.overlay.hidden = true;
    this.isOpen = false;
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
      // Distribui os nós equidistantemente em 360 graus
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

        // Atualiza estilo ativo nos nós
        this.nodesContainer.querySelectorAll('.orbit-node').forEach(n => n.classList.remove('active'));
        nodeEl.classList.add('active');

        // Dispara efeito de pulso de LED
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
   * Configura o painel de LEDs multicoloridos
   */
  setupLeds() {
    const ledItems = document.querySelectorAll('.led-item');
    ledItems.forEach(item => {
      item.addEventListener('click', () => {
        const lamp = item.querySelector('.led-lamp');
        if (!lamp) return;

        // Efeito de clique: super brilho temporário
        lamp.style.transform = 'scale(1.4)';
        lamp.style.filter = 'brightness(2)';

        setTimeout(() => {
          lamp.style.transform = '';
          lamp.style.filter = '';
        }, 300);
      });
    });
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

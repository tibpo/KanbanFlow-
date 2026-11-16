/**
 * ui.js - DOM Rendering Engine for Projects, Columns, Task Cards, and Progress Metrics
 */

import { COLUMNS } from './config.js';
import { dragDrop } from './dragDrop.js';
import { modal } from './modal.js';

export const ui = {
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
        <span class="project-item-badge">${taskCount}</span>
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

      // Header
      const headerEl = document.createElement('div');
      headerEl.className = 'column-header';
      headerEl.innerHTML = `
        <div class="column-header-left">
          <span class="column-indicator ${column.id}"></span>
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
    const priorityText = priorityLabels[task.priority] || task.priority;

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
          <span class="task-priority-pill ${task.priority}">${escapeHtml(priorityText)}</span>
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

/**
 * modal.js - Modal dialog managers for Tasks & Projects, and Toast notifications
 */

import { state } from './state.js';

export const modal = {
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

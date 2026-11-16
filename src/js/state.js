/**
 * state.js - Central State Management & Business Logic (Reactive Store)
 */

import { storage } from './storage.js';
import { sync } from './sync.js';

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

export const state = new State();

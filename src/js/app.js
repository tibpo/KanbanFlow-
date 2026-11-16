/**
 * app.js - Main Application Entrypoint & Event Orchestrator
 */

import { state } from './state.js';
import { ui } from './ui.js';
import { modal } from './modal.js';
import { storage } from './storage.js';
import { sync } from './sync.js';
import { landing } from './landing.js';

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

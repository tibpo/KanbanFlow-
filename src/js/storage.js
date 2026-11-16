/**
 * storage.js - LocalStorage persistence and JSON Data Export/Import
 */

import { STORAGE_KEY, THEME_KEY, INITIAL_DATA } from './config.js';

export const storage = {
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

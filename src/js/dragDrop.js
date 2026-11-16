/**
 * dragDrop.js - Native HTML5 Drag and Drop Controller
 */

import { state } from './state.js';

let draggedCardId = null;
let currentDropIndicator = null;

export const dragDrop = {
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

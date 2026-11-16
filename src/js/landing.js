/**
 * landing.js - Controle da Landing Page com Seletor Circular (Motion Frame) e Painel de LEDs
 */

import { state } from './state.js';

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

export const landing = new LandingController();

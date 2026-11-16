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

export const cursor = new CustomCursor();

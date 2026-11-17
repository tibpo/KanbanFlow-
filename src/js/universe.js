/**
 * universe.js - Ambiente 3D imersivo da landing page.
 *
 * Campo de estrelas em perspectiva real (profundidade, parallax de mouse,
 * rastro de velocidade e estrelas cadentes). As nebulosas em degradê ficam
 * no CSS, atrás do canvas, para manter o custo de renderização baixo.
 */

export class UniverseBackground {
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

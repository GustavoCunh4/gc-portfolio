const REDUCE = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const COARSE = window.matchMedia('(pointer: coarse)').matches;

export function initParticles() {
  if (REDUCE || COARSE) return;

  const canvas = document.createElement('canvas');
  canvas.setAttribute('aria-hidden', 'true');
  canvas.style.cssText =
    'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:0;opacity:0;transition:opacity 1.2s ease;';
  document.body.prepend(canvas);
  requestAnimationFrame(() => { canvas.style.opacity = '1'; });

  const ctx = canvas.getContext('2d');
  const N = 58, LINK = 148;
  let W = 0, H = 0, mx = -9999, my = -9999;

  const resize = () => {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  };

  class Dot {
    constructor() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.vx = (Math.random() - 0.5) * 0.38;
      this.vy = (Math.random() - 0.5) * 0.38;
      this.r = Math.random() * 1.7 + 0.6;
      this.a = Math.random() * 0.28 + 0.07;
    }
    tick() {
      const dx = mx - this.x, dy = my - this.y;
      const d2 = dx * dx + dy * dy;
      if (d2 < 70000) {
        const inv = 0.016 / (Math.sqrt(d2) || 1);
        this.vx += dx * inv;
        this.vy += dy * inv;
      }
      this.vx *= 0.976;
      this.vy *= 0.976;
      this.x = (this.x + this.vx + W) % W;
      this.y = (this.y + this.vy + H) % H;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, 6.2832);
      ctx.fillStyle = `rgba(255,102,0,${this.a})`;
      ctx.fill();
    }
  }

  resize();
  window.addEventListener('resize', resize, { passive: true });
  window.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; }, { passive: true });

  const dots = Array.from({ length: N }, () => new Dot());

  const frame = () => {
    ctx.clearRect(0, 0, W, H);
    for (const d of dots) d.tick();
    for (let i = 0; i < N; i++) {
      for (let j = i + 1; j < N; j++) {
        const dx = dots[i].x - dots[j].x;
        const dy = dots[i].y - dots[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < LINK) {
          ctx.beginPath();
          ctx.moveTo(dots[i].x, dots[i].y);
          ctx.lineTo(dots[j].x, dots[j].y);
          ctx.strokeStyle = `rgba(255,102,0,${(1 - dist / LINK) * 0.19})`;
          ctx.lineWidth = 0.65;
          ctx.stroke();
        }
      }
    }
    for (const d of dots) d.draw();
    requestAnimationFrame(frame);
  };
  frame();
}

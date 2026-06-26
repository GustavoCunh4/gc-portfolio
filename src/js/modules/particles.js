const REDUCE = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const COARSE = window.matchMedia('(pointer: coarse)').matches;

export function initParticles() {
  if (REDUCE || COARSE) return;

  const canvas = document.createElement('canvas');
  canvas.setAttribute('aria-hidden', 'true');
  canvas.style.cssText =
    'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:0;';
  document.body.prepend(canvas);

  const ctx = canvas.getContext('2d');
  const N = 72, LINK = 115, SPOT = 280;
  let W = 0, H = 0, mx = -9999, my = -9999;

  const resize = () => {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  };

  class Dot {
    constructor() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.vx = (Math.random() - 0.5) * 0.45;
      this.vy = (Math.random() - 0.5) * 0.45;
      this.r = Math.random() * 2 + 0.8;
    }
    tick() {
      this.x = (this.x + this.vx + W) % W;
      this.y = (this.y + this.vy + H) % H;
    }
    vis() {
      const dx = mx - this.x, dy = my - this.y;
      return Math.max(0, 1 - Math.sqrt(dx * dx + dy * dy) / SPOT);
    }
  }

  resize();
  window.addEventListener('resize', resize, { passive: true });
  window.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; }, { passive: true });

  const dots = Array.from({ length: N }, () => new Dot());

  const frame = () => {
    ctx.clearRect(0, 0, W, H);
    const vis = dots.map(d => { d.tick(); return d.vis(); });

    for (let i = 0; i < N; i++) {
      if (vis[i] <= 0.01) continue;
      for (let j = i + 1; j < N; j++) {
        if (vis[j] <= 0.01) continue;
        const dx = dots[i].x - dots[j].x;
        const dy = dots[i].y - dots[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d >= LINK) continue;
        const a = Math.min(vis[i], vis[j]) * (1 - d / LINK) * 0.42;
        ctx.beginPath();
        ctx.moveTo(dots[i].x, dots[i].y);
        ctx.lineTo(dots[j].x, dots[j].y);
        ctx.strokeStyle = `rgba(255,102,0,${a})`;
        ctx.lineWidth = 0.9;
        ctx.stroke();
      }
    }

    for (let i = 0; i < N; i++) {
      if (vis[i] <= 0.01) continue;
      ctx.beginPath();
      ctx.arc(dots[i].x, dots[i].y, dots[i].r, 0, 6.2832);
      ctx.fillStyle = `rgba(255,102,0,${vis[i] * 0.7})`;
      ctx.fill();
    }

    requestAnimationFrame(frame);
  };
  frame();
}

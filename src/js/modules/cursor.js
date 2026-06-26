export function initCursor() {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const glow = document.createElement('div');
  glow.className = 'cursor-glow';
  glow.setAttribute('aria-hidden', 'true');
  document.body.appendChild(glow);

  let tx = -2000, ty = -2000;
  let cx = -2000, cy = -2000;

  function lerp(a, b, t) { return a + (b - a) * t; }

  (function tick() {
    cx = lerp(cx, tx, 0.09);
    cy = lerp(cy, ty, 0.09);
    glow.style.setProperty('--cx', cx + 'px');
    glow.style.setProperty('--cy', cy + 'px');
    requestAnimationFrame(tick);
  })();

  window.addEventListener('mousemove', e => {
    tx = e.clientX;
    ty = e.clientY;
  }, { passive: true });

  window.addEventListener('mouseleave', () => { tx = ty = -2000; });

  // Magnetic buttons
  document.querySelectorAll('.button--primary, .button--secondary').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r  = btn.getBoundingClientRect();
      const dx = (e.clientX - r.left - r.width  / 2) * 0.2;
      const dy = (e.clientY - r.top  - r.height / 2) * 0.2;
      btn.style.transform = `translate(${dx}px, ${dy}px)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
  });
}

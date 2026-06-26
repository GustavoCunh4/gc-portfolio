export function initTilt() {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const MAX = 8;

  function getShine(card) {
    let s = card.querySelector('.tilt-shine');
    if (!s) {
      s = document.createElement('span');
      s.className = 'tilt-shine';
      s.setAttribute('aria-hidden', 'true');
      card.appendChild(s);
    }
    return s;
  }

  document.addEventListener('mousemove', e => {
    const card = e.target.closest('[data-tilt]');
    if (!card) return;
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - 0.5;
    const y = (e.clientY - r.top)  / r.height - 0.5;
    card.style.transform = `perspective(900px) rotateX(${-y * MAX}deg) rotateY(${x * MAX}deg) translateZ(8px)`;
    getShine(card).style.background = `radial-gradient(circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%, rgba(255,255,255,0.11) 0%, transparent 55%)`;
  }, { passive: true });

  document.addEventListener('mouseout', e => {
    const card = e.target.closest('[data-tilt]');
    if (!card || card.contains(e.relatedTarget)) return;
    card.style.transform = '';
    const s = card.querySelector('.tilt-shine');
    if (s) s.style.background = '';
  });
}

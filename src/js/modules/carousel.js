/**
 * carousel.js — Carrossel orbital 3D com auto-rotate
 * Inspirado no estilo mousham.design:
 * os cards ficam posicionados em arco, rotacionando em perspectiva 3D.
 */

export function initCarousel() {
  const track    = document.getElementById('orbital-track');
  const cards    = Array.from(document.querySelectorAll('.orb-card'));
  const prevBtn  = document.getElementById('orb-prev');
  const nextBtn  = document.getElementById('orb-next');
  const dots     = Array.from(document.querySelectorAll('.orb-dot'));

  if (!track || !cards.length) return;

  const total = cards.length;
  let current = 0;
  let autoTimer = null;
  let isDragging = false;
  let dragStartX = 0;
  let dragDelta = 0;

  // ── Posicionamento orbital em perspectiva ──
  function getCardTransform(i, active) {
    const offset = i - active;
    // Normaliza para o caminho mais curto
    let norm = offset;
    if (norm >  total / 2) norm -= total;
    if (norm < -total / 2) norm += total;

    const angleStep = 38; // graus entre cards
    const rotY  = norm * angleStep;
    const z     = norm === 0 ? 0 : -160 - Math.abs(norm) * 60;
    const x     = norm * 0;  // o rotateY já cria o efeito lateral
    const scale = norm === 0 ? 1 : 0.78 - Math.abs(norm) * 0.06;
    const opacity = norm === 0 ? 1 : Math.max(0.25, 0.65 - Math.abs(norm) * 0.18);

    return { rotY, z, scale, opacity, norm };
  }

  function render(activeIdx) {
    cards.forEach((card, i) => {
      const { rotY, z, scale, opacity, norm } = getCardTransform(i, activeIdx);
      const isActive = i === activeIdx;

      card.style.transform = [
        `translateX(-50%)`,
        `translateY(-50%)`,
        `rotateY(${rotY}deg)`,
        `translateZ(${z}px)`,
        `scale(${scale})`
      ].join(' ');
      card.style.opacity = opacity;
      card.style.zIndex  = isActive ? 5 : Math.max(1, 3 - Math.abs(norm));
      card.style.filter  = isActive ? 'none' : `blur(${Math.min(2, Math.abs(norm) * .8)}px)`;
      card.classList.toggle('is-active', isActive);
      card.setAttribute('aria-hidden', !isActive);
    });

    dots.forEach((d, i) => d.classList.toggle('active', i === activeIdx));
  }

  function goTo(idx) {
    current = ((idx % total) + total) % total;
    render(current);
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  // ── Auto-rotate ──
  function startAuto() {
    stopAuto();
    autoTimer = setInterval(() => { if (!isDragging) next(); }, 3200);
  }
  function stopAuto() { clearInterval(autoTimer); }
  function resetAuto() { stopAuto(); startAuto(); }

  // ── Controls ──
  nextBtn?.addEventListener('click', () => { next(); resetAuto(); });
  prevBtn?.addEventListener('click', () => { prev(); resetAuto(); });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { goTo(i); resetAuto(); });
  });

  // ── Keyboard ──
  document.addEventListener('keydown', e => {
    const proj = document.getElementById('p-projects');
    if (!proj?.classList.contains('visible')) return;
    if (e.key === 'ArrowRight') { next(); resetAuto(); }
    if (e.key === 'ArrowLeft')  { prev(); resetAuto(); }
  });

  // ── Touch / drag ──
  const carousel = document.getElementById('orbital-carousel');

  function onDragStart(x) { isDragging = true; dragStartX = x; dragDelta = 0; stopAuto(); }
  function onDragMove(x)  { if (!isDragging) return; dragDelta = x - dragStartX; }
  function onDragEnd() {
    if (!isDragging) return;
    isDragging = false;
    if (dragDelta < -40) next();
    else if (dragDelta > 40) prev();
    startAuto();
  }

  // Touch
  carousel?.addEventListener('touchstart', e => onDragStart(e.touches[0].clientX), { passive: true });
  carousel?.addEventListener('touchmove',  e => onDragMove(e.touches[0].clientX),  { passive: true });
  carousel?.addEventListener('touchend',   onDragEnd);

  // Mouse drag
  carousel?.addEventListener('mousedown',  e => onDragStart(e.clientX));
  carousel?.addEventListener('mousemove',  e => onDragMove(e.clientX));
  carousel?.addEventListener('mouseup',    onDragEnd);
  carousel?.addEventListener('mouseleave', onDragEnd);

  // Pause on hover
  carousel?.addEventListener('mouseenter', stopAuto);
  carousel?.addEventListener('mouseleave', () => { if (!isDragging) startAuto(); });

  // ── Init ──
  render(0);
  startAuto();
}

export function initCursor() {
  if (window.matchMedia('(hover: none)').matches) return;

  const dot  = document.getElementById('cur');
  const ring = document.getElementById('cur-r');
  if (!dot || !ring) return;

  let mx = -200, my = -200;
  let rx = -200, ry = -200;
  const lerp = (a, b, t) => a + (b - a) * t;

  const INTERACTIVE = 'a, button, [role="button"], input, select, label, [tabindex]';
  const CARDS = '.stack-card, .project-card, .more-card, .timeline-card';

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    if (!dot.classList.contains('on')) {
      dot.classList.add('on');
      ring.classList.add('on');
    }
  });

  document.addEventListener('mouseleave', () => {
    dot.classList.remove('on');
    ring.classList.remove('on');
  });

  document.addEventListener('mouseenter', () => {
    dot.classList.add('on');
    ring.classList.add('on');
  });

  document.addEventListener('mousedown', () => {
    dot.classList.add('is-click');
    ring.classList.add('is-click');
  });

  document.addEventListener('mouseup', () => {
    dot.classList.remove('is-click');
    ring.classList.remove('is-click');
  });

  document.addEventListener('mouseover', e => {
    const t = e.target;
    const isInteractive = !!(t.closest?.(INTERACTIVE));
    const isCard = !!(t.closest?.(CARDS));
    dot.classList.toggle('is-hover', isInteractive);
    ring.classList.toggle('is-hover', isInteractive);
    dot.classList.toggle('is-view', !isInteractive && isCard);
    ring.classList.toggle('is-view', !isInteractive && isCard);
  });

  document.addEventListener('mouseout', e => {
    const to = e.relatedTarget;
    if (!to?.closest?.(INTERACTIVE)) {
      dot.classList.remove('is-hover');
      ring.classList.remove('is-hover');
    }
    if (!to?.closest?.(CARDS)) {
      dot.classList.remove('is-view');
      ring.classList.remove('is-view');
    }
  });

  function tick() {
    rx = lerp(rx, mx, 0.115);
    ry = lerp(ry, my, 0.115);
    dot.style.transform  = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
    ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
    requestAnimationFrame(tick);
  }
  tick();
}

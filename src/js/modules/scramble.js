const GLYPHS = '!<>-_\\/[]{}—=+*^?#@$%&';

function scramble(el) {
  const text  = el.textContent;
  const len   = text.length;
  let   frame = 0;
  const TOTAL = 20;

  const id = setInterval(() => {
    el.textContent = text
      .split('')
      .map((ch, i) => {
        if (ch === ' ' || ch === '\n') return ch;
        if (i < Math.floor((frame / TOTAL) * len)) return ch;
        return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      })
      .join('');

    if (++frame > TOTAL) {
      clearInterval(id);
      el.textContent = text;
    }
  }, 30);
}

export function initScramble() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const targets = document.querySelectorAll('[data-scramble]');
  if (!targets.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      scramble(entry.target);
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.35 });

  targets.forEach(el => obs.observe(el));
}

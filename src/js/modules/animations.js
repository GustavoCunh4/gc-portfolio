const easeOutCubic = t => 1 - (1 - t) ** 3;

export function initCounters() {
  const elements = document.querySelectorAll('[data-count]');
  if (!elements.length) return;

  const DURATION = 1500;

  function run(el) {
    const target = parseInt(el.dataset.count, 10);
    const pad    = el.dataset.pad ? parseInt(el.dataset.pad, 10) : 0;
    const suffix = el.dataset.suffix ?? '';
    const start  = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / DURATION, 1);
      const value    = Math.round(target * easeOutCubic(progress));
      el.textContent = pad ? String(value).padStart(pad, '0') + suffix : value + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }

    el.textContent = pad ? '00' + suffix : '0' + suffix;
    requestAnimationFrame(tick);
  }

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        run(entry.target);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.6 }
  );

  elements.forEach(el => observer.observe(el));
}

export function initScrollProgress() {
  const bar = document.querySelector('.scroll-progress');
  if (!bar) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (ticking) return;
    requestAnimationFrame(() => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const pct   = total > 0 ? (window.scrollY / total) * 100 : 0;
      bar.style.width = pct + '%';
      ticking = false;
    });
    ticking = true;
  }, { passive: true });
}

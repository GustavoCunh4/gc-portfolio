const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const coarsePointer = window.matchMedia('(pointer: coarse)').matches;

let revealObserver = null;
let timelineObserver = null;
let parallaxItems = [];
let lastScrollY = window.scrollY;
let ticking = false;
let navLine = null;

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function setScrollState() {
  const current = window.scrollY;
  const direction = current > lastScrollY ? 'down' : 'up';
  document.documentElement.dataset.scrollDirection = direction;
  document.body.classList.toggle('is-scrolled', current > 16);
  lastScrollY = current;

  const hero = document.querySelector('.hero');
  if (hero) {
    const progress = clamp(current / Math.max(hero.offsetHeight, 1), 0, 1);
    hero.style.setProperty('--hero-progress', progress.toFixed(3));
  }

  parallaxItems.forEach(({ card, image }) => {
    const rect = card.getBoundingClientRect();
    const viewport = window.innerHeight || 1;
    const center = rect.top + rect.height / 2;
    const delta = (center - viewport / 2) / viewport;
    image.style.setProperty('--media-shift', `${clamp(delta * -34, -28, 28).toFixed(1)}px`);
  });
}

function requestScrollTick() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    setScrollState();
    ticking = false;
  });
}

function initReveals() {
  revealObserver?.disconnect();
  const elements = document.querySelectorAll('[data-reveal]');
  if (!elements.length) return;

  if (reduceMotion) {
    elements.forEach(el => el.classList.add('is-visible'));
    return;
  }

  revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const el = entry.target;
      el.classList.toggle('is-visible', entry.isIntersecting);
      el.classList.toggle('is-past', entry.boundingClientRect.top < 0 && !entry.isIntersecting);
    });
  }, { rootMargin: '-8% 0px -10% 0px', threshold: [0, 0.12, 0.36, 0.7] });

  elements.forEach(el => revealObserver.observe(el));
}

function initTimelineFocus() {
  timelineObserver?.disconnect();
  const items = document.querySelectorAll('.timeline-item');
  if (!items.length) return;

  timelineObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      entry.target.classList.toggle('is-active', entry.isIntersecting);
    });
  }, { rootMargin: '-34% 0px -42% 0px', threshold: [0, 0.25, 0.6] });

  items.forEach(item => timelineObserver.observe(item));
}

function initMediaParallax() {
  parallaxItems = [];
  if (reduceMotion || coarsePointer) return;

  document.querySelectorAll('.project-card').forEach(card => {
    const image = card.querySelector('.project-media img');
    if (!image) return;
    parallaxItems.push({ card, image });
  });
}

function initNavMagnetism() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', requestScrollTick, { passive: true });
  window.addEventListener('resize', requestScrollTick);
  requestScrollTick();
}

function initSectionIndex() {
  const sections = Array.from(document.querySelectorAll('main > section[id]'));
  sections.forEach((section, index) => {
    section.style.setProperty('--section-index', String(index + 1).padStart(2, '0'));
  });
}

function initNavScroll() {
  navLine = document.createElement('div');
  navLine.className = 'nav-line';
  navLine.setAttribute('aria-hidden', 'true');
  document.body.appendChild(navLine);

  document.addEventListener('click', e => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    const id = link.getAttribute('href').slice(1);
    const target = id ? document.getElementById(id) : null;
    const scrollTop = !id || id === 'top';

    if (!scrollTop && !target) return;
    e.preventDefault();

    navLine.classList.add('is-running');
    setTimeout(() => {
      if (scrollTop) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      setTimeout(() => navLine.classList.remove('is-running'), 800);
    }, 90);
  });
}

export function refreshEditorialMotion() {
  initReveals();
  initTimelineFocus();
  initMediaParallax();
  requestScrollTick();
}

export function initEditorialMotion() {
  document.documentElement.classList.add('motion-ready');
  initSectionIndex();
  initNavMagnetism();
  initNavScroll();
  refreshEditorialMotion();
}

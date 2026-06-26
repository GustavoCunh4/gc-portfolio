import { featuredProjects, moreProjects } from './data.js';
import { applyTranslations, getInitialLocale, getMessage } from './i18n.js';
import { initCounters, initScrollProgress } from './modules/animations.js';
import { initCursor } from './modules/cursor.js';
import { initTilt } from './modules/tilt.js';
import { initScramble } from './modules/scramble.js';
import { initEditorialMotion, refreshEditorialMotion } from './modules/motion.js';
import { initParticles } from './modules/particles.js';
import { initTypewriter } from './modules/typewriter.js';

const externalIcon = `
  <svg aria-hidden="true" viewBox="0 0 24 24">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6m4-3h6v6m-11 5L21 3"/>
  </svg>`;

const githubIcon = `
  <svg aria-hidden="true" viewBox="0 0 24 24">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3.3-.4 6.8-1.6 6.8-7.4A5.8 5.8 0 0 0 19.3 3 5.4 5.4 0 0 0 19.2 0S18 0 15 1.6a13.4 13.4 0 0 0-7 0C5 0 3.8 0 3.8 0a5.4 5.4 0 0 0-.1 3A5.8 5.8 0 0 0 2.2 7c0 5.8 3.5 7 6.8 7.4A4.8 4.8 0 0 0 8 18v4"/>
  </svg>`;

let locale = getInitialLocale();
let menuOpen = false;
let sceneApi = null;
let heroVisible = true;

const menuToggle = document.getElementById('menu-toggle');
const navPanel = document.getElementById('nav-panel');
const featuredGrid = document.getElementById('featured-projects');
const moreGrid = document.getElementById('more-projects-grid');
const mobileMenuQuery = window.matchMedia('(max-width: 860px)');

function renderTagList(tags) {
  return `<div class="tag-list">${tags.map(tag => `<span>${tag}</span>`).join('')}</div>`;
}

function renderFeaturedProjects() {
  featuredGrid.innerHTML = featuredProjects.map((project, index) => {
    const num = String(index + 1).padStart(2, '0');
    const dir = index % 2 === 0 ? 'ltr' : 'rtl';
    const hasDemo = Boolean(project.demoUrl);
    const hasRepo = Boolean(project.repositoryUrl);
    const hasNote = Boolean(project.note);

    return `
    <article class="project-chapter" data-reveal="chapter" data-dir="${dir}">
      <figure class="chapter-visual">
        <div class="chapter-num-bg" aria-hidden="true">${num}</div>
        <picture>
          <source srcset="${project.image.avif}" type="image/avif" />
          <img
            src="${project.image.webp}"
            alt="${project.alt[locale]}"
            width="960" height="600"
            loading="lazy" decoding="async"
          />
        </picture>
      </figure>
      <div class="chapter-body">
        <p class="chapter-eyebrow">CASE / ${num}</p>
        <h3 class="chapter-title" data-typewriter>${project.title}</h3>
        <p class="chapter-desc" data-typewriter>${project.summary[locale]}</p>
        ${renderTagList(project.stack)}
        ${hasNote ? `<p class="chapter-note">${project.note[locale]}</p>` : ''}
        ${hasDemo || hasRepo ? `
        <div class="chapter-actions">
          ${hasDemo ? `
            <a class="button button--primary" href="${project.demoUrl}" target="_blank" rel="noopener noreferrer">
              ${externalIcon}<span>${getMessage(locale, 'common.demo')}</span>
            </a>` : ''}
          ${hasRepo ? `
            <a class="button button--secondary" href="${project.repositoryUrl}" target="_blank" rel="noopener noreferrer">
              ${githubIcon}<span>${getMessage(locale, 'common.code')}</span>
            </a>` : ''}
        </div>` : ''}
      </div>
    </article>`;
  }).join('');
}

function renderMoreProjects() {
  moreGrid.innerHTML = moreProjects.map(project => `
    <article class="more-card lab-card" data-tilt data-reveal="rise">
      <div class="more-card-header">
        <span class="more-card-label">${project.category[locale]}</span>
        <div class="more-card-links">
          ${project.demoUrl ? `
            <a href="${project.demoUrl}" target="_blank" rel="noopener noreferrer" aria-label="${project.title} — ${getMessage(locale, 'common.demo')}">
              ${externalIcon}
            </a>
          ` : ''}
          <a href="${project.repositoryUrl}" target="_blank" rel="noopener noreferrer" aria-label="${project.title} — GitHub">
            ${githubIcon}
          </a>
        </div>
      </div>
      <h3>${project.title}</h3>
      <p>${project.summary[locale]}</p>
      ${renderTagList(project.stack)}
    </article>
  `).join('');
}

function updateLocale(nextLocale, persist = false) {
  locale = nextLocale;
  if (persist) localStorage.setItem('gc-locale', locale);

  applyTranslations(locale);
  document.querySelectorAll('.locale-btn').forEach(button => {
    button.setAttribute('aria-pressed', button.dataset.locale === locale);
  });
  updateMenuLabel();
  renderFeaturedProjects();
  renderMoreProjects();
  refreshEditorialMotion();
  initTypewriter();
}

function updateMenuLabel() {
  menuToggle?.setAttribute('aria-label', getMessage(locale, menuOpen ? 'nav.closeMenu' : 'nav.openMenu'));
}

function getMenuFocusableElements() {
  return Array.from(navPanel.querySelectorAll('a[href], button:not([disabled])'));
}

function setMenu(open, restoreFocus = false) {
  if (!menuToggle || !navPanel) return;

  menuOpen = open;
  menuToggle.setAttribute('aria-expanded', String(open));
  navPanel.classList.toggle('is-open', open);
  navPanel.inert = mobileMenuQuery.matches && !open;
  document.body.classList.toggle('menu-open', open);
  updateMenuLabel();

  if (open) {
    getMenuFocusableElements()[0]?.focus();
  } else if (restoreFocus) {
    menuToggle.focus();
  }
}

function syncMenuAccessibility() {
  if (!mobileMenuQuery.matches && menuOpen) {
    menuOpen = false;
    menuToggle.setAttribute('aria-expanded', 'false');
    navPanel.classList.remove('is-open');
    document.body.classList.remove('menu-open');
    updateMenuLabel();
  }
  navPanel.inert = mobileMenuQuery.matches && !menuOpen;
}

function handleMenuKeyboard(event) {
  if (!menuOpen) return;

  if (event.key === 'Escape') {
    setMenu(false, true);
    return;
  }

  if (event.key !== 'Tab') return;

  const focusable = getMenuFocusableElements();
  const first = focusable[0];
  const last  = focusable.at(-1);
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

function initNavigation() {
  syncMenuAccessibility();
  menuToggle?.addEventListener('click', () => setMenu(!menuOpen));
  document.addEventListener('keydown', handleMenuKeyboard);
  mobileMenuQuery.addEventListener('change', syncMenuAccessibility);

  navPanel?.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', () => setMenu(false));
  });

  document.querySelectorAll('.locale-btn').forEach(button => {
    button.addEventListener('click', () => updateLocale(button.dataset.locale, true));
  });

  const sectionLinks  = Array.from(document.querySelectorAll('.nav-links a[href^="#"]'));
  const linkBySection = new Map(sectionLinks.map(link => [link.getAttribute('href').slice(1), link]));
  const sections      = Array.from(linkBySection.keys()).map(id => document.getElementById(id)).filter(Boolean);

  const sectionObserver = new IntersectionObserver(entries => {
    const active = entries
      .filter(entry => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!active) return;
    sectionLinks.forEach(link => link.removeAttribute('aria-current'));
    linkBySection.get(active.target.id)?.setAttribute('aria-current', 'location');
  }, { rootMargin: '-28% 0px -58%', threshold: [0, 0.2, 0.5] });

  sections.forEach(section => sectionObserver.observe(section));
}

function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch {
    return false;
  }
}

async function initScene() {
  const canvas      = document.getElementById('hero-canvas');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!canvas || reduceMotion || !supportsWebGL()) return;

  try {
    const { initHeroScene } = await import('./modules/scene.js');
    sceneApi = initHeroScene(canvas);
    sceneApi.setActive(heroVisible && !document.hidden);
  } catch (error) {
    console.warn('Interactive scene unavailable; static fallback retained.', error);
  }
}

function initSceneLifecycle() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  new IntersectionObserver(([entry]) => {
    heroVisible = entry.isIntersecting;
    sceneApi?.setActive(heroVisible && !document.hidden);
  }, { threshold: 0.03 }).observe(hero);

  document.addEventListener('visibilitychange', () => {
    sceneApi?.setActive(heroVisible && !document.hidden);
  });

  const schedule = window.requestIdleCallback ?? (callback => window.setTimeout(callback, 120));
  schedule(initScene, { timeout: 700 });
}

document.getElementById('current-year').textContent = String(new Date().getFullYear());
updateLocale(locale);
initNavigation();
initSceneLifecycle();
initCounters();
initScrollProgress();
initCursor();
initTilt();
initScramble();
initEditorialMotion();
initParticles();
initTypewriter();

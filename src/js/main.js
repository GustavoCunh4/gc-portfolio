/**
 * main.js — Entry point
 * Three.js é importado via npm: rode `npm install` antes de `npm run dev`
 */
import * as THREE from 'three';
import { initScene }    from './modules/scene.js';
import { initCamera }   from './modules/camera.js';
import { initScroll }   from './modules/scroll.js';
import { initCursor }   from './modules/cursor.js';
import { initCarousel } from './modules/carousel.js';

const I18N = {
  pt: {
    meta_title: 'Gustavo Cunha — Full Stack Developer',
    meta_description: 'Gustavo Cunha — Full Stack Developer. Construo sistemas que funcionam, do frontend ao backend.',
    'nav.aria': 'Navegação principal',
    'lang.aria': 'Idioma',
    'nav.hero': 'Hero',
    'nav.about': 'Sobre',
    'nav.skills': 'Habilidades',
    'nav.projects': 'Projetos',
    'nav.contact_btn': 'Contato',
    'hud.scroll': 'Role para explorar',
    'hud.scroll_aria': 'Role para explorar',
    'section.hero': 'Hero',
    'section.about': 'Sobre',
    'section.skills': 'Habilidades',
    'section.projects': 'Projetos',
    'section.contact': 'Contato',
    'hero.tag': '// gc corporation',
    'hero.desc': '<em>Construo sistemas que funcionam</em> — A parte que você vê, a parte que você não vê — faço as duas funcionarem juntas.',
    'hero.cta_projects': 'Ver projetos',
    'hero.cta_contact': 'Entrar em contato',
    'about.tag': '// sobre',
    'about.title': 'Minha jornada',
    'about.desc': 'Sou movido por desafios que importam. Gosto de entender o problema antes de escrever a primeira linha — e de só parar quando a entrega faz sentido de verdade.',
    'about.exp1.role': 'Qualidade e Automação',
    'about.exp1.date': 'Jan 2026 → atual · Salvador, BA',
    'about.exp2.role': 'Sistemas Especialistas',
    'about.exp2.date': 'Jan 2025 – Dez 2025 · Salvador, BA',
    'about.exp3.role': 'Desenvolvimento e Gestão',
    'about.exp3.date': 'Nov 2023 – Jan 2025 · Salvador, BA',
    'about.lang.title': 'Idiomas',
    'about.lang.pt': 'Português — Fluente',
    'about.lang.en': 'Inglês — Avançado',
    'about.lang.es': 'Espanhol — Básico',
    'skills.tag': '// habilidades',
    'skills.title': 'Stack Técnico',
    'skills.cat.languages': 'Linguagens',
    'skills.cat.frontend': 'Frontend',
    'skills.cat.backend': 'Backend',
    'skills.cat.data_cloud': 'Dados & Cloud',
    'skills.cat.tools': 'Ferramentas',
    'skills.cat.interests': 'Interesses',
    'skills.interest.ai_agents': 'IA',
    'projects.tag': '// projetos',
    'projects.title': 'Em Destaque',
    'projects.subtitle': 'Clique no card para ver mais',
    'projects.alpha.aria': 'Projeto Alpha Clean',
    'projects.alpha.sub': 'Sistema de Agendamentos',
    'projects.alpha.desc': 'Sistema de gestão para lava-rápido com agendamentos, painel admin e automações.',
    'projects.stanchi.aria': 'Projeto Stanchi Seguros',
    'projects.stanchi.sub': 'Solução em Seguros',
    'projects.stanchi.desc': 'Site institucional para corretora com cotação personalizada, portabilidade e integração WhatsApp.',
    'projects.jqcc.aria': 'Projeto JQCC Dashboard',
    'projects.jqcc.sub': 'KPIs Executivos',
    'projects.jqcc.desc': 'Plataforma de KPIs para gestão de qualidade com integração ao Jira, gráficos em tempo real e análise de fluxo.',
    'projects.link.site': 'Ver site',
    'projects.link.github': 'GitHub',
    'projects.prev': 'Projeto anterior',
    'projects.next': 'Próximo projeto',
    'projects.alpha.name': 'Alpha Clean',
    'projects.stanchi.name': 'Stanchi Seguros',
    'projects.jqcc.name': 'JQCC Dashboard',
    'contact.tag': '// contato',
    'contact.big': 'Vamos<br /><span>construir</span><br />juntos?',
    'contact.sub': 'Aberto a projetos, freelas e parcerias com foco em execução e resultado.',
    'contact.email': 'Email',
    'contact.github': 'GitHub',
    'contact.linkedin': 'LinkedIn',
    'contact.whatsapp': 'Falar no WhatsApp',
  },
  en: {
    meta_title: 'Gustavo Cunha — Full Stack Developer',
    meta_description: 'Gustavo Cunha — Full Stack Developer. I build systems that work, from frontend to backend.',
    'nav.aria': 'Main navigation',
    'lang.aria': 'Language',
    'nav.hero': 'Hero',
    'nav.about': 'About',
    'nav.skills': 'Skills',
    'nav.projects': 'Projects',
    'nav.contact_btn': 'Contact',
    'hud.scroll': 'Scroll to explore',
    'hud.scroll_aria': 'Scroll to explore',
    'section.hero': 'Hero',
    'section.about': 'About',
    'section.skills': 'Skills',
    'section.projects': 'Projects',
    'section.contact': 'Contact',
    'hero.tag': '// gc corporation',
    'hero.desc': '<em>I build systems that work</em> — The part you see, the part you don\'t — I make both work together.',
    'hero.cta_projects': 'View projects',
    'hero.cta_contact': 'Get in touch',
    'about.tag': '// about',
    'about.title': 'My journey',
    'about.desc': 'Fascinated by problem solving and connecting with people. I blend product, applied research, and engineering with a focus on deliveries that scale.',
    'about.exp1.role': 'Quality & Automation',
    'about.exp1.date': 'Jan 2026 → present · Salvador, BA',
    'about.exp2.role': 'Specialist Systems Intern',
    'about.exp2.date': 'Jan 2025 – Dec 2025 · Salvador, BA',
    'about.exp3.role': 'Development & Management',
    'about.exp3.date': 'Nov 2023 – Jan 2025 · Salvador, BA',
    'about.lang.title': 'Languages',
    'about.lang.pt': 'Portuguese — Fluent',
    'about.lang.en': 'English — Advanced',
    'about.lang.es': 'Spanish — Basic',
    'skills.tag': '// skills',
    'skills.title': 'Tech Stack',
    'skills.cat.languages': 'Languages',
    'skills.cat.frontend': 'Frontend',
    'skills.cat.backend': 'Backend',
    'skills.cat.data_cloud': 'Data & Cloud',
    'skills.cat.tools': 'Tools',
    'skills.cat.interests': 'Interests',
    'skills.interest.ai_agents': 'AI Agents',
    'projects.tag': '// projects',
    'projects.title': 'Featured',
    'projects.subtitle': 'Click a card to see more',
    'projects.alpha.aria': 'Alpha Clean project',
    'projects.alpha.sub': 'Scheduling System',
    'projects.alpha.desc': 'Management system for a car wash with scheduling, admin panel, and automations.',
    'projects.stanchi.aria': 'Stanchi Seguros project',
    'projects.stanchi.sub': 'Insurance Solution',
    'projects.stanchi.desc': 'Institutional website for a brokerage with personalized quotes, portability, and WhatsApp integration.',
    'projects.jqcc.aria': 'JQCC Dashboard project',
    'projects.jqcc.sub': 'Executive KPIs',
    'projects.jqcc.desc': 'KPI platform for quality management with Jira integration, real-time charts, and flow analysis.',
    'projects.link.site': 'View site',
    'projects.link.github': 'GitHub',
    'projects.prev': 'Previous project',
    'projects.next': 'Next project',
    'projects.alpha.name': 'Alpha Clean',
    'projects.stanchi.name': 'Stanchi Seguros',
    'projects.jqcc.name': 'JQCC Dashboard',
    'contact.tag': '// contact',
    'contact.big': 'Let\'s<br /><span>build</span><br />together?',
    'contact.sub': 'Open to projects, freelance work, and partnerships focused on execution and results.',
    'contact.email': 'Email',
    'contact.github': 'GitHub',
    'contact.linkedin': 'LinkedIn',
    'contact.whatsapp': 'Chat on WhatsApp',
  }
};

const ROLE_TEXT = {
  pt: ['Full Stack Developer', 'Engenheiro da Computação', 'IA · Automação · Dados'],
  en: ['Full Stack Developer', 'Computer Engineer', 'AI · Automation · Data']
};

let currentLang = getInitialLang();
let langButtons = [];
let typewriter = null;

function getInitialLang() {
  const saved = localStorage.getItem('lang');
  return I18N[saved] ? saved : 'pt';
}

function t(key) {
  return I18N[currentLang]?.[key] ?? key;
}

function applyI18n() {
  const dict = I18N[currentLang];
  if (!dict) return;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (dict[key] !== undefined) el.textContent = dict[key];
  });

  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.dataset.i18nHtml;
    if (dict[key] !== undefined) el.innerHTML = dict[key];
  });

  document.querySelectorAll('[data-i18n-aria]').forEach(el => {
    const key = el.dataset.i18nAria;
    if (dict[key] !== undefined) el.setAttribute('aria-label', dict[key]);
  });

  if (dict.meta_title) document.title = dict.meta_title;
  const meta = document.querySelector('meta[name="description"]');
  if (meta && dict.meta_description) meta.setAttribute('content', dict.meta_description);

  document.documentElement.setAttribute('lang', currentLang === 'pt' ? 'pt-BR' : 'en');
}

function setLanguage(lang) {
  if (!I18N[lang]) return;
  currentLang = lang;
  localStorage.setItem('lang', lang);
  applyI18n();
  langButtons.forEach(btn => btn.classList.toggle('is-active', btn.dataset.lang === lang));
  typewriter?.setPhrases(ROLE_TEXT[lang]);
}

function initLanguageSwitch() {
  langButtons = Array.from(document.querySelectorAll('.lang-btn'));
  langButtons.forEach(btn => btn.addEventListener('click', () => setLanguage(btn.dataset.lang)));
  setLanguage(currentLang);
}

function createTypewriter(el) {
  if (!el) return { setPhrases() {} };

  let phrases = [];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let timer = null;

  const typeSpeed = 70;
  const deleteSpeed = 40;
  const pauseMs = 1400;

  function tick() {
    if (!phrases.length) return;

    const current = phrases[phraseIndex % phrases.length];
    const nextText = isDeleting
      ? current.slice(0, Math.max(0, charIndex - 1))
      : current.slice(0, Math.min(current.length, charIndex + 1));

    el.textContent = nextText;

    if (!isDeleting && nextText.length === current.length) {
      isDeleting = true;
      timer = setTimeout(tick, pauseMs);
      return;
    }
    if (isDeleting && nextText.length === 0) {
      isDeleting = false;
      phraseIndex += 1;
      timer = setTimeout(tick, 250);
      return;
    }

    charIndex = nextText.length;
    timer = setTimeout(tick, isDeleting ? deleteSpeed : typeSpeed);
  }

  function setPhrases(next) {
    phrases = Array.isArray(next) ? next : [];
    phraseIndex = 0;
    charIndex = 0;
    isDeleting = false;
    clearTimeout(timer);
    tick();
  }

  return { setPhrases };
}

function init() {
  const canvas   = document.getElementById('c');
  const renderer = createRenderer(canvas);
  const scene    = initScene();
  const camera   = initCamera();
  const scroll   = initScroll(camera, t);

  initCursor();
  initCarousel();
  typewriter = createTypewriter(document.getElementById('role-typed'));
  initLanguageSwitch();

  // Expõe goTo para onclick no HTML
  window.nav = { goTo: scroll.goTo };

  // Show hero immediately
  const heroPanel = document.getElementById('p-hero');
  if (heroPanel) heroPanel.classList.add('visible');

  let time = 0;
  function animate() {
    requestAnimationFrame(animate);
    time += 0.016;
    scroll.update(time);
    scene.userData.tick?.(time);
    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

function createRenderer(canvas) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x030810);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;
  return renderer;
}

init();

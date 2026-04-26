import { gsap } from 'gsap';

// ── Text utilities ───────────────────────────────────────────────────────

function splitChars(el) {
  const spans = [];
  [...el.childNodes].forEach(node => {
    if (node.nodeType === 3 && node.textContent.trim()) {
      const chars = [...node.textContent];
      const frag = document.createDocumentFragment();
      chars.forEach(c => {
        const s = document.createElement('span');
        s.className = 'char';
        s.style.cssText = 'display:inline-block;';
        s.textContent = c;
        frag.appendChild(s);
        spans.push(s);
      });
      el.replaceChild(frag, node);
    } else if (node.nodeType === 1 && node.tagName !== 'BR') {
      spans.push(...splitChars(node));
    }
  });
  return spans;
}

function scrambleIn(el, finalText, duration = 850) {
  const pool = '#@!%&?ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmno0123456789';
  const start = performance.now();
  el.style.opacity = '1';

  (function step() {
    const t = Math.min((performance.now() - start) / duration, 1);
    const revealed = Math.floor(t * finalText.length);
    el.textContent = [...finalText].map((c, i) => {
      if (i < revealed) return c;
      if (c === ' ' || c === '/' || c === '.') return c;
      return pool[Math.floor(Math.random() * pool.length)];
    }).join('');
    if (t < 1) requestAnimationFrame(step);
    else el.textContent = finalText;
  })();
}

// ── Interaction effects ──────────────────────────────────────────────────

function addMagnet(el, strength = 0.28) {
  if (!el || window.matchMedia('(hover: none)').matches) return;
  el.addEventListener('mousemove', e => {
    const r = el.getBoundingClientRect();
    gsap.to(el, { x: (e.clientX - r.left - r.width / 2) * strength, y: (e.clientY - r.top - r.height / 2) * strength, duration: 0.35, ease: 'power2.out' });
  });
  el.addEventListener('mouseleave', () => gsap.to(el, { x: 0, y: 0, duration: 0.75, ease: 'elastic.out(1, 0.5)' }));
}

function addTilt(el, intensity = 9) {
  if (!el || window.matchMedia('(hover: none)').matches) return;
  el.style.transformStyle = 'preserve-3d';
  el.addEventListener('mousemove', e => {
    const r = el.getBoundingClientRect();
    gsap.to(el, {
      rotateX: ((e.clientY - r.top - r.height / 2) / r.height) * -intensity,
      rotateY: ((e.clientX - r.left - r.width / 2) / r.width) * intensity,
      duration: 0.3, ease: 'power2.out', transformPerspective: 900
    });
  });
  el.addEventListener('mouseleave', () => gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.75, ease: 'elastic.out(1, 0.7)' }));
}

function addGlitch(el) {
  if (!el || window.matchMedia('(hover: none)').matches) return;
  el.addEventListener('mouseenter', () => {
    gsap.timeline()
      .to(el, { skewX: 5,  x: 4,  duration: 0.05, ease: 'power1.inOut' })
      .to(el, { skewX: -3, x: -3, duration: 0.04 })
      .to(el, { skewX: 2,  x: 2,  duration: 0.04 })
      .to(el, { skewX: 0,  x: 0,  duration: 0.06, ease: 'power1.out' });
  });
}

function initHeroParallax() {
  if (window.matchMedia('(hover: none)').matches) return;
  const inner = document.querySelector('.hero-inner');
  if (!inner) return;
  const qx = gsap.quickTo(inner, 'x', { duration: 1.8, ease: 'power1.out' });
  const qy = gsap.quickTo(inner, 'y', { duration: 1.8, ease: 'power1.out' });
  document.addEventListener('mousemove', e => {
    const dx = e.clientX / window.innerWidth - 0.5;
    const dy = e.clientY / window.innerHeight - 0.5;
    qx(dx * -18);
    qy(dy * -9);
  });
}

// ── Hero entrance ────────────────────────────────────────────────────────

function animateHeroIn() {
  const nameEl = document.querySelector('.hero-name');
  const allChars = nameEl ? splitChars(nameEl) : [];

  const tagEl   = document.querySelector('.hero-tag');
  const statusEl = document.querySelector('.hero-status');

  gsap.set(['.nav-logo', '.nav-links li', '.nav-btn', '.hero-role', '.hero-desc', '.hero-btns > *', statusEl].filter(Boolean), { opacity: 0, y: 24 });
  gsap.set([tagEl].filter(Boolean), { opacity: 0 });
  gsap.set('#c', { opacity: 0, scale: 1.06, transformOrigin: '50% 50%' });
  if (allChars.length) gsap.set(allChars, { opacity: 0, y: 52, rotateX: -90, transformPerspective: 600 });

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.to('#c',             { opacity: 1, scale: 1, duration: 1.5, ease: 'expo.out' },                          0)
    .to('.nav-logo',       { opacity: 1, y: 0, duration: 0.5 },                                               0.45)
    .to('.nav-links li',   { opacity: 1, y: 0, duration: 0.4, stagger: 0.07 },                               0.5)
    .to('.nav-btn',        { opacity: 1, y: 0, duration: 0.4 },                                               0.62)
    .add(() => { if (tagEl) scrambleIn(tagEl, '// gc corporation', 900); },                                   0.55)
    .to(allChars,          { opacity: 1, y: 0, rotateX: 0, duration: 0.7, stagger: 0.038, ease: 'back.out(1.5)' }, 0.72)
    .to(statusEl,          { opacity: 1, y: 0, duration: 0.45 },                                              1.2)
    .to('.hero-role',      { opacity: 1, y: 0, duration: 0.5 },                                               1.3)
    .to('.hero-desc',      { opacity: 1, y: 0, duration: 0.65 },                                              1.42)
    .to('.hero-btns > *',  { opacity: 1, y: 0, duration: 0.5, stagger: 0.12, ease: 'back.out(1.4)' },        1.55);

  // Perpetual floating wave on name chars
  if (allChars.length) {
    gsap.to(allChars, {
      y: -5, duration: 2.8, repeat: -1, yoyo: true,
      ease: 'sine.inOut', delay: 2.2,
      stagger: { each: 0.09, from: 'center' }
    });
  }

  // Accent words glow pulse
  gsap.to('.hero-name span, .contact-big span', {
    textShadow: '0 0 22px rgba(0,207,255,0.6)',
    duration: 2.5, repeat: -1, yoyo: true, ease: 'sine.inOut'
  });

  // Interactions
  document.querySelectorAll('.btn-primary, .btn-secondary, .nav-btn').forEach(el => addMagnet(el, 0.3));
  document.querySelectorAll('.sk-card').forEach(el => addTilt(el, 8));
  document.querySelectorAll('.orb-card-inner').forEach(el => addTilt(el, 5));
  addGlitch(document.querySelector('.hero-name'));
  addGlitch(document.querySelector('.nav-logo img'));

  initHeroParallax();
}

// ── Section animators ────────────────────────────────────────────────────

function animateAbout(panel) {
  const card = panel.querySelector('.panel-card');
  if (!card) return;

  gsap.fromTo(card,
    { clipPath: 'inset(0 100% 0 0 round 18px)', x: 20 },
    { clipPath: 'inset(0 0% 0 0 round 18px)', x: 0, duration: 0.9, ease: 'expo.out', overwrite: 'auto' }
  );

  const items = panel.querySelectorAll('.exp-item');
  gsap.fromTo(items,
    { opacity: 0, x: 20 },
    { opacity: 1, x: 0, duration: 0.5, stagger: 0.13, ease: 'power3.out', delay: 0.3, overwrite: 'auto' }
  );
}

function animateSkills(panel) {
  const card = panel.querySelector('.panel-card');
  if (!card) return;

  gsap.fromTo(card,
    { clipPath: 'inset(0 0 0 100% round 18px)', x: -20 },
    { clipPath: 'inset(0 0 0 0% round 18px)', x: 0, duration: 0.9, ease: 'expo.out', overwrite: 'auto' }
  );

  const cards = panel.querySelectorAll('.sk-card');

  // Add charge indicator dynamically
  cards.forEach(c => {
    if (!c.querySelector('.sk-charge')) {
      const charge = document.createElement('span');
      charge.className = 'sk-charge';
      c.appendChild(charge);
    }
  });

  gsap.fromTo(cards,
    { opacity: 0, scale: 0.8, y: 18 },
    { opacity: 1, scale: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'back.out(1.6)', delay: 0.18, overwrite: 'auto' }
  );

  gsap.fromTo(panel.querySelectorAll('.sk-charge'),
    { scaleY: 0 },
    { scaleY: 1, duration: 0.9, stagger: 0.1, ease: 'power2.out', delay: 0.55, transformOrigin: 'top', overwrite: 'auto' }
  );
}

function animateProjects(panel) {
  const header = panel.querySelector('.proj-header');
  const carousel = panel.querySelector('.orbital-carousel');

  if (header) {
    gsap.fromTo(header,
      { opacity: 0, y: 30, clipPath: 'inset(100% 0 0 0)' },
      { opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)', duration: 0.7, ease: 'expo.out', overwrite: 'auto' }
    );
  }
  if (carousel) {
    gsap.fromTo(carousel,
      { opacity: 0, y: 36, scale: 0.94 },
      { opacity: 1, y: 0, scale: 1, duration: 0.88, ease: 'expo.out', delay: 0.12, overwrite: 'auto' }
    );
  }
}

function animateContact(panel) {
  const card = panel.querySelector('.panel-card');
  if (!card) return;

  gsap.fromTo(card,
    { clipPath: 'inset(45% 50% 45% 50% round 18px)', scale: 0.95 },
    { clipPath: 'inset(0% 0% 0% 0% round 18px)', scale: 1, duration: 1.1, ease: 'expo.out', overwrite: 'auto' }
  );

  const big = panel.querySelector('.contact-big');
  if (big && !big.dataset.split) {
    big.dataset.split = '1';
    const chars = splitChars(big);
    gsap.fromTo(chars,
      { opacity: 0, y: 35, rotateX: -70, transformPerspective: 600 },
      { opacity: 1, y: 0, rotateX: 0, duration: 0.65, stagger: 0.03, ease: 'back.out(1.4)', delay: 0.35, overwrite: 'auto' }
    );
  }

  const btns = panel.querySelectorAll('.cb');
  gsap.fromTo(btns,
    { opacity: 0, y: 18, scale: 0.88 },
    { opacity: 1, y: 0, scale: 1, duration: 0.48, stagger: 0.09, ease: 'back.out(1.5)', delay: 0.7, overwrite: 'auto' }
  );
  btns.forEach(b => addMagnet(b, 0.22));
}

const sectionAnimators = {
  'p-about':    animateAbout,
  'p-skills':   animateSkills,
  'p-projects': animateProjects,
  'p-contact':  animateContact
};

// ── Init ─────────────────────────────────────────────────────────────────

export function initMotion() {
  animateHeroIn();

  gsap.to('#hud-section', { x: 5, duration: 2.4, repeat: -1, yoyo: true, ease: 'sine.inOut' });

  gsap.to('.nav-btn', {
    boxShadow: '0 0 0 rgba(0,0,0,0), 0 0 32px rgba(0,207,255,0.26)',
    duration: 2.2, repeat: -1, yoyo: true, ease: 'sine.inOut'
  });

  gsap.to('.blink', { opacity: 0.08, duration: 0.65, repeat: -1, yoyo: true, ease: 'power1.inOut' });

  return {
    onSectionChange(section) {
      const animator = sectionAnimators[section.panel];
      const panel = document.getElementById(section.panel);
      if (animator && panel) animator(panel);
    }
  };
}

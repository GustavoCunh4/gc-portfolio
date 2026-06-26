// motion.js — Immersive motion layer

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isTouch = window.matchMedia('(hover: none)').matches;
const lerp = (a, b, t) => a + (b - a) * t;
const clamp = (v, lo, hi) => Math.min(Math.max(v, lo), hi);
const SPRING = 'cubic-bezier(0.16,1,0.3,1)';

// ── 1. Hero h1 — per-letter entrance ─────────────────────────────────────
function initHeroLetters() {
  const h1 = document.querySelector('.hero-copy h1');
  if (!h1) return;

  // Cancel the block-level h1 CSS animation — letters animate individually
  h1.classList.add('chars-ready');

  const BASE_DELAY = 0.14;
  const STEP = 0.034;
  let delay = BASE_DELAY;

  function buildSpans(text) {
    return [...text].map(c => {
      if (c === ' ') { delay += STEP * 0.4; return ' '; }
      const span = `<span class="hero-char" style="animation-delay:${delay.toFixed(3)}s">${c}</span>`;
      delay += STEP;
      return span;
    }).join('');
  }

  // Structure: "Gustavo <span>Cunha</span>"
  const first  = buildSpans('Gustavo ');
  const second = buildSpans('Cunha');
  h1.innerHTML = first + `<span>${second}</span>`;
}

// ── 2. Smooth scroll — lerp-based inertia ────────────────────────────────
function initSmoothScroll() {
  if (isTouch) return;

  // Disable native smooth-scroll so our lerp handles everything
  document.documentElement.style.scrollBehavior = 'auto';

  let current = window.scrollY;
  let target  = window.scrollY;
  let rafId   = null;

  const maxY = () => document.documentElement.scrollHeight - window.innerHeight;

  function tick() {
    const diff = target - current;
    if (Math.abs(diff) < 0.3) {
      current = target;
      window.scrollTo(0, current);
      rafId = null;
      return;
    }
    current = lerp(current, target, 0.1);
    window.scrollTo(0, Math.round(current));
    rafId = requestAnimationFrame(tick);
  }

  function go(delta) {
    target = clamp(target + delta, 0, maxY());
    if (!rafId) rafId = requestAnimationFrame(tick);
  }

  function scrollTo(y) {
    target = clamp(y, 0, maxY());
    if (!rafId) rafId = requestAnimationFrame(tick);
  }

  // Wheel — override native scroll
  window.addEventListener('wheel', e => {
    e.preventDefault();
    // Normalize delta across devices (trackpad sends small deltas, mouse wheel large)
    const delta = e.deltaMode === 1 ? e.deltaY * 32 : e.deltaY;
    go(delta * 0.92);
  }, { passive: false });

  // Keyboard
  window.addEventListener('keydown', e => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    const h = window.innerHeight;
    const map = {
      ArrowDown: 110, ArrowUp: -110,
      PageDown:  h * 0.88, PageUp: -h * 0.88,
      ' ':       h * 0.88,
    };
    if (e.key === 'Home') { scrollTo(0); e.preventDefault(); return; }
    if (e.key === 'End')  { scrollTo(maxY()); e.preventDefault(); return; }
    let d = map[e.key];
    if (d === undefined) return;
    if (e.key === ' ' && e.shiftKey) d = -d;
    e.preventDefault();
    go(d);
  });

  // Anchor links — smooth-scroll to target
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute('href').slice(1);
    if (!id) { scrollTo(0); e.preventDefault(); return; }
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    scrollTo(el.getBoundingClientRect().top + current - 72);
  });
}

// ── 3. Scroll progress bar ────────────────────────────────────────────────
function initScrollProgress() {
  const bar = document.createElement('div');
  bar.id = 'scroll-progress';
  document.body.prepend(bar);

  window.addEventListener('scroll', () => {
    const p = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    bar.style.transform = `scaleX(${clamp(p, 0, 1)})`;
  }, { passive: true });
}

// ── 4. Ambient cursor glow ────────────────────────────────────────────────
function initAmbientGlow() {
  if (isTouch) return;

  const glow = document.createElement('div');
  glow.id = 'ambient-glow';
  document.body.prepend(glow);

  let mx = window.innerWidth * 0.5;
  let my = window.innerHeight * 0.3;
  let cx = mx, cy = my;

  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  (function tick() {
    cx = lerp(cx, mx, 0.03);
    cy = lerp(cy, my, 0.03);
    glow.style.transform = `translate(${cx - 350}px,${cy - 350}px)`;
    requestAnimationFrame(tick);
  })();
}

// ── 5. Scroll reveals — spring easing, per-element tuning ────────────────
function initReveal() {
  const OBS = { rootMargin: '0px 0px -4% 0px', threshold: 0.06 };

  const SINGLES = [
    '.section-heading .eyebrow',
    '.section-heading h2',
    '.section-heading > p',
    '.section-heading--split > div:first-child',
    '.section-heading--split > p:last-child',
    '.section-heading--split .text-link',
    '.section-grid--about > div',
    '.about-copy p',
    '.about-copy .text-link',
    '.contact-card',
  ].join(', ');

  document.querySelectorAll(SINGLES).forEach(el => {
    if (el.closest('.hero')) return;
    const isH = el.tagName === 'H2';
    const dist = isH ? '44px' : '26px';
    const dur  = isH ? '1s'   : '0.8s';
    el.style.cssText += `opacity:0;transform:translateY(${dist});transition:opacity ${dur} ${SPRING},transform ${dur} ${SPRING};`;

    new IntersectionObserver(([e], obs) => {
      if (!e.isIntersecting) return;
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
      obs.disconnect();
    }, OBS).observe(el);
  });

  // Staggered groups
  const GROUPS = [
    { wrap: '.timeline',      items: '.timeline-item', gap: 0.13 },
    { wrap: '.stack-grid',    items: '.stack-card',    gap: 0.07 },
    { wrap: '.featured-grid', items: '.project-card',  gap: 0.10 },
    { wrap: '.more-grid',     items: '.more-card',     gap: 0.07 },
  ];

  GROUPS.forEach(({ wrap, items, gap }) => {
    document.querySelectorAll(wrap).forEach(wrapper => {
      const children = Array.from(wrapper.querySelectorAll(items));
      children.forEach((el, i) => {
        el.style.cssText += `opacity:0;transform:translateY(26px);`
          + `transition:opacity 0.75s ${SPRING} ${(i * gap).toFixed(2)}s,`
          + `transform 0.75s ${SPRING} ${(i * gap).toFixed(2)}s;`;
      });

      new IntersectionObserver(([e], obs) => {
        if (!e.isIntersecting) return;
        children.forEach(el => { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; });
        obs.disconnect();
      }, { ...OBS, threshold: 0.02 }).observe(wrapper);
    });
  });
}

// ── 6. 3D Card tilt — lerp rotation ──────────────────────────────────────
function initTilt() {
  if (isTouch) return;

  const MAX_DEG = 8;
  const SEL = '.stack-card, .project-card, .more-card, .timeline-card';

  document.querySelectorAll(SEL).forEach(card => {
    let rotX = 0, rotY = 0, tX = 0, tY = 0;
    let inside = false;
    let rafId = null;

    function tick() {
      rotX = lerp(rotX, tX, 0.1);
      rotY = lerp(rotY, tY, 0.1);
      const tz = inside ? 8 : 0;
      card.style.transform =
        `perspective(800px) rotateX(${rotY}deg) rotateY(${rotX}deg) translateZ(${tz}px)`;

      if (!inside && Math.abs(rotX) < 0.04 && Math.abs(rotY) < 0.04) {
        cancelAnimationFrame(rafId);
        rafId = null;
        card.style.transform = '';
        return;
      }
      rafId = requestAnimationFrame(tick);
    }

    card.addEventListener('mouseenter', () => {
      inside = true;
      if (!rafId) rafId = requestAnimationFrame(tick);
    });

    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width  - 0.5;
      const y = (e.clientY - r.top)  / r.height - 0.5;
      tX =  x * MAX_DEG * 2;
      tY = -y * MAX_DEG * 2;
    });

    card.addEventListener('mouseleave', () => {
      inside = false;
      tX = 0; tY = 0;
      if (!rafId) rafId = requestAnimationFrame(tick);
    });
  });
}

// ── 7. Counter animation — hero proof ────────────────────────────────────
function initCounters() {
  document.querySelectorAll('.hero-proof strong').forEach(el => {
    const orig = el.textContent.trim();
    const num  = parseFloat(orig);
    if (isNaN(num)) return;

    const plus = orig.includes('+');
    const pad  = orig.startsWith('0') && orig.length > 1;
    let done = false;

    new IntersectionObserver(([e], obs) => {
      if (!e.isIntersecting || done) return;
      done = true; obs.disconnect();

      const t0  = performance.now();
      const dur = 1500;

      (function step() {
        const p     = Math.min((performance.now() - t0) / dur, 1);
        const eased = 1 - (1 - p) ** 3; // ease-out-cubic
        const val   = Math.round(eased * num);
        el.textContent = (pad && val < 10 ? '0' : '') + val + (plus ? '+' : '');
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = orig;
      })();
    }, { threshold: 0.8 }).observe(el.closest('li') || el);
  });
}

// ── 8. Hero visual — mouse parallax ──────────────────────────────────────
function initHeroParallax() {
  if (isTouch) return;
  const visual = document.querySelector('.hero-visual');
  if (!visual) return;

  let tx = 0, ty = 0, cx = 0, cy = 0;

  document.addEventListener('mousemove', e => {
    tx = (e.clientX / window.innerWidth  - 0.5) * -30;
    ty = (e.clientY / window.innerHeight - 0.5) * -18;
  });

  (function tick() {
    cx = lerp(cx, tx, 0.06);
    cy = lerp(cy, ty, 0.06);
    visual.style.transform = `translate(${cx}px,${cy}px)`;
    requestAnimationFrame(tick);
  })();
}

// ── 9. Project images — scroll parallax ──────────────────────────────────
function initImageParallax() {
  if (isTouch) return;

  const cards = Array.from(document.querySelectorAll('.project-card'));
  if (!cards.length) return;

  const state = cards.map(card => ({
    card,
    img: card.querySelector('.project-media img'),
    offset: 0,
    hovered: false,
  }));

  state.forEach(s => {
    if (!s.img) return;
    // We own the transform — remove CSS version
    s.img.style.willChange = 'transform';

    s.card.addEventListener('mouseenter', () => {
      s.hovered = true;
      s.img.style.transition = `transform 0.55s ${SPRING}`;
      s.img.style.transform = `translateY(${s.offset}px) scale(1.07)`;
    });
    s.card.addEventListener('mouseleave', () => {
      s.hovered = false;
      s.img.style.transition = `transform 0.55s ${SPRING}`;
      s.img.style.transform = `translateY(${s.offset}px) scale(1.02)`;
      setTimeout(() => { s.img.style.transition = 'none'; }, 580);
    });
  });

  function update() {
    state.forEach(s => {
      if (!s.img) return;
      const r = s.card.getBoundingClientRect();
      s.offset = (r.top + r.height / 2 - window.innerHeight / 2) * 0.065;
      if (!s.hovered) {
        s.img.style.transition = 'none';
        s.img.style.transform = `translateY(${s.offset}px) scale(1.02)`;
      }
    });
  }

  window.addEventListener('scroll', update, { passive: true });
  update();
}

// ── 10. Card glow — cursor-tracking radial gradient ───────────────────────
function initCardGlow() {
  if (isTouch) return;
  document.querySelectorAll('.stack-card, .project-card, .more-card, .timeline-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--gx', `${((e.clientX - r.left) / r.width) * 100}%`);
      card.style.setProperty('--gy', `${((e.clientY - r.top)  / r.height) * 100}%`);
    });
  });
}

// ── 11. Magnetic buttons — lerp pull ─────────────────────────────────────
function initMagnets() {
  if (isTouch) return;

  document.querySelectorAll('.button--primary, .hero-actions .button--secondary').forEach(btn => {
    let tX = 0, tY = 0, cX = 0, cY = 0;
    let inside = false;
    let rafId = null;

    function tick() {
      cX = lerp(cX, tX, 0.14);
      cY = lerp(cY, tY, 0.14);
      btn.style.transform = `translate(${cX}px,${cY - 2}px)`;

      if (!inside && Math.abs(cX) < 0.05 && Math.abs(cY) < 0.05) {
        cancelAnimationFrame(rafId);
        rafId = null;
        btn.style.transform = '';
        return;
      }
      rafId = requestAnimationFrame(tick);
    }

    btn.addEventListener('mouseenter', () => {
      inside = true;
      if (!rafId) rafId = requestAnimationFrame(tick);
    });

    btn.addEventListener('mousemove', e => {
      const r = btn.getBoundingClientRect();
      tX = (e.clientX - r.left - r.width  / 2) * 0.32;
      tY = (e.clientY - r.top  - r.height / 2) * 0.32;
    });

    btn.addEventListener('mouseleave', () => {
      inside = false;
      tX = 0; tY = 0;
      if (!rafId) rafId = requestAnimationFrame(tick);
    });
  });
}

// ── 12. Eyebrow scramble — on first reveal ───────────────────────────────
function initEyebrowScramble() {
  const CHARS = '!@#$%&ABCDEFabcdef0123456789';

  function scramble(el) {
    const final = el.textContent.trim();
    const t0 = performance.now();
    const dur = 640;

    (function step() {
      const t = Math.min((performance.now() - t0) / dur, 1);
      const revealed = Math.floor(t * final.length);
      el.textContent = [...final].map((c, i) => {
        if (i < revealed || c === ' ' || c === '/' || c === '.') return c;
        return CHARS[Math.floor(Math.random() * CHARS.length)];
      }).join('');
      if (t < 1) requestAnimationFrame(step);
      else el.textContent = final;
    })();
  }

  document.querySelectorAll('.section .eyebrow').forEach(el => {
    if (el.closest('.hero')) return;
    let done = false;
    new IntersectionObserver(([e], obs) => {
      if (!e.isIntersecting || done) return;
      done = true; obs.disconnect();
      scramble(el);
    }, { threshold: 0.5 }).observe(el);
  });
}

// ── Init ─────────────────────────────────────────────────────────────────
export function initMotion() {
  if (reduceMotion) return;

  initHeroLetters();   // First — modifies DOM before other observers
  initSmoothScroll();
  initScrollProgress();
  initAmbientGlow();
  initReveal();
  initTilt();
  initCounters();
  initHeroParallax();
  initImageParallax();
  initCardGlow();
  initMagnets();
  initEyebrowScramble();
}

/**
 * scroll.js — Câmera animada por scroll (5 seções)
 */

const SECTIONS = [
  { labelKey: 'section.hero',    panel: 'p-hero',     pos: [0, 3, 22],   target: [0, 0, 0]  },
  { labelKey: 'section.about',   panel: 'p-about',    pos: [8, 2, 8],    target: [0, 0, -1] },
  { labelKey: 'section.skills',  panel: 'p-skills',   pos: [-7, 0, 10],  target: [0, 1, 0]  },
  { labelKey: 'section.projects',panel: 'p-projects', pos: [0, 6, -4],   target: [0, 0, 0]  },
  { labelKey: 'section.contact', panel: 'p-contact',  pos: [0, 12, 4],   target: [0, 0, 0]  },
];

const lerp    = (a, b, t) => a + (b - a) * t;
const lerpV3  = (a, b, t) => a.map((v, i) => lerp(v, b[i], t));
const easeIO  = t => t < .5 ? 2*t*t : -1+(4-2*t)*t;

export function initScroll(camera, getLabel) {
  let progress = 0, target = 0, mx = 0, my = 0;
  const isTouch = window.matchMedia('(hover: none)').matches;
  const translate = typeof getLabel === 'function' ? getLabel : (key) => key;

  if (!isTouch) {
    document.addEventListener('mousemove', e => {
      mx = (e.clientX / window.innerWidth  - .5);
      my = (e.clientY / window.innerHeight - .5);
    });
  }

  window.addEventListener('scroll', () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    target = max > 0 ? window.scrollY / max : 0;
    const hint = document.getElementById('hud-scroll');
    if (hint) hint.style.opacity = window.scrollY > 60 ? '0' : '1';
  }, { passive: true });

  function update() {
    progress += (target - progress) * .055;
    const total = SECTIONS.length - 1;
    const raw   = progress * total;
    const idxA  = Math.min(Math.floor(raw), total - 1);
    const idxB  = Math.min(idxA + 1, total);
    const blend = easeIO(raw - idxA);

    const pos = lerpV3(SECTIONS[idxA].pos,    SECTIONS[idxB].pos,    blend);
    const tgt = lerpV3(SECTIONS[idxA].target, SECTIONS[idxB].target, blend);

    camera.position.set(...pos);
    camera.lookAt(...tgt);

    if (!isTouch) {
      camera.position.x += mx * .25;
      camera.position.y -= my * .18;
    }

    const activeIdx = Math.round(progress * total);
    SECTIONS.forEach((s, i) => {
      const el = document.getElementById(s.panel);
      if (el) el.classList.toggle('visible', i === activeIdx);
    });

    document.querySelectorAll('.prog-dot').forEach((d, i) => d.classList.toggle('active', i === activeIdx));
    const lbl = document.getElementById('hud-section');
    if (lbl) lbl.textContent = translate(SECTIONS[activeIdx]?.labelKey) ?? '';
  }

  function goTo(idx) {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const top = max > 0 ? (idx / (SECTIONS.length - 1)) * max : 0;
    window.scrollTo({ top, behavior: 'smooth' });
  }

  return { update, goTo };
}

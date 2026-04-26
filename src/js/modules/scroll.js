/**
 * scroll.js — câmera animada por scroll (5 seções)
 */

const SECTIONS = [
  { label: 'Hero', panel: 'p-hero', pos: [0, 3, 22], target: [0, 0, 0] },
  { label: 'Sobre', panel: 'p-about', pos: [8, 2, 8], target: [0, 0, -1] },
  { label: 'Skills', panel: 'p-skills', pos: [-7, 0, 10], target: [0, 1, 0] },
  { label: 'Projetos', panel: 'p-projects', pos: [0, 6, -4], target: [0, 0, 0] },
  { label: 'Contato', panel: 'p-contact', pos: [0, 12, 4], target: [0, 0, 0] }
];

const lerp = (a, b, t) => a + (b - a) * t;
const lerpV3 = (a, b, t) => a.map((v, i) => lerp(v, b[i], t));
const easeIO = t => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

export function initScroll(camera, options = {}) {
  let progress = 0;
  let mx = 0;
  let my = 0;
  let activeIdx = 0;

  const isTouch = window.matchMedia('(hover: none)').matches;
  const onSectionChange = options.onSectionChange ?? (() => {});
  const scrollToSection = options.scrollToSection ?? null;

  if (!isTouch) {
    document.addEventListener('mousemove', event => {
      mx = event.clientX / window.innerWidth - 0.5;
      my = event.clientY / window.innerHeight - 0.5;
    });
  }

  function update(time = 0) {
    const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const target = window.scrollY / max;

    progress += (target - progress) * 0.055;

    const total = SECTIONS.length - 1;
    const raw = progress * total;
    const idxA = Math.min(Math.floor(raw), total - 1);
    const idxB = Math.min(idxA + 1, total);
    const t = easeIO(raw - idxA);

    const pos = lerpV3(SECTIONS[idxA].pos, SECTIONS[idxB].pos, t);
    const tgt = lerpV3(SECTIONS[idxA].target, SECTIONS[idxB].target, t);

    camera.position.set(...pos);
    camera.lookAt(...tgt);

    if (!isTouch) {
      camera.position.x += mx * 0.25;
      camera.position.y -= my * 0.18;
    }

    // Subtle camera breathe
    camera.position.y += Math.sin(time * 0.65) * 0.055;

    const nextIdx = Math.round(progress * total);
    SECTIONS.forEach((section, index) => {
      const element = document.getElementById(section.panel);
      if (element) element.classList.toggle('visible', index === nextIdx);
    });

    const label = document.getElementById('hud-section');
    if (label) label.textContent = SECTIONS[nextIdx]?.label ?? '';

    if (nextIdx !== activeIdx) {
      activeIdx = nextIdx;
      onSectionChange(SECTIONS[activeIdx], activeIdx);
    }
  }

  function goTo(idx) {
    const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const destination = (idx / (SECTIONS.length - 1)) * max;

    if (scrollToSection) {
      scrollToSection(destination);
      return;
    }

    window.scrollTo({ top: destination, behavior: 'smooth' });
  }

  return { update, goTo, sections: SECTIONS };
}

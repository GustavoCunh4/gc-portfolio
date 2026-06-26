const REDUCE = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let targets = [];
let scrollBound = null;

function splitChars(el) {
  const existing = el.querySelectorAll('.tw-char');
  if (existing.length) {
    existing.forEach(c => c.classList.remove('tw-on'));
    el._twChars = Array.from(existing);
    el._twCount = 0;
    return;
  }

  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  const nodes = [];
  let n;
  while ((n = walker.nextNode())) nodes.push(n);

  nodes.forEach(textNode => {
    const frag = document.createDocumentFragment();
    for (const ch of textNode.textContent) {
      if (/\s/.test(ch)) {
        frag.appendChild(document.createTextNode(ch));
      } else {
        const s = document.createElement('span');
        s.className = 'tw-char';
        s.textContent = ch;
        frag.appendChild(s);
      }
    }
    textNode.parentNode.replaceChild(frag, textNode);
  });

  el._twChars = Array.from(el.querySelectorAll('.tw-char'));
  el._twCount = 0;
}

function update() {
  const vH = window.innerHeight;
  // start typing when element enters bottom of viewport
  // finish typing when element top reaches 55% — card still fully in view
  const startY = vH * 0.98;
  const endY   = vH * 0.55;
  const range  = startY - endY;

  targets.forEach(el => {
    const chars = el._twChars;
    if (!chars || !chars.length) return;

    const top = el.getBoundingClientRect().top;
    const progress  = Math.max(0, Math.min(1, (startY - top) / range));
    const newCount  = Math.round(progress * chars.length);
    const oldCount  = el._twCount;

    if (newCount === oldCount) return;

    if (newCount > oldCount) {
      for (let i = oldCount; i < newCount; i++) chars[i].classList.add('tw-on');
    } else {
      for (let i = newCount; i < oldCount; i++) chars[i].classList.remove('tw-on');
    }

    el._twCount = newCount;
  });
}

export function initTypewriter() {
  if (REDUCE) return;

  if (scrollBound) window.removeEventListener('scroll', scrollBound);

  targets = Array.from(document.querySelectorAll('[data-typewriter]'));
  if (!targets.length) return;

  targets.forEach(splitChars);

  scrollBound = update;
  window.addEventListener('scroll', scrollBound, { passive: true });
  update();
}

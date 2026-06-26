const REDUCE = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function splitChars(el) {
  if (el.querySelector('.tw-char')) return; // already split
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
}

function typeIn(el) {
  const chars = el.querySelectorAll('.tw-char');
  const total = chars.length;
  if (!total) return;
  const speed = total > 80 ? 9 : total > 30 ? 22 : 38;
  clearInterval(el._tw);
  let i = 0;
  el._tw = setInterval(() => {
    if (i < total) { chars[i].classList.add('tw-on'); i++; }
    else clearInterval(el._tw);
  }, speed);
}

function typeOut(el) {
  const chars = el.querySelectorAll('.tw-char');
  const total = chars.length;
  if (!total) return;
  const speed = total > 80 ? 5 : 12;
  clearInterval(el._tw);
  let i = total - 1;
  el._tw = setInterval(() => {
    if (i >= 0) { chars[i].classList.remove('tw-on'); i--; }
    else clearInterval(el._tw);
  }, speed);
}

let twObs = null;

export function initTypewriter() {
  if (REDUCE) return;

  twObs?.disconnect();

  const targets = document.querySelectorAll('[data-typewriter]');
  if (!targets.length) return;

  targets.forEach(el => {
    // Reset: remove old spans if any (after re-render)
    const old = el.querySelectorAll('.tw-char');
    if (old.length) old.forEach(s => s.classList.remove('tw-on'));
    splitChars(el);
  });

  twObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const el = entry.target;
      const above = entry.boundingClientRect.top < 0;
      if (entry.isIntersecting) {
        typeIn(el);
      } else if (above) {
        typeOut(el);
      } else {
        clearInterval(el._tw);
        el.querySelectorAll('.tw-char').forEach(c => c.classList.remove('tw-on'));
      }
    });
  }, { rootMargin: '-4% 0px -12% 0px', threshold: [0, 0.08, 0.3] });

  targets.forEach(el => twObs.observe(el));
}

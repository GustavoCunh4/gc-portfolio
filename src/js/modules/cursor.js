/** cursor.js */
export function initCursor() {
  if (window.matchMedia('(pointer: coarse)').matches) return; // skip touch
  const dot = document.getElementById('cur');
  const ring = document.getElementById('cur-r');
  let cx = 0, cy = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => {
    cx = e.clientX; cy = e.clientY;
    dot.style.left = cx + 'px'; dot.style.top = cy + 'px';
  });
  (function loop() {
    rx += (cx - rx) * .12; ry += (cy - ry) * .12;
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    requestAnimationFrame(loop);
  })();
}

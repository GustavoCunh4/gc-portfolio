export function initScramble() {
  document.querySelectorAll('[data-scramble]').forEach(element => {
    element.dataset.scrambleReady = 'true';
  });
}

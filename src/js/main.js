/**
 * main.js — Entry point
 */
import * as THREE from 'three';
import Lenis from 'lenis';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { initScene } from './modules/scene.js';
import { initCamera } from './modules/camera.js';
import { initScroll } from './modules/scroll.js';
import { initCursor } from './modules/cursor.js';
import { initCarousel } from './modules/carousel.js';
import { initMotion } from './modules/motion.js';

function init() {
  const canvas = document.getElementById('c');
  const renderer = createRenderer(canvas);
  const scene = initScene();
  const camera = initCamera();
  const lenis = initLenis();
  const motion = initMotion();
  const scroll = initScroll(camera, {
    onSectionChange: motion.onSectionChange,
    scrollToSection: y => lenis.scrollTo(y, { duration: 1.15, easing: t => 1 - Math.pow(1 - t, 3) })
  });

  const composer = createComposer(renderer, scene, camera);

  initCursor();
  initCarousel();

  window.nav = { goTo: scroll.goTo };

  const heroPanel = document.getElementById('p-hero');
  if (heroPanel) heroPanel.classList.add('visible');
  motion.onSectionChange(scroll.sections[0], 0);

  function animate(now) {
    requestAnimationFrame(animate);
    lenis.raf(now);
    const time = now * 0.001;
    scroll.update(time);
    scene.userData.tick?.(time);
    composer.render();
  }
  requestAnimationFrame(animate);

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth, window.innerHeight);
  });
}

function createComposer(renderer, scene, camera) {
  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  const bloom = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    0.95,  // strength
    0.38,  // radius
    0.20   // threshold — tudo acima disso brilha
  );
  composer.addPass(bloom);
  return composer;
}

function initLenis() {
  return new Lenis({
    duration: 1.15,
    smoothWheel: true,
    touchMultiplier: 1.05,
    wheelMultiplier: 0.92
  });
}

function createRenderer(canvas) {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance'
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x06080f, 1);
  return renderer;
}

init();

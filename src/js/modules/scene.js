import * as THREE from 'three';

const cyan   = 0x00cfff;
const violet = 0x8b5cf6;

function createParticles(count, spread) {
  const positions = new Float32Array(count * 3);
  const colors    = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const radius = 2.2 + Math.random() * spread;
    const angle  = Math.random() * Math.PI * 2;
    positions[i * 3]     = Math.cos(angle) * radius;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 9;
    positions[i * 3 + 2] = Math.sin(angle) * radius;

    const useViolet = i % 5 === 0;
    colors[i * 3]     = useViolet ? 0.55 : 0;
    colors[i * 3 + 1] = useViolet ? 0.36 : 0.81;
    colors[i * 3 + 2] = useViolet ? 0.96 : 1;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color',    new THREE.BufferAttribute(colors, 3));

  return new THREE.Points(
    geometry,
    new THREE.PointsMaterial({
      size: 0.052,
      transparent: true,
      opacity: 0.7,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
  );
}

function createRing(radius, tube, color, opacity) {
  return new THREE.Mesh(
    new THREE.TorusGeometry(radius, tube, 8, 96),
    new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
  );
}

function createGrid() {
  const grid = new THREE.GridHelper(14, 14, cyan, cyan);
  const mat  = grid.material;
  mat.opacity     = 0.055;
  mat.transparent = true;
  mat.blending    = THREE.AdditiveBlending;
  mat.depthWrite  = false;
  grid.position.y = -3.8;
  return grid;
}

export function initHeroScene(canvas) {
  const isMobile = window.matchMedia('(max-width: 860px)').matches;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: !isMobile,
    powerPreference: 'high-performance',
  });

  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(52, 1, 0.1, 80);
  camera.position.set(0, 0.5, 11.8);

  /* ── Core group ── */
  const core = new THREE.Group();

  const cage = new THREE.Mesh(
    new THREE.IcosahedronGeometry(1.22, 2),
    new THREE.MeshBasicMaterial({
      color: cyan,
      transparent: true,
      opacity: 0.44,
      wireframe: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
  );

  const knot = new THREE.Mesh(
    new THREE.TorusKnotGeometry(0.56, 0.105, 88, 10, 2, 3),
    new THREE.MeshBasicMaterial({
      color: violet,
      transparent: true,
      opacity: 0.56,
      wireframe: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
  );

  const pulse = new THREE.Mesh(
    new THREE.SphereGeometry(0.23, 18, 18),
    new THREE.MeshBasicMaterial({ color: cyan, transparent: true, opacity: 0.92 })
  );

  /* Inner glow halo */
  const glow = new THREE.Mesh(
    new THREE.SphereGeometry(0.72, 16, 16),
    new THREE.MeshBasicMaterial({
      color: cyan,
      transparent: true,
      opacity: 0.038,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
  );

  core.add(cage, knot, pulse, glow);
  scene.add(core);

  /* ── Outer cage (large, very subtle) ── */
  const outerCage = new THREE.Mesh(
    new THREE.IcosahedronGeometry(2.5, 1),
    new THREE.MeshBasicMaterial({
      color: violet,
      transparent: true,
      opacity: 0.09,
      wireframe: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
  );
  scene.add(outerCage);

  /* ── Rings ── */
  const ringA = createRing(2.1,  0.022, cyan,   0.54);
  const ringB = createRing(3.1,  0.018, violet, 0.38);
  const ringC = createRing(4.35, 0.013, cyan,   0.2);
  ringA.rotation.x =  Math.PI / 2.8;
  ringB.rotation.x =  Math.PI / 2;
  ringB.rotation.y =  Math.PI / 4.6;
  ringC.rotation.x =  Math.PI / 2.25;
  ringC.rotation.y = -Math.PI / 5;
  scene.add(ringA, ringB, ringC);

  /* ── Satellites ── */
  const satCount  = isMobile ? 5 : 8;
  const satellites = Array.from({ length: satCount }, (_, i) => {
    const mesh = new THREE.Mesh(
      new THREE.SphereGeometry(i % 2 ? 0.062 : 0.092, 10, 10),
      new THREE.MeshBasicMaterial({ color: i % 3 ? cyan : violet })
    );
    mesh.userData = {
      angle:  (i / satCount) * Math.PI * 2,
      radius: 2.8 + (i % 3) * 0.8,
      speed:  0.24 + i * 0.032,
    };
    scene.add(mesh);
    return mesh;
  });

  /* ── Particles ── */
  const particles = createParticles(isMobile ? 160 : 480, isMobile ? 5.5 : 7.5);
  scene.add(particles);

  /* ── Grid plane ── */
  if (!isMobile) {
    scene.add(createGrid());
  }

  /* ── State ── */
  let frame    = 0;
  let active   = false;
  let pointerX = 0;
  let pointerY = 0;

  function resize() {
    const w = Math.max(1, canvas.clientWidth);
    const h = Math.max(1, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.2 : 1.6));
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }

  function render(time = 0) {
    if (!active) return;
    const t = time * 0.001;

    cage.rotation.x       =  t * 0.25;
    cage.rotation.y       =  t * 0.40;
    knot.rotation.x       = -t * 0.22;
    knot.rotation.z       =  t * 0.34;
    glow.rotation.y       =  t * 0.12;
    outerCage.rotation.x  =  t * 0.07;
    outerCage.rotation.y  = -t * 0.11;
    pulse.scale.setScalar(1 + Math.sin(t * 2.4) * 0.18);

    ringA.rotation.z      =  t * 0.22;
    ringB.rotation.z      = -t * 0.16;
    ringC.rotation.z      =  t * 0.10;
    particles.rotation.y  =  t * 0.016;

    satellites.forEach((sat, i) => {
      const angle = sat.userData.angle + t * sat.userData.speed;
      sat.position.set(
        Math.cos(angle) * sat.userData.radius,
        Math.sin(t * 0.8 + i) * 1.5,
        Math.sin(angle) * sat.userData.radius
      );
    });

    core.rotation.y += (pointerX * 0.28 - core.rotation.y) * 0.035;
    core.rotation.x += (-pointerY * 0.14 - core.rotation.x) * 0.035;

    renderer.render(scene, camera);
    frame = requestAnimationFrame(render);
  }

  function setActive(nextActive) {
    if (nextActive === active) return;
    active = nextActive;
    canvas.dataset.active = String(active);
    cancelAnimationFrame(frame);
    if (active) frame = requestAnimationFrame(render);
  }

  function handlePointer(event) {
    pointerX = event.clientX / window.innerWidth  - 0.5;
    pointerY = event.clientY / window.innerHeight - 0.5;
  }

  resize();
  canvas.dataset.active = 'false';
  canvas.classList.add('is-ready');
  window.addEventListener('resize', resize);
  if (!isMobile) window.addEventListener('pointermove', handlePointer, { passive: true });

  return {
    setActive,
    destroy() {
      setActive(false);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', handlePointer);
      renderer.dispose();
    },
  };
}

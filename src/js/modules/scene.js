import * as THREE from 'three';

const cyan = 0x00cfff;
const violet = 0x8b5cf6;

function createParticles(count, spread) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  for (let index = 0; index < count; index += 1) {
    const radius = 2 + Math.random() * spread;
    const angle = Math.random() * Math.PI * 2;
    positions[index * 3] = Math.cos(angle) * radius;
    positions[index * 3 + 1] = (Math.random() - 0.5) * 8;
    positions[index * 3 + 2] = Math.sin(angle) * radius;

    const useViolet = index % 5 === 0;
    colors[index * 3] = useViolet ? 0.55 : 0;
    colors[index * 3 + 1] = useViolet ? 0.36 : 0.81;
    colors[index * 3 + 2] = useViolet ? 0.96 : 1;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  return new THREE.Points(
    geometry,
    new THREE.PointsMaterial({
      size: 0.055,
      transparent: true,
      opacity: 0.72,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })
  );
}

function createRing(radius, tube, color, opacity) {
  return new THREE.Mesh(
    new THREE.TorusGeometry(radius, tube, 8, 86),
    new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })
  );
}

export function initHeroScene(canvas) {
  const isMobile = window.matchMedia('(max-width: 860px)').matches;
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: !isMobile,
    powerPreference: 'high-performance'
  });

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(52, 1, 0.1, 80);
  camera.position.set(0, 0.5, 11.8);

  const core = new THREE.Group();
  const cage = new THREE.Mesh(
    new THREE.IcosahedronGeometry(1.2, 2),
    new THREE.MeshBasicMaterial({
      color: cyan,
      transparent: true,
      opacity: 0.42,
      wireframe: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })
  );

  const knot = new THREE.Mesh(
    new THREE.TorusKnotGeometry(0.56, 0.105, 78, 10, 2, 3),
    new THREE.MeshBasicMaterial({
      color: violet,
      transparent: true,
      opacity: 0.58,
      wireframe: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })
  );

  const pulse = new THREE.Mesh(
    new THREE.SphereGeometry(0.23, 18, 18),
    new THREE.MeshBasicMaterial({ color: cyan, transparent: true, opacity: 0.92 })
  );

  core.add(cage, knot, pulse);
  scene.add(core);

  const ringA = createRing(2.1, 0.022, cyan, 0.52);
  const ringB = createRing(3.05, 0.018, violet, 0.38);
  const ringC = createRing(4.25, 0.014, cyan, 0.2);
  ringA.rotation.x = Math.PI / 2.8;
  ringB.rotation.x = Math.PI / 2;
  ringB.rotation.y = Math.PI / 4.6;
  ringC.rotation.x = Math.PI / 2.25;
  ringC.rotation.y = -Math.PI / 5;
  scene.add(ringA, ringB, ringC);

  const satellites = Array.from({ length: isMobile ? 4 : 7 }, (_, index) => {
    const mesh = new THREE.Mesh(
      new THREE.SphereGeometry(index % 2 ? 0.065 : 0.095, 10, 10),
      new THREE.MeshBasicMaterial({ color: index % 3 ? cyan : violet })
    );
    mesh.userData = {
      angle: (index / 7) * Math.PI * 2,
      radius: 2.8 + (index % 3) * 0.8,
      speed: 0.26 + index * 0.035
    };
    scene.add(mesh);
    return mesh;
  });

  const particles = createParticles(isMobile ? 135 : 320, isMobile ? 5.3 : 7);
  scene.add(particles);

  let frame = 0;
  let active = false;
  let pointerX = 0;
  let pointerY = 0;

  function resize() {
    const width = Math.max(1, canvas.clientWidth);
    const height = Math.max(1, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.15 : 1.55));
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }

  function render(time = 0) {
    if (!active) return;

    const elapsed = time * 0.001;
    cage.rotation.x = elapsed * 0.25;
    cage.rotation.y = elapsed * 0.4;
    knot.rotation.x = -elapsed * 0.22;
    knot.rotation.z = elapsed * 0.34;
    pulse.scale.setScalar(1 + Math.sin(elapsed * 2.4) * 0.18);
    ringA.rotation.z = elapsed * 0.22;
    ringB.rotation.z = -elapsed * 0.16;
    ringC.rotation.z = elapsed * 0.1;
    particles.rotation.y = elapsed * 0.018;

    satellites.forEach((satellite, index) => {
      const angle = satellite.userData.angle + elapsed * satellite.userData.speed;
      satellite.position.set(
        Math.cos(angle) * satellite.userData.radius,
        Math.sin(elapsed * 0.8 + index) * 1.5,
        Math.sin(angle) * satellite.userData.radius
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
    pointerX = event.clientX / window.innerWidth - 0.5;
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
    }
  };
}

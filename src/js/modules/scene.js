/**
 * scene.js — Dark space ecosystem: bloom-ready, with trails, multi-rings, glowing orbs
 */

import * as THREE from 'three';

const SECTION_COUNT = 5;

function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
function sectionWeight(p, i) { return clamp(1 - Math.abs(p - i), 0, 1); }

function makeLine(points, color, opacity) {
  return new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(points),
    new THREE.LineBasicMaterial({ color, transparent: true, opacity, blending: THREE.AdditiveBlending })
  );
}

export function initScene() {
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x06080f, 0.017);

  const isMobile = window.innerWidth < 700;

  // ── Lights ──
  scene.add(new THREE.AmbientLight(0x0a1028, 0.3));

  const keyLight = new THREE.DirectionalLight(0x4080cc, 0.55);
  keyLight.position.set(6, 11, 4);
  scene.add(keyLight);

  const coreLight = new THREE.PointLight(0x00cfff, 5.0, 22);
  coreLight.position.set(0, 1.5, 0);
  scene.add(coreLight);

  const fillLight = new THREE.PointLight(0x9b59f4, 2.5, 34);
  fillLight.position.set(-7, 5, -5);
  scene.add(fillLight);

  const beaconLight = new THREE.PointLight(0x00cfff, 0.6, 18);
  beaconLight.position.set(0, 6, -2);
  scene.add(beaconLight);

  // ── Grid ──
  const grid = new THREE.GridHelper(100, isMobile ? 28 : 48, 0x003355, 0x001a33);
  grid.material.transparent = true;
  grid.material.opacity = 0.12;
  grid.position.y = -4;
  scene.add(grid);

  // ── Platform ──
  const platform = new THREE.Mesh(
    new THREE.CylinderGeometry(5.7, 5.1, 0.35, 8),
    new THREE.MeshPhongMaterial({ color: 0x0d1a2e, emissive: 0x003355, shininess: 120, transparent: true, opacity: 0.92 })
  );
  platform.position.set(0, -2.55, 0);
  scene.add(platform);

  const platformInner = new THREE.Mesh(
    new THREE.CylinderGeometry(3.4, 3.15, 0.16, 8),
    new THREE.MeshBasicMaterial({ color: 0x0a1830, transparent: true, opacity: 0.7 })
  );
  platformInner.position.set(0, -2.32, 0);
  scene.add(platformInner);

  const platformGlow = new THREE.Mesh(
    new THREE.CircleGeometry(4.8, 48),
    new THREE.MeshBasicMaterial({ color: 0x00cfff, transparent: true, opacity: 0.07, blending: THREE.AdditiveBlending, depthWrite: false })
  );
  platformGlow.rotation.x = -Math.PI / 2;
  platformGlow.position.set(0, -2.2, 0);
  scene.add(platformGlow);

  const platformAura = new THREE.Mesh(
    new THREE.RingGeometry(4.9, 6.25, 64),
    new THREE.MeshBasicMaterial({ color: 0x00cfff, transparent: true, opacity: 0.04, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false })
  );
  platformAura.rotation.x = -Math.PI / 2;
  platformAura.position.set(0, -2.45, 0);
  scene.add(platformAura);

  const outerRing = new THREE.Mesh(
    new THREE.TorusGeometry(5.45, 0.05, 8, 64),
    new THREE.MeshBasicMaterial({ color: 0x00cfff, transparent: true, opacity: 0.35, blending: THREE.AdditiveBlending, depthWrite: false })
  );
  outerRing.rotation.x = Math.PI / 2;
  outerRing.position.set(0, -2.34, 0);
  scene.add(outerRing);

  const innerRing = new THREE.Mesh(
    new THREE.TorusGeometry(3.15, 0.035, 8, 64),
    new THREE.MeshBasicMaterial({ color: 0x9b59f4, transparent: true, opacity: 0.22, blending: THREE.AdditiveBlending, depthWrite: false })
  );
  innerRing.rotation.x = Math.PI / 2;
  innerRing.position.set(0, -2.26, 0);
  scene.add(innerRing);

  // ── Core ──
  const core = new THREE.Group();

  const coreColumn = new THREE.Mesh(
    new THREE.CylinderGeometry(0.16, 0.32, 2.8, 6),
    new THREE.MeshPhongMaterial({ color: 0x0a1428, emissive: 0x001a33, shininess: 120, transparent: true, opacity: 0.88 })
  );
  coreColumn.position.y = -0.92;
  core.add(coreColumn);

  const coreCage = new THREE.Mesh(
    new THREE.IcosahedronGeometry(1.1, 1),
    new THREE.MeshBasicMaterial({ color: 0x00cfff, wireframe: true, transparent: true, opacity: 0.35, blending: THREE.AdditiveBlending, depthWrite: false })
  );
  coreCage.position.y = 0.88;
  core.add(coreCage);

  const torusKnot = new THREE.Mesh(
    new THREE.TorusKnotGeometry(0.48, 0.11, 80, 12, 2, 3),
    new THREE.MeshBasicMaterial({ color: 0x9b59f4, wireframe: true, transparent: true, opacity: 0.32, blending: THREE.AdditiveBlending, depthWrite: false })
  );
  torusKnot.position.y = 0.88;
  core.add(torusKnot);

  // Core pulse — bright, will bloom strongly
  const corePulse = new THREE.Mesh(
    new THREE.SphereGeometry(0.22, 18, 18),
    new THREE.MeshBasicMaterial({ color: 0x00cfff, transparent: true, opacity: 1.0, blending: THREE.AdditiveBlending, depthWrite: false })
  );
  corePulse.position.y = 0.88;
  core.add(corePulse);

  const auraRing = new THREE.Mesh(
    new THREE.TorusGeometry(1.45, 0.04, 8, 48),
    new THREE.MeshBasicMaterial({ color: 0x00cfff, transparent: true, opacity: 0.12, blending: THREE.AdditiveBlending, depthWrite: false })
  );
  auraRing.rotation.x = Math.PI / 2;
  auraRing.position.y = 0.92;
  core.add(auraRing);

  const auraRing2 = new THREE.Mesh(
    new THREE.TorusGeometry(1.2, 0.03, 8, 48),
    new THREE.MeshBasicMaterial({ color: 0x9b59f4, transparent: true, opacity: 0.14, blending: THREE.AdditiveBlending, depthWrite: false })
  );
  auraRing2.rotation.x = Math.PI / 3;
  auraRing2.position.y = 0.88;
  core.add(auraRing2);

  scene.add(core);

  // ── Scan rings (3 at different speeds/offsets) ──
  const scanRings = [
    { offset: 0,   radius: 12, color: 0x00cfff },
    { offset: 4.8, radius: 8,  color: 0x9b59f4 },
    { offset: 9.2, radius: 14, color: 0x00cfff }
  ].map(cfg => {
    const ring = new THREE.Mesh(
      new THREE.RingGeometry(0.1, cfg.radius, 64),
      new THREE.MeshBasicMaterial({ color: cfg.color, transparent: true, opacity: 0.02, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false })
    );
    ring.rotation.x = Math.PI / 2;
    ring.userData = { offset: cfg.offset };
    scene.add(ring);
    return ring;
  });

  // ── Service nodes ──
  const serviceLayout = [
    { x: -3.8, z: 3.1, h: 2.5, color: 0x00cfff },
    { x: -2.2, z: -2.8, h: 3.6, color: 0x9b59f4 },
    { x: 0.2, z: 4.1, h: 4.5, color: 0x00cfff },
    { x: 2.5, z: -2.4, h: 3.2, color: 0x9b59f4 },
    { x: 4.1, z: 2.5, h: 2.9, color: 0x00cfff }
  ];

  const serviceNodes = serviceLayout.map((node, index) => {
    const group = new THREE.Group();

    const body = new THREE.Mesh(
      new THREE.BoxGeometry(0.62, node.h, 0.62),
      new THREE.MeshPhongMaterial({ color: 0x0a1428, emissive: 0x002040, shininess: 100, transparent: true, opacity: 0.88 })
    );
    group.add(body);

    const top = new THREE.Mesh(
      new THREE.BoxGeometry(0.72, 0.08, 0.72),
      new THREE.MeshBasicMaterial({ color: node.color, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false })
    );
    top.position.y = node.h / 2 - 0.12;
    group.add(top);

    const topGlow = new THREE.Mesh(
      new THREE.PlaneGeometry(1.1, 1.1),
      new THREE.MeshBasicMaterial({ color: node.color, transparent: true, opacity: 0.1, blending: THREE.AdditiveBlending, depthWrite: false })
    );
    topGlow.rotation.x = -Math.PI / 2;
    topGlow.position.y = node.h / 2 - 0.04;
    group.add(topGlow);

    const monitor = new THREE.Mesh(
      new THREE.PlaneGeometry(0.82, 0.36),
      new THREE.MeshBasicMaterial({ color: node.color, transparent: true, opacity: 0.1, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false })
    );
    monitor.position.set(0, node.h / 2 + 0.42, 0);
    monitor.rotation.y = index % 2 === 0 ? -0.35 : 0.35;
    group.add(monitor);

    group.position.set(node.x, -2.55 + node.h / 2, node.z);
    scene.add(group);

    const anchor = new THREE.Vector3(node.x, node.h - 1.18, node.z);
    const line = makeLine(
      [new THREE.Vector3(0, -0.4, 0), new THREE.Vector3(node.x, -2.55 + node.h - 0.2, node.z)],
      node.color, 0.1
    );
    scene.add(line);

    return { group, body, top, topGlow, monitor, anchor, line, baseHeight: node.h };
  });

  // ── Orbit nodes — solid glowing spheres (bloom-ready) ──
  const skillOrbits = [
    { radius: 6.6, y: 1.6, speed: 0.18, color: 0x00cfff },
    { radius: 5.2, y: 0.5, speed: -0.22, color: 0x9b59f4 },
    { radius: 4.4, y: 2.4, speed: 0.14, color: 0x00cfff },
    { radius: 7.2, y: 0.8, speed: -0.12, color: 0x9b59f4 }
  ];

  const orbitNodes = skillOrbits.map((config, index) => {
    const node = new THREE.Mesh(
      new THREE.SphereGeometry(0.14, 12, 12),
      new THREE.MeshBasicMaterial({
        color: config.color,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      })
    );
    node.userData = {
      angle: (index / skillOrbits.length) * Math.PI * 2,
      radius: config.radius,
      height: config.y,
      speed: config.speed
    };
    scene.add(node);
    return node;
  });

  // ── Project clusters ──
  const projectLayout = [
    { x: -6.8, y: 0.4, z: -5.4, color: 0x00cfff },
    { x: 0, y: 1.5, z: -7.2, color: 0x9b59f4 },
    { x: 6.8, y: 0.8, z: -5.3, color: 0x00cfff }
  ];

  const projectClusters = projectLayout.map((cluster) => {
    const group = new THREE.Group();

    const frame = new THREE.Mesh(
      new THREE.BoxGeometry(1.55, 1.05, 0.08),
      new THREE.MeshBasicMaterial({ color: cluster.color, transparent: true, opacity: 0.16, wireframe: true })
    );
    group.add(frame);

    const card = new THREE.Mesh(
      new THREE.PlaneGeometry(1.2, 0.78),
      new THREE.MeshBasicMaterial({ color: cluster.color, transparent: true, opacity: 0.05, side: THREE.DoubleSide })
    );
    group.add(card);

    group.position.set(cluster.x, cluster.y, cluster.z);
    group.rotation.y = cluster.x < 0 ? 0.45 : cluster.x > 0 ? -0.45 : 0;
    scene.add(group);

    const path = makeLine(
      [new THREE.Vector3(0, 0.6, -0.3), new THREE.Vector3(cluster.x * 0.35, 1.2, cluster.z * 0.45), new THREE.Vector3(cluster.x, cluster.y, cluster.z)],
      cluster.color, 0.06
    );
    scene.add(path);

    return { group, frame, card, path };
  });

  // ── Beacon ──
  const beacon = new THREE.Group();

  const beam = new THREE.Mesh(
    new THREE.CylinderGeometry(0.12, 0.48, 6.4, 12, 1, true),
    new THREE.MeshBasicMaterial({ color: 0x00cfff, transparent: true, opacity: 0.07, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false })
  );
  beam.position.y = 1.6;
  beacon.add(beam);

  const beaconRing = new THREE.Mesh(
    new THREE.TorusGeometry(1.05, 0.028, 8, 48),
    new THREE.MeshBasicMaterial({ color: 0x00cfff, transparent: true, opacity: 0.2, blending: THREE.AdditiveBlending, depthWrite: false })
  );
  beaconRing.rotation.x = Math.PI / 2;
  beaconRing.position.y = 3.7;
  beacon.add(beaconRing);
  scene.add(beacon);

  // ── Data packets with trails ──
  const dataPacketCount = isMobile ? 12 : 22;
  const TRAIL_LEN = 8;

  const packetRoutes = serviceNodes.map(node => ({
    curve: new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(0, -0.55, 0),
      new THREE.Vector3(node.anchor.x * 0.42, 0.5 + Math.abs(node.anchor.z) * 0.08, node.anchor.z * 0.32),
      new THREE.Vector3(node.anchor.x, node.anchor.y, node.anchor.z)
    )
  }));

  const dataPackets = Array.from({ length: dataPacketCount }, (_, index) => {
    const isCyan = index % 2 === 0;
    const color = isCyan ? 0x00cfff : 0x9b59f4;
    const route = packetRoutes[index % packetRoutes.length];

    const packet = new THREE.Mesh(
      new THREE.SphereGeometry(0.07, 8, 8),
      new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 1.0, blending: THREE.AdditiveBlending, depthWrite: false })
    );

    // Trail Line
    const trailPos = new Float32Array(TRAIL_LEN * 3);
    const trailGeo = new THREE.BufferGeometry();
    trailGeo.setAttribute('position', new THREE.BufferAttribute(trailPos, 3));
    const trail = new THREE.Line(
      trailGeo,
      new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.45, blending: THREE.AdditiveBlending })
    );
    scene.add(trail);

    packet.userData = {
      route,
      progress: index / dataPacketCount,
      speed: 0.1 + (index % 5) * 0.018,
      trail,
      trailPos,
      trailHistory: []
    };

    scene.add(packet);
    return packet;
  });

  // ── Particles ──
  const particleCount = isMobile ? 150 : 400;
  const particleArray = new Float32Array(particleCount * 3);
  const particleColors = new Float32Array(particleCount * 3);
  const particleMeta = [];

  for (let i = 0; i < particleCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = 2 + Math.random() * 8;
    particleArray[i * 3]     = Math.cos(angle) * radius;
    particleArray[i * 3 + 1] = -1.5 + Math.random() * 6;
    particleArray[i * 3 + 2] = Math.sin(angle) * radius;
    if (i % 3 === 0) {
      particleColors[i * 3] = 0.61; particleColors[i * 3 + 1] = 0.35; particleColors[i * 3 + 2] = 0.96;
    } else {
      particleColors[i * 3] = 0.0; particleColors[i * 3 + 1] = 0.82; particleColors[i * 3 + 2] = 1.0;
    }
    particleMeta.push({ originY: particleArray[i * 3 + 1], drift: 0.002 + Math.random() * 0.011, sway: Math.random() * Math.PI * 2 });
  }

  const particleGeometry = new THREE.BufferGeometry();
  particleGeometry.setAttribute('position', new THREE.BufferAttribute(particleArray, 3));
  particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));
  const particles = new THREE.Points(
    particleGeometry,
    new THREE.PointsMaterial({ size: 0.07, transparent: true, opacity: 0.8, vertexColors: true, blending: THREE.AdditiveBlending, depthWrite: false })
  );
  scene.add(particles);

  // ── Stars ──
  const starCount = isMobile ? 1000 : 2400;
  const starArray = new Float32Array(starCount * 3);
  const starColors = new Float32Array(starCount * 3);

  for (let i = 0; i < starCount; i++) {
    starArray[i * 3]     = (Math.random() - 0.5) * 200;
    starArray[i * 3 + 1] = Math.random() * 60 + 5;
    starArray[i * 3 + 2] = (Math.random() - 0.5) * 200;
    if (i % 5 === 0) {
      starColors[i * 3] = 0.0; starColors[i * 3 + 1] = 0.82; starColors[i * 3 + 2] = 1.0;
    } else {
      starColors[i * 3] = 1; starColors[i * 3 + 1] = 1; starColors[i * 3 + 2] = 1;
    }
  }

  const starGeometry = new THREE.BufferGeometry();
  starGeometry.setAttribute('position', new THREE.BufferAttribute(starArray, 3));
  starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));
  const stars = new THREE.Points(
    starGeometry,
    new THREE.PointsMaterial({ size: 0.12, transparent: true, opacity: 0.65, vertexColors: true, blending: THREE.AdditiveBlending, depthWrite: false })
  );
  scene.add(stars);

  // ── Tick ──
  scene.userData.tick = (time) => {
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const scrollFraction = clamp(window.scrollY / maxScroll, 0, 1);
    const storyProgress = scrollFraction * (SECTION_COUNT - 1);

    const heroWeight     = sectionWeight(storyProgress, 0);
    const aboutWeight    = sectionWeight(storyProgress, 1);
    const skillsWeight   = sectionWeight(storyProgress, 2);
    const projectsWeight = sectionWeight(storyProgress, 3);
    const contactWeight  = sectionWeight(storyProgress, 4);

    // Rings
    outerRing.rotation.z = time * (0.08 + heroWeight * 0.05);
    innerRing.rotation.z = -time * (0.12 + skillsWeight * 0.04);
    outerRing.material.opacity = 0.18 + heroWeight * 0.30 + Math.sin(time * 2) * 0.06;
    innerRing.material.opacity = 0.08 + skillsWeight * 0.26 + Math.sin(time * 1.8 + 1) * 0.04;

    // Core
    coreCage.rotation.x = time * 0.35;
    coreCage.rotation.y = time * 0.5;
    coreCage.scale.setScalar(1 + heroWeight * 0.22 + Math.sin(time * 2.4) * 0.04);
    coreCage.material.opacity = 0.22 + heroWeight * 0.20 + contactWeight * 0.08;

    torusKnot.rotation.x += 0.008;
    torusKnot.rotation.z += 0.006;
    torusKnot.material.opacity = 0.18 + skillsWeight * 0.24 + Math.sin(time * 1.5) * 0.04;

    corePulse.scale.setScalar(1 + Math.sin(time * 3.2) * 0.28 + contactWeight * 0.42);
    corePulse.material.opacity = clamp(0.85 + heroWeight * 0.15 + contactWeight * 0.15, 0, 1);

    auraRing.rotation.z = -time * 0.75;
    auraRing.scale.setScalar(1 + heroWeight * 0.2 + Math.sin(time * 2.4) * 0.05);
    auraRing.material.opacity = 0.08 + heroWeight * 0.14 + contactWeight * 0.06;

    auraRing2.rotation.z = time * 0.55;
    auraRing2.material.opacity = 0.08 + skillsWeight * 0.16;

    core.position.y = Math.sin(time * 1.1) * 0.1;

    // Scan rings (each moves at slightly different speed)
    scanRings.forEach((ring, ri) => {
      ring.position.y = ((time * (0.38 + ri * 0.07) + ring.userData.offset) % 14) - 5;
      ring.material.opacity = 0.015 + heroWeight * 0.012 + skillsWeight * 0.012;
    });

    // Lights
    coreLight.intensity  = 4.0 + heroWeight * 1.8 + Math.sin(time * 1.5) * 0.6;
    fillLight.intensity  = 1.4 + aboutWeight * 0.9 + skillsWeight * 0.6 + Math.sin(time * 0.8 + 1) * 0.25;
    beaconLight.intensity = 0.3 + contactWeight * 2.6;

    // Service nodes
    serviceNodes.forEach((node, i) => {
      const lift = aboutWeight * 0.28 + skillsWeight * 0.14;
      node.group.position.y = -2.55 + node.baseHeight / 2 + lift + Math.sin(time * 1.2 + i) * 0.04;
      node.top.material.opacity = 0.6 + aboutWeight * 0.35 + Math.sin(time * 2.2 + i) * 0.22;
      node.topGlow.material.opacity = 0.08 + aboutWeight * 0.14 + Math.sin(time * 2.2 + i) * 0.06;
      node.monitor.material.opacity = 0.06 + aboutWeight * 0.12 + skillsWeight * 0.1;
      node.line.material.opacity = 0.05 + heroWeight * 0.04 + aboutWeight * 0.12 + contactWeight * 0.12;
      node.monitor.lookAt(0, 1.2, 8);
    });

    // Orbit nodes — solid spheres bloom beautifully
    orbitNodes.forEach((node, i) => {
      node.userData.angle += node.userData.speed * 0.016;
      node.position.x = Math.cos(node.userData.angle + time * 0.25) * node.userData.radius;
      node.position.z = Math.sin(node.userData.angle + time * 0.25) * node.userData.radius;
      node.position.y = node.userData.height + Math.sin(time * 1.6 + i) * 0.3;
      node.material.opacity = clamp(0.1 + skillsWeight * 0.88 + heroWeight * 0.1, 0, 1);
      node.scale.setScalar(0.6 + skillsWeight * 0.6 + Math.sin(time * 2.5 + i) * 0.1);
    });

    // Project clusters
    projectClusters.forEach((cluster, i) => {
      cluster.group.position.y = projectLayout[i].y + Math.sin(time * 1.4 + i) * 0.1;
      cluster.group.rotation.y += 0.0018;
      cluster.frame.material.opacity = 0.07 + projectsWeight * 0.3;
      cluster.card.material.opacity = 0.03 + projectsWeight * 0.14;
      cluster.path.material.opacity = 0.04 + projectsWeight * 0.18 + contactWeight * 0.07;
    });

    // Data packets + trails
    dataPackets.forEach((packet, i) => {
      packet.userData.progress = (packet.userData.progress + packet.userData.speed * (0.008 + aboutWeight * 0.003 + projectsWeight * 0.002)) % 1;

      packet.userData.route.curve.getPoint(packet.userData.progress, packet.position);

      // Trail history
      const hist = packet.userData.trailHistory;
      hist.unshift({ x: packet.position.x, y: packet.position.y, z: packet.position.z });
      if (hist.length > TRAIL_LEN) hist.pop();

      const tp = packet.userData.trailPos;
      for (let j = 0; j < TRAIL_LEN; j++) {
        const h = hist[j] ?? hist[hist.length - 1] ?? packet.position;
        tp[j * 3] = h.x; tp[j * 3 + 1] = h.y; tp[j * 3 + 2] = h.z;
      }
      packet.userData.trail.geometry.attributes.position.needsUpdate = true;

      const pOpacity = clamp(0.55 + aboutWeight * 0.35 + projectsWeight * 0.1, 0, 1);
      packet.material.opacity = pOpacity;
      packet.userData.trail.material.opacity = clamp(pOpacity * 0.45, 0, 1);
      packet.scale.setScalar(0.9 + Math.sin(time * 4 + i) * 0.08);
    });

    // Particles
    const positions = particleGeometry.attributes.position;
    for (let i = 0; i < particleCount; i++) {
      positions.setY(i, positions.getY(i) + particleMeta[i].drift + contactWeight * 0.01);
      positions.setX(i, positions.getX(i) + Math.sin(time + particleMeta[i].sway) * 0.002);
      if (positions.getY(i) > 5.5 + contactWeight * 2) positions.setY(i, particleMeta[i].originY);
    }
    positions.needsUpdate = true;
    particles.material.opacity = clamp(0.5 + heroWeight * 0.18 + aboutWeight * 0.12 + contactWeight * 0.25, 0, 1);

    stars.material.opacity = 0.5 + heroWeight * 0.14;

    // Beacon
    beacon.visible = contactWeight > 0.02 || projectsWeight > 0.22;
    beacon.position.y = Math.sin(time * 1.8) * 0.06;
    beam.material.opacity = 0.02 + contactWeight * 0.18 + projectsWeight * 0.06;
    beaconRing.material.opacity = 0.06 + contactWeight * 0.35;
    beaconRing.rotation.z = time * (0.8 + contactWeight * 0.8);
    beaconRing.scale.setScalar(1 + contactWeight * 0.44 + Math.sin(time * 2.4) * 0.04);

    // Grid + platform
    grid.position.z = scrollFraction * 13;
    platform.rotation.y = Math.sin(time * 0.35) * 0.04;
    platformInner.material.opacity = 0.5 + heroWeight * 0.15 + contactWeight * 0.1;
    platformGlow.material.opacity = 0.06 + heroWeight * 0.08 + contactWeight * 0.12;
    platformAura.rotation.z = time * 0.1;
    platformAura.material.opacity = 0.03 + projectsWeight * 0.05 + contactWeight * 0.06;
  };

  return scene;
}

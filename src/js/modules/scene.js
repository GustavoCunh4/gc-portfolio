/**
 * scene.js — Cena 3D optimizada
 */
import * as THREE from 'three';

export function initScene() {
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x030810, 0.012);

  // Reduzir carga em mobile
  const isMobile = window.innerWidth < 700;

  // ── Luzes ──
  scene.add(new THREE.AmbientLight(0x0a1a2e, 1));
  const key = new THREE.DirectionalLight(0x00c8ff, 1.3);
  key.position.set(5, 10, 5);
  scene.add(key);
  const cyanPt = new THREE.PointLight(0x00c8ff, 3, 25);
  cyanPt.position.set(0, 3, 0);
  scene.add(cyanPt);
  const bluePt = new THREE.PointLight(0x0044ff, 1.5, 28);
  bluePt.position.set(-8, 5, -5);
  scene.add(bluePt);

  // ── Grid ──
  const gridH = new THREE.GridHelper(100, isMobile ? 30 : 50, 0x00c8ff, 0x00c8ff);
  if (Array.isArray(gridH.material)) {
    gridH.material.forEach(m => { m.opacity = 0.12; m.transparent = true; });
  } else {
    gridH.material.opacity = 0.12; gridH.material.transparent = true;
  }
  gridH.position.y = -4; scene.add(gridH);

  // ── Platform ──
  const platMat = new THREE.MeshPhongMaterial({ color: 0x0a1628, emissive: 0x003366, shininess: 80 });
  const platform = new THREE.Mesh(new THREE.CylinderGeometry(5, 4.5, 0.3, 6), platMat);
  platform.position.set(0, -2.5, 0); scene.add(platform);

  const ringMat  = new THREE.MeshBasicMaterial({ color: 0x00c8ff, transparent: true, opacity: .7 });
  const ring     = new THREE.Mesh(new THREE.TorusGeometry(5, 0.04, 8, 64), ringMat);
  ring.rotation.x = Math.PI/2; ring.position.set(0, -2.35, 0); scene.add(ring);

  const ring2Mat = new THREE.MeshBasicMaterial({ color: 0x0044ff, transparent: true, opacity: .35 });
  const ring2    = new THREE.Mesh(new THREE.TorusGeometry(3.8, 0.02, 8, 64), ring2Mat);
  ring2.rotation.x = Math.PI/2; ring2.position.set(0, -2.3, 0); scene.add(ring2);

  // ── Torres ──
  const towerConfigs = [[-2.5,-1,4.5],[2.5,-1,3.8],[-3.5,1.5,2.5],[3.5,1.5,3.2],[0,-2.5,2]];
  const towers = towerConfigs.map(([x,z,h]) => {
    const g = new THREE.Group();
    const body = new THREE.Mesh(
      new THREE.BoxGeometry(.6, h, .6),
      new THREE.MeshPhongMaterial({ color: 0x0e2040, emissive: 0x001122, shininess: 20 })
    );
    g.add(body);
    const led = new THREE.Mesh(
      new THREE.BoxGeometry(.62, .05, .62),
      new THREE.MeshBasicMaterial({ color: 0x00c8ff, transparent: true, opacity: .8 })
    );
    led.position.y = h / 2 * .8; g.add(led);
    g.position.set(x, -2.5 + h/2, z);
    scene.add(g); return g;
  });

  // ── Holo frame ──
  const holoGroup = new THREE.Group();
  const holoPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(4, 3),
    new THREE.MeshBasicMaterial({ color: 0x00c8ff, transparent: true, opacity: .08, side: THREE.DoubleSide })
  );
  holoPlane.position.z = 0.02;
  holoGroup.add(holoPlane);

  const holoFrame = new THREE.LineSegments(
    new THREE.EdgesGeometry(new THREE.BoxGeometry(4.12, 3.12, 0.12)),
    new THREE.LineBasicMaterial({ color: 0x00c8ff, transparent: true, opacity: .85 })
  );
  holoGroup.add(holoFrame);

  holoGroup.position.set(3, .5, -2);
  holoGroup.rotation.y = -.4;
  scene.add(holoGroup);

  // ── Orbit cubes (menos em mobile) ──
  const cubeCount = isMobile ? 4 : 8;
  const orbitCubes = Array.from({ length: cubeCount }, (_, i) => {
    const s = Math.random() * .3 + .1;
    const m = new THREE.Mesh(
      Math.random() > .5 ? new THREE.BoxGeometry(s,s,s) : new THREE.OctahedronGeometry(s),
      new THREE.MeshBasicMaterial({ color: 0x00c8ff, wireframe: true, transparent: true, opacity: .4 })
    );
    m.userData = { angle: (i/cubeCount)*Math.PI*2, radius: Math.random()*3+4, speed: Math.random()*.25+.08, height: Math.random()*3-1 };
    scene.add(m); return m;
  });

  // ── Particles ──
  const pCount = isMobile ? 180 : 380;
  const pArr = new Float32Array(pCount * 3);
  const pVel = [];
  for (let i = 0; i < pCount; i++) {
    const a = Math.random()*Math.PI*2, r = Math.random()*6+1;
    pArr[i*3] = Math.cos(a)*r; pArr[i*3+1] = Math.random()*5-2; pArr[i*3+2] = Math.sin(a)*r;
    pVel.push({ vy: Math.random()*.02+.004, initY: pArr[i*3+1] });
  }
  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute('position', new THREE.BufferAttribute(pArr, 3));
  const pts = new THREE.Points(pGeo, new THREE.PointsMaterial({ color: 0x00c8ff, size: .07, transparent: true, opacity: .65 }));
  scene.add(pts);

  // ── Stars ──
  const starCount = isMobile ? 800 : 1800;
  const starArr = new Float32Array(starCount * 3);
  for (let i=0;i<starCount;i++) {
    starArr[i*3]=(Math.random()-.5)*180; starArr[i*3+1]=Math.random()*60+5; starArr[i*3+2]=(Math.random()-.5)*180;
  }
  const starGeo = new THREE.BufferGeometry();
  starGeo.setAttribute('position', new THREE.BufferAttribute(starArr, 3));
  scene.add(new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xffffff, size: .12, transparent: true, opacity: .55 })));

  // ── Circuit lines ──
  [
    [[-2.5,0,-1],[2.5,0,-1]],
    [[-2.5,0,-1],[-3.5,0,1.5]],
    [[2.5,0,-1],[3.5,0,1.5]],
  ].forEach(([p1,p2]) => {
    const g = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(...p1),new THREE.Vector3(...p2)]);
    scene.add(new THREE.Line(g, new THREE.LineBasicMaterial({ color: 0x00c8ff, transparent: true, opacity: .07 })));
  });

  // ── Tick ──
  scene.userData.tick = (t) => {
    ring.material.opacity  = .45 + Math.sin(t*2)*.25;
    ring2.material.opacity = .18 + Math.sin(t*1.5+1)*.12;
    ring.rotation.z  =  t * .08;
    ring2.rotation.z = -t * .12;
    cyanPt.intensity = 2.5 + Math.sin(t*1.5)*.5;

    towers.forEach((tw, i) => {
      const led = tw.children[1];
      if (led) led.material.opacity = .45 + Math.sin(t*2.5+i)*.4;
    });

    orbitCubes.forEach(c => {
      c.userData.angle += c.userData.speed * .016;
      c.position.x = Math.cos(c.userData.angle) * c.userData.radius;
      c.position.z = Math.sin(c.userData.angle) * c.userData.radius;
      c.position.y = c.userData.height + Math.sin(t + c.userData.angle) * .28;
      c.rotation.x += .01; c.rotation.y += .014;
    });

    const pp = pGeo.attributes.position;
    for (let i=0;i<pCount;i++) {
      pp.setY(i, pp.getY(i) + pVel[i].vy);
      if (pp.getY(i) > 4) pp.setY(i, pVel[i].initY);
    }
    pp.needsUpdate = true;

    holoPlane.material.opacity = .06 + Math.sin(t*3.5)*.04;
    holoFrame.material.opacity = .7 + Math.sin(t*2.2)*.2;

    // Grid follows scroll
    const frac = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    gridH.position.z = frac * 14;
  };

  return scene;
}

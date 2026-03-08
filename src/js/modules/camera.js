/** camera.js */
import * as THREE from 'three';

export function initCamera() {
  const camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 300);
  camera.position.set(0, 2, 22);
  camera.lookAt(0, 0, 0);
  return camera;
}

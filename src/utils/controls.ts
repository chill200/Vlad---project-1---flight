import * as THREE from 'three';

function easeOutQuad(x: number) {
  return 1 - (1 - x) * (1 - x);
}

let lastMouseX = 0;
let jawVelocity = 0;
let turboUp = false;

window.addEventListener('mousemove', (event) => {
  const deltaX = event.clientX - lastMouseX;
  lastMouseX = event.clientX;

  jawVelocity = -deltaX * 0.003;
});

window.addEventListener('mousedown', () => {
  turboUp = true;
});

window.addEventListener('mouseup', () => {
  turboUp = false;
});

const maxVelocity = 0.04;
const planeSpeed = 0.006;
export let turbo = 0;

export function updatePlaneAxis(
  x: THREE.Vector3,
  y: THREE.Vector3,
  z: THREE.Vector3,
  planePosition: THREE.Vector3,
  camera: THREE.PerspectiveCamera,
) {
  jawVelocity *= 0.95;

  jawVelocity = Math.max(Math.min(jawVelocity, maxVelocity), -maxVelocity);

  // if (/ REST CONDITION /) {
  //   jawVelocity = 0;
  //   turbo = 0;
  //   x.set(1, 0, 0);
  //   y.set(0, 1, 0);
  //   z.set(0, 0, 1);
  //   planePosition.set(0, 3, 7);
  // }

  x.applyAxisAngle(z, jawVelocity);
  y.applyAxisAngle(z, jawVelocity);

  x.normalize();
  y.normalize();
  z.normalize();

  if (turboUp) {
    turbo += 0.025;
  } else {
    turbo *= 0.95;
  }
  turbo = Math.min(Math.max(turbo, 0), 1);

  const turboSpeed = easeOutQuad(turbo) * 0.02;

  camera.fov = 45 + turboSpeed * 900;
  camera.updateProjectionMatrix();

  planePosition.add(z.clone().multiplyScalar(-planeSpeed - turboSpeed));
}

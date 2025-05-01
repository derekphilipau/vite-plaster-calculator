export const sphereVolume = (r: number) => (4 / 3) * Math.PI * r ** 3;

export const coneVolume = (r: number, h: number) => (Math.PI * r ** 2 * h) / 3;

export const frustumVolume = (r: number, R: number, h: number) =>
  (Math.PI * h * (r ** 2 + r * R + R ** 2)) / 3;

export const cylinderVolume = (r: number, h: number) => Math.PI * r ** 2 * h;

export const tubeVolume = (d1: number, d2: number, h: number) =>
  Math.PI * ((d1 ** 2 - d2 ** 2) / 4) * h;

export const cubeVolume = (a: number) => a ** 3;

export const rectangularSolidVolume = (l: number, w: number, h: number) =>
  l * w * h;

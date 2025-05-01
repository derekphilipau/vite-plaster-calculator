export const calculateSphereVolume = (r: number) => (4 / 3) * Math.PI * r ** 3;

export const calculateConeVolume = (r: number, h: number) =>
  (Math.PI * r ** 2 * h) / 3;

export const calculateFrustumVolume = (r: number, R: number, h: number) =>
  (Math.PI * h * (r ** 2 + r * R + R ** 2)) / 3;

export const calculateCylinderVolume = (r: number, h: number) =>
  Math.PI * r ** 2 * h;

export const calculateTubeVolume = (d1: number, d2: number, h: number) =>
  Math.PI * ((d1 ** 2 - d2 ** 2) / 4) * h;

export const calculateCubeVolume = (a: number) => a ** 3;

export const calculateRectangularSolidVolume = (
  l: number,
  w: number,
  h: number
) => l * w * h;

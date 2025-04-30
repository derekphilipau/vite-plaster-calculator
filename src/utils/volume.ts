export const sphere = (r: number) => (4 / 3) * Math.PI * r ** 3;
export const cone = (r: number, h: number) => (Math.PI * r ** 2 * h) / 3;
export const frustum = (r: number, R: number, h: number) =>
  (Math.PI * h * (r ** 2 + r * R + R ** 2)) / 3;
export const cylinder = (r: number, h: number) => Math.PI * r ** 2 * h;
export const tube = (d1: number, d2: number, h: number) =>
  Math.PI * ((d1 ** 2 - d2 ** 2) / 4) * h;
export const cube = (a: number) => a ** 3;
export const block = (l: number, w: number, h: number) => l * w * h;

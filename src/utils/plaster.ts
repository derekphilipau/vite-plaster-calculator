export const poundsToGrams = (lb: number) => lb * 453.592;
export const quartsToGrams = (qt: number) => qt * 946.35295;
export const in3ToCm3 = (in3: number) => in3 * 16.387;
export const cm3ToIn3 = (cm3: number) => cm3 / 16.387;
export const in3ToFt3 = (in3: number) => in3 / 1728;
export const ft3ToIn3 = (ft3: number) => ft3 * 1728;

export const keithWater = (in3: number) => in3 * 11; // g
export const usgRatio = (cons: number) =>
  -0.00004 * cons ** 3 + 0.0154 * cons ** 2 - 2.23 * cons + 164.25;

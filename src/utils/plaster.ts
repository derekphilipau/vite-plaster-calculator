export const poundsToGrams = (lb: number) => lb * 453.592;
export const quartsToGrams = (qt: number) => qt * 946.35295; // Not currently used in Notes.tsx, but related
export const in3ToCm3 = (in3: number) => in3 * 16.387;
export const cm3ToIn3 = (cm3: number) => cm3 / 16.387;
export const in3ToFt3 = (in3: number) => in3 / 1728;
export const ft3ToIn3 = (ft3: number) => ft3 * 1728; // Not currently used in Notes.tsx, but related

// Keith Simpson
export const keithWaterGrams = (in3: number): number => in3 * 11;
export const keithPlasterGrams = (
  waterGrams: number,
  consistency: number
): number => waterGrams * (100 / consistency);

// USG
export const usgRatio = (consistency: number): number => {
  const raw =
    -0.00004 * Math.pow(consistency, 3) +
    0.0154 * Math.pow(consistency, 2) -
    2.23 * consistency +
    164.25;
  return Math.max(0, raw); // clamp at 0
};

export const usgPlasterPounds = (ratio: number, ft3: number): number =>
  ratio * ft3;
export const usgWaterPounds = (
  plasterPounds: number,
  consistency: number
): number => (plasterPounds * consistency) / 100;

// Andrew Martin
export const andrewWaterQuarts = (in3: number): number => in3 / 80;
export const andrewPlasterPounds = (waterQuarts: number): number =>
  waterQuarts * 3;

// Bivins/Campana
export const campanaWaterGrams = (cm3: number): number => cm3 * 0.6;
export const campanaPlasterGrams = (
  waterGrams: number,
  consistency: number
): number => waterGrams * (100 / consistency);

// Derek Au (empirical) – 15 000 g plaster produced 15 860 cm³
const DEREK_AU_PLASTER_PER_CM3 = 15000 / 15860; // ≈ 0.9457755 g / cm³
export const derekPlasterGrams = (cm3: number): number =>
  cm3 * DEREK_AU_PLASTER_PER_CM3;
export const derekWaterGrams = (
  plasterGrams: number,
  consistency: number
): number => (plasterGrams * consistency) / 100;

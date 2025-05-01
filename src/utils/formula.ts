// src/utils/formula.ts
/**
 * Domain-level plaster mixing formulas.
 * All inputs/outputs are raw numbers; calling sites own the units.
 */

// ─── Keith Simpson ──────────────────────────────────────────────────
export const keithWaterGrams = (in3: number): number => in3 * 11;
export const keithPlasterGrams = (waterGrams: number, consistency: number) =>
  waterGrams * (100 / consistency);

// ─── USG cubic regression ──────────────────────────────────────────
export const usgRatio = (consistency: number): number => {
  const raw =
    -0.00004 * Math.pow(consistency, 3) +
    0.0154 * Math.pow(consistency, 2) -
    2.23 * consistency +
    164.25;
  return Math.max(0, raw);
};
export const usgPlasterPounds = (ratio: number, ft3: number) => ratio * ft3;
export const usgWaterPounds = (plasterLb: number, consistency: number) =>
  (plasterLb * consistency) / 100;

// ─── Andrew Martin ─────────────────────────────────────────────────
export const andrewWaterQuarts = (in3: number) => in3 / 80;
export const andrewPlasterPounds = (waterQt: number) => waterQt * 3;

// ─── Bivins / Campana ──────────────────────────────────────────────
export const campanaWaterGrams = (cm3: number) => cm3 * 0.6;
export const campanaPlasterGrams = (waterG: number, consistency: number) =>
  waterG * (100 / consistency);

// ─── Derek Au empirical (cone-70 test mould) ───────────────────────
const DEREK_AU_PLASTER_PER_CM3 = 15000 / 15860; // ≈ 0.945 g / cm³
export const derekPlasterGrams = (cm3: number) =>
  cm3 * DEREK_AU_PLASTER_PER_CM3;
export const derekWaterGrams = (plasterG: number, consistency: number) =>
  (plasterG * consistency) / 100;

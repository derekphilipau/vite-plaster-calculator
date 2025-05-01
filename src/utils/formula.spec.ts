// src/utils/formula.spec.ts
import { describe, it, expect } from "vitest";
import {
  // Keith Simpson
  keithWaterGrams,
  keithPlasterGrams,
  // USG
  usgRatio,
  usgPlasterPounds,
  usgWaterPounds,
  // Andrew Martin
  andrewWaterQuarts,
  andrewPlasterPounds,
  // Bivins / Campana
  campanaWaterGrams,
  campanaPlasterGrams,
  // Derek Au
  derekPlasterGrams,
  derekWaterGrams,
} from "@/utils/formula";

describe("Keith Simpson formula", () => {
  it("1 in³ → 11 g water", () => {
    expect(keithWaterGrams(1)).toBe(11);
  });

  it("reverse-computes plaster grams for 70 % consistency", () => {
    const w = keithWaterGrams(50);
    expect(keithPlasterGrams(w, 70)).toBeCloseTo(785.71, 2);
  });
});

describe("USG cubic regression", () => {
  it("70 % consistency ≈ 69.89 ratio", () => {
    expect(usgRatio(70)).toBeCloseTo(69.89, 2);
  });

  it("clamps to zero for extremely high consistencies", () => {
    expect(usgRatio(300)).toBe(0);
  });

  it("derived plaster & water pounds stay > 0", () => {
    const ratio = usgRatio(70);
    const p = usgPlasterPounds(ratio, 0.25); // ¼ ft³
    const w = usgWaterPounds(p, 70);
    expect(p).toBeGreaterThan(0);
    expect(w).toBeGreaterThan(0);
  });
});

describe("Andrew Martin rule-of-thumb", () => {
  it("80 in³ → 1 qt water", () => {
    expect(andrewWaterQuarts(80)).toBe(1);
  });

  it("water qt × 3 → plaster lb", () => {
    expect(andrewPlasterPounds(1.5)).toBe(4.5);
  });
});

describe("Bivins / Campana approach", () => {
  it("cm³ → 0.6 × g water", () => {
    expect(campanaWaterGrams(100)).toBeCloseTo(60);
  });

  it("plaster grams from water for 70 % consistency", () => {
    const waterG = campanaWaterGrams(100);
    expect(campanaPlasterGrams(waterG, 70)).toBeCloseTo(85.71, 2);
  });
});

describe("Derek Au empirical fit", () => {
  it("100 cm³ → ≈ 94.58 g plaster", () => {
    expect(derekPlasterGrams(100)).toBeCloseTo(94.58, 2);
  });

  it("plaster to water @ 70 % consistency", () => {
    const p = derekPlasterGrams(100);
    expect(derekWaterGrams(p, 70)).toBeCloseTo(66.2, 2);
  });
});

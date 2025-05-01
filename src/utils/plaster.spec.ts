import { describe, it, expect } from "vitest";
import {
  keithWaterGrams,
  keithPlasterGrams,
  usgRatio,
  usgWaterPounds,
  usgPlasterPounds,
} from "@/utils/plaster";

describe("Keith Simpson formula", () => {
  it("1 cubic inch = 11 g water", () => {
    expect(keithWaterGrams(1)).toBe(11);
  });

  it("plaster grams reverse-computes", () => {
    const w = keithWaterGrams(50);
    expect(keithPlasterGrams(w, 70)).toBeCloseTo(785.71, 2);
  });
});

describe("USG cubic fit", () => {
  it("70% consistency ~69.89 ratio", () => {
    expect(usgRatio(70)).toBeCloseTo(69.89, 2);
  });

  it("clamps to zero for extreme consistencies", () => {
    expect(usgRatio(300)).toBe(0);
  });

  it("water & plaster pounds stay above 0", () => {
    const ratio = usgRatio(70);
    const p = usgPlasterPounds(ratio, 0.25); // ¼ ft³
    const w = usgWaterPounds(p, 70);
    expect(p).toBeGreaterThan(0);
    expect(w).toBeGreaterThan(0);
  });
});

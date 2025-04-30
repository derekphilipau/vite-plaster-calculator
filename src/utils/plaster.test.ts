// src/utils/plaster.test.ts
import { keithWater, usgRatio } from "./plaster";
import { expect, it } from "vitest";

it("Keith Simpson 1 in³ → 11 g water", () => {
  expect(keithWater(1)).toBe(11);
});

it("USG ratio behaves for 70 consistency", () => {
  expect(usgRatio(70)).toBeCloseTo(74.21, 2);
});

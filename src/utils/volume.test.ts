import { expect, it } from "vitest";
import { calculateSphereVolume } from "@/utils/volume";

it("sphere volume", () => {
  expect(calculateSphereVolume(1)).toBeCloseTo(4.18879, 5);
});

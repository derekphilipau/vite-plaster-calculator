import { expect, it } from "vitest";
import { sphere } from "@/utils/volume";

it("sphere volume", () => {
  expect(sphere(1)).toBeCloseTo(4.18879, 5);
});

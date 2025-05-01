import { describe, it, expect } from "vitest";
import * as vol from "@/utils/volume";

describe("volume formulas", () => {
  it.each([
    ["sphere", vol.sphereVolume(1), 4.1887],
    ["cone", vol.coneVolume(2, 4), 16.7551],
    ["cylinder", vol.cylinderVolume(2, 4), 50.2654],
    ["cube", vol.cubeVolume(3), 27],
    ["block", vol.rectangularSolidVolume(2, 3, 4), 24],
    ["frustum", vol.frustumVolume(2, 3, 5), 99.4838],
    ["tube", vol.tubeVolume(4, 2, 10), 94.2477],
  ])("%s()", (_, got, want) => {
    expect(got).toBeCloseTo(want, 3);
  });
});

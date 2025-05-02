import { describe, it, expect } from "vitest";
import { parseNumber } from "./utils";

describe("utils", () => {
  it.each([
    ["12,34", 12.34],
    ["1 234,56", 1234.56], // NBSP
    ["1.234.567,89", 1234567.89],
    ["1,234,567.89", 1234567.89],
    ["  7  ", 7],
    ["", NaN],
  ])("parseNumber(%s)", (raw, want) => {
    const got = parseNumber(raw);
    if (Number.isNaN(want)) {
      expect(got).toBeNaN();
    } else {
      expect(got).toBeCloseTo(want, 3);
    }
  });
});

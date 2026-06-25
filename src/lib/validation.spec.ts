import { describe, it, expect } from "vitest";
import { allPresent, positiveOnly, innerLessThanOuter } from "@/lib/validation";

describe("shared validators", () => {
  it("allPresent → true only when every field filled", () => {
    expect(allPresent({ a: "1", b: "2" })).toBe(true);
    expect(allPresent({ a: "1", b: "" })).toBe(false);
  });

  it("positiveOnly catches ≤0 numbers", () => {
    expect(positiveOnly({ a: "1", b: "-2" })).toBe(
      "VolumeCalculator.dimensionsError"
    );
    expect(positiveOnly({ a: "2", b: "3" })).toBeNull();
    expect(positiveOnly({ a: "2,5", b: "3.5" })).toBeNull();
  });

  it("inner < outer rule for tubes", () => {
    expect(innerLessThanOuter("10", "9")).toBeNull();
    expect(innerLessThanOuter("10,5", "9,5")).toBeNull();
    expect(innerLessThanOuter("10", "10")).toBe(
      "VolumeCalculator.d2LessThanD1"
    );
  });
});

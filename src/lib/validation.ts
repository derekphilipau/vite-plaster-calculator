import { parseNumber } from "@/lib/utils";

export function allPresent(obj: Record<string, string>): boolean {
  return Object.values(obj).every((v) => v.trim() !== "");
}

export function positiveOnly(obj: Record<string, string>): string | null {
  for (const v of Object.values(obj)) {
    if (!v) continue;
    const n = parseNumber(v);
    if (!Number.isFinite(n) || n <= 0) {
      return "VolumeCalculator.dimensionsError";
    }
  }
  return null;
}

export function isPositive(n: unknown): n is number {
  return typeof n === "number" && Number.isFinite(n) && n > 0;
}

export function innerLessThanOuter(
  outer: string,
  inner: string
): string | null {
  if (!outer || !inner) return null;
  return parseNumber(inner) < parseNumber(outer)
    ? null
    : "VolumeCalculator.d2LessThanD1";
}

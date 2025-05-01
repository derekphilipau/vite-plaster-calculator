export function allPresent(obj: Record<string, string>): boolean {
  return Object.values(obj).every((v) => v.trim() !== "");
}

export function positiveOnly(obj: Record<string, string>): string | null {
  for (const v of Object.values(obj)) {
    if (!v) continue; // blank handled by allPresent
    if (Number(v) <= 0) return "VolumeCalculator.dimensionsError";
  }
  return null;
}

export function innerLessThanOuter(
  outer: string,
  inner: string
): string | null {
  if (!outer || !inner) return null;
  return Number(inner) < Number(outer) ? null : "VolumeCalculator.d2LessThanD1";
}

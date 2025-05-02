import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(n: number, precision = 2) {
  return n.toLocaleString(undefined, {
    minimumFractionDigits: precision,
    maximumFractionDigits: precision,
  });
}

/**
 * Locale-tolerant number parser.
 *
 * • Accepts either **comma** or **dot** as the decimal separator.
 * • Strips thousands separators (comma, dot, space, narrow-NBSP, ’).
 * • Returns `NaN` for the empty string or junk.
 */
export function parseNumber(raw: string): number {
  const s = raw.trim().replace(/\u202F/g, " "); // narrow NBSP → space
  if (s === "") return NaN;

  const hasComma = s.includes(",");
  const hasDot = s.includes(".");

  // decide which char is the *decimal* separator
  let decimalSep: "," | "." | null = null;
  if (hasComma && hasDot) {
    decimalSep = s.lastIndexOf(",") > s.lastIndexOf(".") ? "," : ".";
  } else if (hasComma) {
    decimalSep = ",";
  } else if (hasDot) {
    decimalSep = ".";
  }

  let cleaned = s.replace(/[\s']/g, ""); // strip spaces & apostrophes used in CH/FR notation

  if (decimalSep === ",") {
    cleaned = cleaned.replace(/\./g, "").replace(",", ".");
  } else if (decimalSep === ".") {
    cleaned = cleaned.replace(/,/g, "");
  } else {
    cleaned = cleaned.replace(/[.,]/g, "");
  }

  return Number(cleaned);
}

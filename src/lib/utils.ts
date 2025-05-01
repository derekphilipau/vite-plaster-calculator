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
 * Parse a user-entered/echoed number safely.
 * Strips common thousands-separators so Number() never returns NaN.
 */
export function parseNumber(raw: string): number {
  return Number(raw.replace(/,/g, "").replace(/\s+/g, ""));
}

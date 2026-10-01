import type { CompactAmountParts } from "@/types/dashboard-home.types";

/**
 * Separa un importe compacto en cifra y unidad («$18,6 M» → «$18,6» y «M») para
 * pintar la unidad más pequeña, como en el diseño. Sin unidad, la deja vacía.
 */
export function splitCompactAmount(formatted: string): CompactAmountParts {
  const lastSpace = formatted.lastIndexOf(" ");

  if (lastSpace === -1) return { value: formatted, unit: "" };

  return { value: formatted.slice(0, lastSpace), unit: formatted.slice(lastSpace + 1) };
}

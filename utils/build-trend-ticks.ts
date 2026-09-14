import { SHORT_MONTHS } from "@/utils/format-job-period";

/** Etiquetas del eje horizontal; cinco caben sin amontonarse a cualquier ancho. */
export const TREND_TICK_COUNT = 5;

/** `2026-07-01` → `1 jul`, como escribe el eje del diseño. */
function withMonth(date: string): string {
  const [, month, day] = date.split("-").map(Number);

  return `${day} ${(SHORT_MONTHS[month - 1] ?? "").toLowerCase()}`;
}

/**
 * Reparte las etiquetas de extremo a extremo de la serie. Solo la primera lleva
 * mes: repetirlo en las cinco satura un eje que ya se lee por posición.
 */
export function buildTrendTicks(dates: string[]): string[] {
  if (dates.length === 0) return [];

  const total = Math.min(TREND_TICK_COUNT, dates.length);
  const step = total > 1 ? (dates.length - 1) / (total - 1) : 0;

  return Array.from({ length: total }, (_, index) => {
    const date = dates[Math.round(index * step)];

    return index === 0 ? withMonth(date) : String(Number(date.slice(8, 10)));
  });
}

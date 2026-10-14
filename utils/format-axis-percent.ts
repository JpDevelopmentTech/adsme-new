import { formatPercent } from "@/utils/format-percent";

/** Rótulo de un eje en porcentaje: `20%` si es entero, `6,7%` si no. */
export function formatAxisPercent(value: number): string {
  return Number.isInteger(value) ? `${value}%` : formatPercent(value);
}

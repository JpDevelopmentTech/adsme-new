import { formatShortDate } from "@/utils/format-job-period";

/** Rótulo de la marca de hoy en la gráfica del período: «Hoy · 01 Oct». */
export function formatTodayLabel(today: string): string {
  return `Hoy · ${formatShortDate(today)}`;
}

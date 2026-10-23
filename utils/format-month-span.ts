import { formatMonthLong, formatMonthTick } from "@/utils/format-nomina-dates";

/** Rango junto al botón del periodo: «Octubre 2026» si es un mes, «May 26 – Oct 26» si son varios. */
export function formatMonthSpan(fromMonth: string, toMonth: string): string {
  return fromMonth === toMonth ? formatMonthLong(fromMonth) : `${formatMonthTick(fromMonth)} – ${formatMonthTick(toMonth)}`;
}

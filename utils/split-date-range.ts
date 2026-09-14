import type { DailyRange } from "@/domain/entities/campaign-daily";
import { shiftIsoDate } from "@/utils/shift-iso-date";

/**
 * Parte un rango de fechas en tramos de como mucho `maxDays` días. Las APIs de
 * informes acotan cuánto período admite una sola consulta, así que un histórico
 * largo hay que pedirlo encadenando ventanas.
 */
export function splitDateRange(
  from: string,
  to: string,
  maxDays: number,
): DailyRange[] {
  const windows: DailyRange[] = [];

  for (let start = from; start <= to; start = shiftIsoDate(start, maxDays)) {
    const end = shiftIsoDate(start, maxDays - 1);

    windows.push({ from: start, to: end < to ? end : to });
  }

  return windows;
}

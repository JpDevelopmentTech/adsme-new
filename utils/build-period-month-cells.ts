import { PERIOD_MONTHS } from "@/constants/nomina-period.constants";
import type { PeriodMonthCell } from "@/types/nomina-period.types";

/** Los 12 meses de un año con su tono según el rango `[from, to]` y el mes en curso marcado. */
export function buildPeriodMonthCells(year: number, from: string, to: string, currentMonth: string): PeriodMonthCell[] {
  return PERIOD_MONTHS.map((label, index) => {
    const month = `${year}-${String(index + 1).padStart(2, "0")}`;
    const tone = month === from || month === to ? "edge" : month > from && month < to ? "inside" : "idle";
    return { month, label, tone, isCurrent: month === currentMonth };
  });
}

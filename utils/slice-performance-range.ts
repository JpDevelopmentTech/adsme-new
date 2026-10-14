import type { NominaDailyPoint } from "@/domain/entities/nomina-bucket";
import type { PerformanceRange } from "@/types/nomina-chart.types";

/** Meses calendario completos que muestra cada rango, contando el mes en curso. */
const MONTHS_BY_RANGE: Record<Exclude<PerformanceRange, "Todo">, number> = { "1M": 1, "3M": 3, "6M": 6, "1A": 12 };

/** Primer mes `AAAA-MM` de un rango que termina en `currentMonth`. */
function firstMonth(currentMonth: string, months: number): string {
  const [year, month] = currentMonth.split("-").map(Number);
  const date = new Date(year, month - months, 1);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

/** Recorta la serie diaria al rango elegido; «Todo» la deja completa. */
export function slicePerformanceRange(points: NominaDailyPoint[], range: PerformanceRange, currentMonth: string): NominaDailyPoint[] {
  if (range === "Todo") return points;
  const from = firstMonth(currentMonth, MONTHS_BY_RANGE[range]);
  return points.filter((point) => point.date.slice(0, 7) >= from);
}

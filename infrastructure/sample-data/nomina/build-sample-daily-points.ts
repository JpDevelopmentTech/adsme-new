import type { NominaDailyPoint } from "@/domain/entities/nomina-bucket";
import type { NominaMovement } from "@/domain/entities/nomina-movement";
import type { NominaCalendar } from "@/infrastructure/sample-data/nomina/sample-nomina.types";
import { isoDay } from "@/infrastructure/sample-data/nomina/sample-show-dates";

/**
 * Serie diaria por Fecha de Ingreso de todos los meses de muestra, con los días
 * sin ingresos a cero para que la curva no salte entre fechas.
 */
export function buildSampleDailyPoints(movements: NominaMovement[], calendar: NominaCalendar): NominaDailyPoint[] {
  const byDay = new Map<string, NominaDailyPoint>();

  for (const month of calendar.months) {
    const [year, monthIndex] = month.split("-").map(Number);
    const days = new Date(year, monthIndex, 0).getDate();
    for (let day = 1; day <= days; day += 1) {
      const date = isoDay(month, day);
      byDay.set(date, { date, income: 0, profit: 0, service: 0 });
    }
  }

  for (const movement of movements) {
    const point = byDay.get(movement.incomeDate);
    if (!point) continue;
    point.income += movement.amount;
    point.profit += movement.split.profit;
    point.service += movement.split.service;
  }

  return [...byDay.values()];
}

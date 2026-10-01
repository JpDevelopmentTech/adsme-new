import type { DashboardPeriod } from "@/domain/entities/dashboard-period";
import { daysBetween } from "@/utils/month-range";
import { shiftIsoDate } from "@/utils/shift-iso-date";

/** Todas las fechas del período en orden, con ambos extremos incluidos. */
export function listPeriodDates(period: DashboardPeriod): string[] {
  return Array.from({ length: daysBetween(period.from, period.to) }, (_, index) =>
    shiftIsoDate(period.from, index),
  );
}

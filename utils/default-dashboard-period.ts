import type { DashboardPeriod } from "@/domain/entities/dashboard-period";
import { endOfMonth, startOfMonth } from "@/utils/month-range";

/** Período con el que abre el dashboard: el mes en curso, del día 1 al último. */
export function defaultDashboardPeriod(now: Date): DashboardPeriod {
  return { from: startOfMonth(now), to: endOfMonth(now) };
}

import { DASHBOARD_PERIOD_PRESETS } from "@/constants/dashboard-period.constants";
import { DASHBOARD_ROUTE } from "@/constants/routes.constants";
import type { DashboardPeriod } from "@/domain/entities/dashboard-period";
import type {
  DashboardPresetKey,
  DashboardPresetOption,
} from "@/types/dashboard-period.types";
import { defaultDashboardPeriod } from "@/utils/default-dashboard-period";
import { endOfMonth, startOfMonth, toIsoDate } from "@/utils/month-range";
import { periodHref } from "@/utils/period-href";
import { shiftIsoDate } from "@/utils/shift-iso-date";

/** Últimos `days` días hasta hoy, ambos incluidos. */
function lastDays(today: string, days: number): DashboardPeriod {
  return { from: shiftIsoDate(today, -(days - 1)), to: today };
}

function resolve(key: DashboardPresetKey, now: Date): DashboardPeriod {
  const today = toIsoDate(now);
  const previousMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

  switch (key) {
    case "this-month":
      return defaultDashboardPeriod(now);
    case "last-month":
      return { from: startOfMonth(previousMonth), to: endOfMonth(previousMonth) };
    case "last-30":
      return lastDays(today, 30);
    case "last-90":
      return lastDays(today, 90);
  }
}

/**
 * Períodos rápidos resueltos a fechas de hoy. «Este mes» enlaza al dashboard
 * sin parámetros: es el período por defecto y así funciona como reinicio.
 */
export function buildPeriodPresets(now: Date): DashboardPresetOption[] {
  return DASHBOARD_PERIOD_PRESETS.map(({ key, label }) => {
    const period = resolve(key, now);

    return {
      key,
      label,
      period,
      href: periodHref(DASHBOARD_ROUTE, {}, key === "this-month" ? null : period),
    };
  });
}

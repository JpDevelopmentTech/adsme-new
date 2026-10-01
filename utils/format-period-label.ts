import type { DashboardPeriod } from "@/domain/entities/dashboard-period";
import { formatJobPeriod, formatShortDate } from "@/utils/format-job-period";
import { formatMonthName } from "@/utils/format-month-name";
import { endOfMonth } from "@/utils/month-range";

/** Primer día del mes del período como `Date` local, para nombrar el mes. */
function monthOf(period: DashboardPeriod): Date {
  const [year, month] = period.from.split("-").map(Number);

  return new Date(year, month - 1, 1);
}

/**
 * Rótulo del período para cabeceras y subtítulos. Un mes natural completo se
 * llama por su nombre («Octubre»), como hasta ahora; cualquier otro lapso se
 * escribe con sus extremos («15 Sep–14 Oct»). El año solo aparece cuando no es
 * el actual o cuando el período cruza de un año a otro.
 */
export function formatPeriodLabel(
  period: DashboardPeriod,
  currentYear: number,
): string {
  const fromYear = Number(period.from.slice(0, 4));
  const toYear = Number(period.to.slice(0, 4));

  if (fromYear !== toYear) {
    return `${formatShortDate(period.from)} ${fromYear}–${formatShortDate(period.to)} ${toYear}`;
  }

  const month = monthOf(period);
  const isFullMonth = period.from.endsWith("-01") && period.to === endOfMonth(month);
  const label = isFullMonth
    ? formatMonthName(month)
    : formatJobPeriod(period.from, period.to);

  return fromYear === currentYear ? label : `${label} ${fromYear}`;
}

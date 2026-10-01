import type { CampaignDailyPoint } from "@/domain/entities/campaign-daily";
import type { PeriodSpend, SpendDay } from "@/domain/entities/dashboard";
import type { DashboardPeriod } from "@/domain/entities/dashboard-period";
import type { JobListing } from "@/domain/entities/job-listing";
import { buildPlannedSpendDays } from "@/utils/build-planned-spend-days";
import { formatPeriodLabel } from "@/utils/format-period-label";
import { groupDailySpend, type RealSpendDay } from "@/utils/group-daily-spend";

/** Sustituye el reparto planificado de un día por lo que se gastó de verdad. */
function toRealDay(day: SpendDay, real: RealSpendDay): SpendDay {
  return {
    ...day,
    source: "real",
    byPlatform: real.byPlatform,
    // Sin plataforma no hay gasto real: cada campaña llega por su conexión.
    unassigned: 0,
    total: real.total,
  };
}

function sum(days: SpendDay[]): number {
  return days.reduce((total, day) => total + day.total, 0);
}

/**
 * Inversión día a día del período: gasto real hasta hoy y plan a partir de
 * mañana. Un día ya transcurrido del que no llegó ningún dato conserva su
 * reparto planificado, porque «no importado» no es lo mismo que «no gastado».
 */
export function buildPeriodSpend(
  jobs: JobListing[],
  daily: CampaignDailyPoint[],
  period: DashboardPeriod,
  today: string,
): PeriodSpend {
  const realByDate = groupDailySpend(daily);

  const days = buildPlannedSpendDays(jobs, period, today).map((day) => {
    const real = realByDate.get(day.date);

    return day.state !== "pending" && real ? toRealDay(day, real) : day;
  });
  const elapsed = days.filter((day) => day.state !== "pending");

  return {
    label: formatPeriodLabel(period, Number(today.slice(0, 4))),
    totalDays: days.length,
    elapsedDays: elapsed.length,
    today: days.some((day) => day.state === "today") ? today : null,
    days,
    planned: sum(days),
    spent: sum(days.filter((day) => day.source === "real")),
    toDate: sum(elapsed),
    peakAmount: Math.max(0, ...days.map((day) => day.total)),
    hasUnassigned: days.some((day) => day.unassigned > 0),
    hasReal: days.some((day) => day.source === "real"),
  };
}

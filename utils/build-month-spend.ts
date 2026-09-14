import type { CampaignDailyPoint } from "@/domain/entities/campaign-daily";
import type { MonthSpend, SpendDay } from "@/domain/entities/dashboard";
import type { JobListing } from "@/domain/entities/job-listing";
import { buildPlannedSpendDays } from "@/utils/build-planned-spend-days";
import { formatMonthName } from "@/utils/format-month-name";
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

/**
 * Inversión día a día del mes en curso: gasto real hasta hoy y plan a partir de
 * mañana. Un día ya transcurrido del que no llegó ningún dato conserva su
 * reparto planificado, porque «no importado» no es lo mismo que «no gastado».
 */
export function buildMonthSpend(
  jobs: JobListing[],
  daily: CampaignDailyPoint[],
  now: Date,
): MonthSpend {
  const realByDay = groupDailySpend(daily);

  const days = buildPlannedSpendDays(jobs, now).map((day) => {
    const real = realByDay.get(day.day);

    return day.state !== "pending" && real ? toRealDay(day, real) : day;
  });

  return {
    monthLabel: formatMonthName(now),
    daysInMonth: days.length,
    today: now.getDate(),
    days,
    planned: days.reduce((sum, day) => sum + day.total, 0),
    spent: days
      .filter((day) => day.source === "real")
      .reduce((sum, day) => sum + day.total, 0),
    toDate: days
      .filter((day) => day.state !== "pending")
      .reduce((sum, day) => sum + day.total, 0),
    peakAmount: Math.max(...days.map((day) => day.total)),
    hasUnassigned: days.some((day) => day.unassigned > 0),
    hasReal: days.some((day) => day.source === "real"),
  };
}

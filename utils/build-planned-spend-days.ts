import type { DashboardPeriod } from "@/domain/entities/dashboard-period";
import type { SpendDay, SpendDayState } from "@/domain/entities/dashboard";
import type { JobPlatform } from "@/domain/entities/job";
import type { JobListing } from "@/domain/entities/job-listing";
import { listPeriodDates } from "@/utils/list-period-dates";
import { daysBetween } from "@/utils/month-range";
import { overlapsPeriod } from "@/utils/overlaps-period";

function emptySplit(): Record<JobPlatform, number> {
  return { youtube: 0, meta: 0, tiktok: 0 };
}

function stateOf(date: string, today: string): SpendDayState {
  if (date < today) return "past";

  return date === today ? "today" : "pending";
}

/** Suma el reparto del trabajo a los días del período que cubre su pauta. */
function allocate(job: JobListing, days: SpendDay[]): void {
  const perDay = job.investment / daysBetween(job.startsOn, job.endsOn);
  const perPlatform =
    job.platforms.length > 0 ? perDay / job.platforms.length : 0;

  for (const day of days) {
    if (day.date < job.startsOn || day.date > job.endsOn) continue;

    for (const platform of job.platforms) {
      day.byPlatform[platform] += perPlatform;
    }

    if (job.platforms.length === 0) day.unassigned += perDay;
    day.total += perDay;
  }
}

/**
 * Plan diario del período: reparte cada trabajo a partes iguales entre los días
 * de su pauta y entre sus plataformas, y se queda con los que caen dentro. Es
 * lo comprometido, no lo gastado; el gasto real lo aporta la serie importada.
 */
export function buildPlannedSpendDays(
  jobs: JobListing[],
  period: DashboardPeriod,
  today: string,
): SpendDay[] {
  const days: SpendDay[] = listPeriodDates(period).map((date) => ({
    date,
    state: stateOf(date, today),
    source: "planned",
    byPlatform: emptySplit(),
    unassigned: 0,
    total: 0,
  }));

  for (const job of jobs) {
    if (job.investment <= 0 || !overlapsPeriod(job, period)) continue;

    allocate(job, days);
  }

  return days;
}

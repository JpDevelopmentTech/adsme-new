import type { SpendDay, SpendDayState } from "@/domain/entities/dashboard";
import type { JobPlatform } from "@/domain/entities/job";
import type { JobListing } from "@/domain/entities/job-listing";
import { dayOfMonth, daysBetween, daysInMonth, endOfMonth, startOfMonth } from "@/utils/month-range";

function emptySplit(): Record<JobPlatform, number> {
  return { youtube: 0, meta: 0, tiktok: 0 };
}

function stateOf(day: number, today: number): SpendDayState {
  if (day < today) return "past";

  return day === today ? "today" : "pending";
}

/** Suma el reparto del trabajo a los días del mes que cubre su período. */
function allocate(job: JobListing, days: SpendDay[], reference: Date): void {
  const perDay = job.investment / daysBetween(job.startsOn, job.endsOn);
  const perPlatform =
    job.platforms.length > 0 ? perDay / job.platforms.length : 0;

  for (const day of days) {
    const iso = dayOfMonth(reference, day.day);
    if (iso < job.startsOn || iso > job.endsOn) continue;

    for (const platform of job.platforms) {
      day.byPlatform[platform] += perPlatform;
    }

    if (job.platforms.length === 0) day.unassigned += perDay;
    day.total += perDay;
  }
}

/**
 * Plan diario del mes: reparte cada trabajo a partes iguales entre los días de
 * su período y entre sus plataformas. Es lo comprometido, no lo gastado; el
 * gasto real lo aporta la serie diaria importada de cada plataforma.
 */
export function buildPlannedSpendDays(
  jobs: JobListing[],
  now: Date,
): SpendDay[] {
  const today = now.getDate();
  const monthStart = startOfMonth(now);
  const monthEnd = endOfMonth(now);

  const days: SpendDay[] = Array.from(
    { length: daysInMonth(now) },
    (_, index) => ({
      day: index + 1,
      state: stateOf(index + 1, today),
      source: "planned" as const,
      byPlatform: emptySplit(),
      unassigned: 0,
      total: 0,
    }),
  );

  for (const job of jobs) {
    if (job.investment <= 0) continue;
    if (job.startsOn > monthEnd || job.endsOn < monthStart) continue;

    allocate(job, days, now);
  }

  return days;
}

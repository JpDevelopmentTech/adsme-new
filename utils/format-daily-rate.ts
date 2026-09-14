import { JOBS_COPY } from "@/constants/jobs.constants";
import type { JobListing } from "@/domain/entities/job-listing";
import { formatCompactCurrency } from "@/utils/format-compact-currency";
import { daysBetween } from "@/utils/month-range";

/**
 * Inversión repartida entre los días del período (`$400 K/día`). Es lo que hace
 * comparables dos pautas de duración distinta; sin importe no hay nada que decir.
 */
export function formatDailyRate(job: JobListing): string | null {
  if (job.investment <= 0) return null;

  const perDay = job.investment / daysBetween(job.startsOn, job.endsOn);

  return `${formatCompactCurrency(Math.round(perDay))}${JOBS_COPY.perDay}`;
}

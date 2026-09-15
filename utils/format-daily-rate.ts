import type { JobListing } from "@/domain/entities/job-listing";
import { formatDailyAmount } from "@/utils/format-daily-amount";

/** Reparto diario de la inversión de un trabajo del listado. */
export function formatDailyRate(job: JobListing): string | null {
  return formatDailyAmount(job.investment, job.startsOn, job.endsOn);
}

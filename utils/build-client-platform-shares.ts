import { PLATFORM_ORDER } from "@/constants/platform-labels.constants";
import type {
  ClientJobSummary,
  ClientPlatformShare,
} from "@/domain/entities/client-listing";
import { share } from "@/utils/format-compact-number";
import { isJobInMonth } from "@/utils/is-job-in-month";
import { splitJobInvestment } from "@/utils/split-job-investment";

/**
 * Reparto de la inversión del mes de un cliente entre las tres plataformas.
 * Los porcentajes se calculan sobre lo repartido, así que los trabajos sin
 * plataforma vinculada no los distorsionan.
 */
export function buildClientPlatformShares(
  jobs: ClientJobSummary[],
  now: Date,
): ClientPlatformShare[] {
  const monthJobs = jobs.filter((job) => isJobInMonth(job, now));

  const amounts = PLATFORM_ORDER.map((platform) =>
    monthJobs
      .filter((job) => job.platforms.includes(platform))
      .reduce((total, job) => total + splitJobInvestment(job), 0),
  );
  const assigned = amounts.reduce((total, amount) => total + amount, 0);

  return PLATFORM_ORDER.map((platform, index) => ({
    platform,
    amount: amounts[index],
    percent: share(amounts[index], assigned),
  }));
}

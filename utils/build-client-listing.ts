import type {
  ClientListing,
  ClientRecord,
} from "@/domain/entities/client-listing";
import { buildClientPlatformShares } from "@/utils/build-client-platform-shares";
import { isJobInMonth } from "@/utils/is-job-in-month";

/**
 * Añade al cliente lo que la tarjeta de `B2` calcula sobre el mes en curso.
 * Los trabajos se descartan al salir: el listado ya no los necesita.
 */
export function buildClientListing(
  record: ClientRecord,
  now: Date,
): ClientListing {
  const { jobs, ...client } = record;

  return {
    ...client,
    monthInvestment: jobs
      .filter((job) => isJobInMonth(job, now))
      .reduce((total, job) => total + job.investment, 0),
    platformShares: buildClientPlatformShares(jobs, now),
    activeCampaigns: jobs
      .filter((job) => job.status === "active")
      .reduce((total, job) => total + job.platforms.length, 0),
  };
}

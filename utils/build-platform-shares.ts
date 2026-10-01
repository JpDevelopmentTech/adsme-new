import {
  CONNECTION_OF_PLATFORM,
  PLATFORM_ORDER,
} from "@/constants/platform-labels.constants";
import type { Connection } from "@/domain/entities/connection";
import type { PlatformShare } from "@/domain/entities/dashboard";
import type { DashboardPeriod } from "@/domain/entities/dashboard-period";
import type { JobPlatform } from "@/domain/entities/job";
import type { JobListing } from "@/domain/entities/job-listing";
import { share } from "@/utils/format-compact-number";
import { overlapsPeriod } from "@/utils/overlaps-period";
import { tokenDaysLeft } from "@/utils/token-days-left";
import { worstConnection } from "@/utils/worst-connection";

/** Inversión del período que corresponde a cada plataforma del trabajo. */
function splitInvestment(job: JobListing): number {
  return job.platforms.length > 0 ? job.investment / job.platforms.length : 0;
}

/**
 * Conexión que representa a la plataforma. Con varias cuentas se queda con la
 * que peor está: basta una caída para que el reparto deje de cuadrar.
 */
function findConnection(
  connections: Connection[],
  platform: JobPlatform,
): Connection | undefined {
  return worstConnection(
    connections.filter(
      (item) => item.platform === CONNECTION_OF_PLATFORM[platform],
    ),
  );
}

/**
 * Reparto de la inversión del período entre las tres plataformas, junto al estado
 * de la conexión que alimenta cada una. Los porcentajes se calculan sobre lo
 * repartido, así que los trabajos sin plataforma no los distorsionan.
 */
export function buildPlatformShares(
  jobs: JobListing[],
  connections: Connection[],
  period: DashboardPeriod,
  now: Date,
): PlatformShare[] {
  const periodJobs = jobs.filter((job) => overlapsPeriod(job, period));

  const amounts = PLATFORM_ORDER.map((platform) =>
    periodJobs
      .filter((job) => job.platforms.includes(platform))
      .reduce((total, job) => total + splitInvestment(job), 0),
  );
  const assigned = amounts.reduce((total, amount) => total + amount, 0);

  return PLATFORM_ORDER.map((platform, index) => {
    const connection = findConnection(connections, platform);

    return {
      platform,
      amount: amounts[index],
      percent: share(amounts[index], assigned),
      activeJobs: jobs.filter(
        (job) => job.status === "active" && job.platforms.includes(platform),
      ).length,
      connected: connection?.status === "conectado",
      tokenExpiresInDays: tokenDaysLeft(connection, now),
    };
  });
}

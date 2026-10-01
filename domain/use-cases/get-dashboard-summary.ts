import { DEFAULT_CLIENT_LIST_QUERY } from "@/domain/entities/client-query";
import type { Connection } from "@/domain/entities/connection";
import type { DashboardSummary } from "@/domain/entities/dashboard";
import type { DashboardPeriod } from "@/domain/entities/dashboard-period";
import { DEFAULT_JOB_LIST_QUERY } from "@/domain/entities/job-query";
import type { CampaignDailyReader } from "@/domain/interfaces/campaign-daily-reader";
import type { ClientRepository } from "@/domain/interfaces/client-repository";
import type { ConnectionReader } from "@/domain/interfaces/connection-reader";
import type { JobRepository } from "@/domain/interfaces/job-repository";
import { buildDashboardAlerts } from "@/utils/build-dashboard-alerts";
import { buildDashboardMetrics } from "@/utils/build-dashboard-metrics";
import { buildPeriodSpend } from "@/utils/build-period-spend";
import { buildPlatformShares } from "@/utils/build-platform-shares";
import { toIsoDate } from "@/utils/month-range";
import { overlapsPeriod } from "@/utils/overlaps-period";

/** Sincronización más reciente entre todas las conexiones. */
function lastSyncOf(connections: Connection[]): string | null {
  return connections
    .map((connection) => connection.lastSyncedAt)
    .filter((value): value is string => value !== null)
    .sort()
    .at(-1) ?? null;
}

/**
 * Caso de uso: reunir todo lo que muestra el dashboard general (`B1`) para un
 * período. Las cifras, la inversión diaria y los trabajos se recortan a él;
 * las alertas y la última sincronización describen el estado de hoy.
 */
export function createGetDashboardSummary(
  clientRepository: ClientRepository,
  jobRepository: JobRepository,
  connectionReader: ConnectionReader,
  dailyReader: CampaignDailyReader,
) {
  return async function getDashboardSummary(
    now: Date,
    period: DashboardPeriod,
  ): Promise<DashboardSummary> {
    const [clients, jobs, connections, daily] = await Promise.all([
      clientRepository.listClients(DEFAULT_CLIENT_LIST_QUERY),
      jobRepository.listJobs(DEFAULT_JOB_LIST_QUERY),
      connectionReader.listConnections(),
      dailyReader.listDailyPoints(period),
    ]);
    const periodJobs = jobs.filter((job) => overlapsPeriod(job, period));

    return {
      metrics: buildDashboardMetrics(clients, periodJobs, daily),
      periodJobs,
      alerts: buildDashboardAlerts(jobs, connections, now),
      spend: buildPeriodSpend(jobs, daily, period, toIsoDate(now)),
      platforms: buildPlatformShares(jobs, connections, period, now),
      lastSyncedAt: lastSyncOf(connections),
    };
  };
}

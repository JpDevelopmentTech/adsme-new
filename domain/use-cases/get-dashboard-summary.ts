import { DEFAULT_CAMPAIGN_LIST_QUERY } from "@/domain/entities/campaign";
import { DEFAULT_CLIENT_LIST_QUERY } from "@/domain/entities/client-query";
import type { Connection } from "@/domain/entities/connection";
import type { DashboardSummary } from "@/domain/entities/dashboard";
import { DEFAULT_JOB_LIST_QUERY } from "@/domain/entities/job-query";
import type { CampaignDailyReader } from "@/domain/interfaces/campaign-daily-reader";
import type { CampaignRepository } from "@/domain/interfaces/campaign-repository";
import type { ClientRepository } from "@/domain/interfaces/client-repository";
import type { ConnectionReader } from "@/domain/interfaces/connection-reader";
import type { JobRepository } from "@/domain/interfaces/job-repository";
import { buildDashboardAlerts } from "@/utils/build-dashboard-alerts";
import { buildDashboardMetrics } from "@/utils/build-dashboard-metrics";
import { buildMonthSpend } from "@/utils/build-month-spend";
import { buildPlatformShares } from "@/utils/build-platform-shares";
import { endOfMonth, startOfMonth } from "@/utils/month-range";

/** Sincronización más reciente entre todas las conexiones. */
function lastSyncOf(connections: Connection[]): string | null {
  return connections
    .map((connection) => connection.lastSyncedAt)
    .filter((value): value is string => value !== null)
    .sort()
    .at(-1) ?? null;
}

/** Caso de uso: reunir todo lo que muestra el dashboard general (`B1`). */
export function createGetDashboardSummary(
  clientRepository: ClientRepository,
  jobRepository: JobRepository,
  campaignRepository: CampaignRepository,
  connectionReader: ConnectionReader,
  dailyReader: CampaignDailyReader,
) {
  return async function getDashboardSummary(
    now: Date,
  ): Promise<DashboardSummary> {
    const [clients, jobs, campaigns, connections, daily] = await Promise.all([
      clientRepository.listClients(DEFAULT_CLIENT_LIST_QUERY),
      jobRepository.listJobs(DEFAULT_JOB_LIST_QUERY),
      campaignRepository.listCampaigns(DEFAULT_CAMPAIGN_LIST_QUERY),
      connectionReader.listConnections(),
      dailyReader.listDailyPoints({
        from: startOfMonth(now),
        to: endOfMonth(now),
      }),
    ]);

    return {
      metrics: buildDashboardMetrics(clients, jobs, campaigns, now),
      activeJobs: jobs.filter((job) => job.status === "active"),
      alerts: buildDashboardAlerts(jobs, connections, now),
      monthSpend: buildMonthSpend(jobs, daily, now),
      platforms: buildPlatformShares(jobs, connections, now),
      lastSyncedAt: lastSyncOf(connections),
    };
  };
}

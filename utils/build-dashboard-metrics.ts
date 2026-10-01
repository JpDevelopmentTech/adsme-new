import type { CampaignDailyPoint } from "@/domain/entities/campaign-daily";
import type { Client } from "@/domain/entities/client";
import type { DashboardMetrics } from "@/domain/entities/dashboard";
import type { JobListing } from "@/domain/entities/job-listing";

/**
 * Calcula las cifras de contexto del dashboard para el período. `periodJobs`
 * son los trabajos cuya pauta lo toca y `daily` la serie diaria de sus días.
 * Con volúmenes grandes esto debería convertirse en agregados SQL.
 */
export function buildDashboardMetrics(
  clients: Client[],
  periodJobs: JobListing[],
  daily: CampaignDailyPoint[],
): DashboardMetrics {
  return {
    clientsTotal: clients.length,
    clientsInPeriod: new Set(periodJobs.map((job) => job.clientId)).size,
    jobsInPeriod: periodJobs.length,
    campaignsInPeriod: periodJobs.reduce(
      (total, job) => total + job.platforms.length,
      0,
    ),
    jobsWithoutPlatforms: periodJobs.filter((job) => job.platforms.length === 0)
      .length,
    viewsInPeriod: daily.reduce((total, point) => total + point.videoPlays, 0),
  };
}

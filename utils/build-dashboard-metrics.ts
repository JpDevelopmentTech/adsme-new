import type { Campaign } from "@/domain/entities/campaign";
import type { Client } from "@/domain/entities/client";
import type { DashboardMetrics } from "@/domain/entities/dashboard";
import type { JobListing } from "@/domain/entities/job-listing";
import { endOfMonth, startOfMonth } from "@/utils/month-range";

/**
 * Calcula los KPI de `B1` a partir de los datos ya cargados.
 * Con volúmenes grandes esto debería convertirse en agregados SQL.
 */
export function buildDashboardMetrics(
  clients: Client[],
  jobs: JobListing[],
  campaigns: Campaign[],
  now: Date,
): DashboardMetrics {
  const monthStart = startOfMonth(now);
  const monthEnd = endOfMonth(now);
  const activeJobs = jobs.filter((job) => job.status === "active");

  // Un trabajo cuenta en el mes si su período se solapa con él.
  const jobsInMonth = jobs.filter(
    (job) => job.startsOn <= monthEnd && job.endsOn >= monthStart,
  );

  return {
    clientsTotal: clients.length,
    clientsThisMonth: clients.filter((client) => client.createdAt >= monthStart)
      .length,
    activeJobs: activeJobs.length,
    jobsThisMonth: jobs.filter((job) => job.createdAt >= monthStart).length,
    activeCampaigns: activeJobs.reduce(
      (total, job) => total + job.platforms.length,
      0,
    ),
    jobsWithoutPlatforms: activeJobs.filter((job) => job.platforms.length === 0)
      .length,
    monthInvestment: jobsInMonth.reduce((total, job) => total + job.investment, 0),
    reachTotal: campaigns.reduce((total, campaign) => total + campaign.reach, 0),
  };
}

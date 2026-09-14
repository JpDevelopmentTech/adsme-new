import type { ClientMetrics } from "@/domain/entities/client-detail";
import type { Job } from "@/domain/entities/job";
import { countActiveJobs } from "@/utils/count-active-jobs";

/** Deriva las métricas de la cabecera de `B3` a partir de los trabajos del cliente. */
export function buildClientMetrics(jobs: Job[]): ClientMetrics {
  return {
    totalJobs: jobs.length,
    activeJobs: countActiveJobs(jobs),
    totalInvestment: jobs.reduce((total, job) => total + job.investment, 0),
    sharedLinks: jobs.filter((job) => job.reportUrl !== null).length,
  };
}

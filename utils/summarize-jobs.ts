import type { JobListing } from "@/domain/entities/job-listing";
import { formatCompactCurrency } from "@/utils/format-compact-currency";

/**
 * Subtítulo del listado. Sin filtros describe la cartera completa como en `B5`
 * («18 en curso · 32 en total · $184,6 M en pauta»); con filtros, cuántos
 * resultados quedaron sobre el total.
 */
export function summarizeJobs(
  jobs: JobListing[],
  allJobs: JobListing[],
  isFiltered: boolean,
): string {
  if (isFiltered) {
    const label = jobs.length === 1 ? "resultado" : "resultados";

    return `${jobs.length} ${label} de ${allJobs.length}`;
  }

  const active = allJobs.filter((job) => job.status === "active").length;
  const invested = allJobs.reduce((total, job) => total + job.investment, 0);

  return `${active} en curso · ${allJobs.length} en total · ${formatCompactCurrency(invested)} en pauta`;
}

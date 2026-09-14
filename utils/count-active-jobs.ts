import type { JobStatus } from "@/domain/entities/job";

/**
 * Trabajos activos: todos los que no están finalizados.
 * En `B3` un trabajo sincronizando sigue contando como activo.
 */
export function countActiveJobs(jobs: { status: JobStatus }[]): number {
  return jobs.filter((job) => job.status !== "finished").length;
}

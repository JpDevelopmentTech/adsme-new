import type { ClientResult } from "@/domain/entities/client-error";
import type { Job } from "@/domain/entities/job";
import type { JobRepository } from "@/domain/interfaces/job-repository";

/**
 * Caso de uso: revocar el enlace público de un trabajo y emitir uno nuevo.
 * Quien tuviera el anterior deja de poder abrir el reporte.
 */
export function createRegenerateReportLink(repository: JobRepository) {
  return async function regenerateReportLink(
    jobId: string,
  ): Promise<ClientResult<Job>> {
    return repository.regenerateReportLink(jobId);
  };
}

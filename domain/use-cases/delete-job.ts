import type { ClientResult } from "@/domain/entities/client-error";
import type { JobRepository } from "@/domain/interfaces/job-repository";

/** Caso de uso: eliminar un trabajo del usuario autenticado. */
export function createDeleteJob(repository: JobRepository) {
  return async function deleteJob(
    jobId: string,
  ): Promise<ClientResult<null>> {
    return repository.deleteJob(jobId);
  };
}

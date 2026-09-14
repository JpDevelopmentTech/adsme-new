import type { Job } from "@/domain/entities/job";
import type { JobRepository } from "@/domain/interfaces/job-repository";

/** Caso de uso: obtener un trabajo por su identificador. */
export function createGetJob(repository: JobRepository) {
  return async function getJob(jobId: string): Promise<Job | null> {
    return repository.getJob(jobId);
  };
}

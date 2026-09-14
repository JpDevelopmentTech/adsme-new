import type { Job } from "@/domain/entities/job";
import type { JobRepository } from "@/domain/interfaces/job-repository";

/** Caso de uso: listar los trabajos asociados a un cliente. */
export function createListClientJobs(repository: JobRepository) {
  return async function listClientJobs(clientId: string): Promise<Job[]> {
    return repository.listClientJobs(clientId);
  };
}

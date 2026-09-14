import type { JobListing } from "@/domain/entities/job-listing";
import type { JobListQuery } from "@/domain/entities/job-query";
import { DEFAULT_JOB_LIST_QUERY } from "@/domain/entities/job-query";
import type { JobRepository } from "@/domain/interfaces/job-repository";

/** Caso de uso: listar todos los trabajos según los filtros del listado global. */
export function createListJobs(repository: JobRepository) {
  return async function listJobs(
    query: JobListQuery = DEFAULT_JOB_LIST_QUERY,
  ): Promise<JobListing[]> {
    return repository.listJobs({ ...query, search: query.search.trim() });
  };
}

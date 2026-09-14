import type { ClientResult } from "@/domain/entities/client-error";
import type { Job } from "@/domain/entities/job";
import type { JobDraft } from "@/domain/entities/job-draft";
import type { JobRepository } from "@/domain/interfaces/job-repository";

/**
 * Caso de uso: crear o actualizar un trabajo. Un identificador ausente significa
 * alta; presente, edición.
 */
export function createSaveJob(repository: JobRepository) {
  return async function saveJob(
    jobId: string | null,
    draft: JobDraft,
  ): Promise<ClientResult<Job>> {
    const normalized: JobDraft = {
      ...draft,
      title: draft.title.trim(),
      description: draft.description.trim(),
    };

    return jobId
      ? repository.updateJob(jobId, normalized)
      : repository.createJob(normalized);
  };
}

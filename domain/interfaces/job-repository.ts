import type { ClientResult } from "@/domain/entities/client-error";
import type { Job } from "@/domain/entities/job";
import type { JobDraft } from "@/domain/entities/job-draft";
import type { JobListing } from "@/domain/entities/job-listing";
import type { JobListQuery } from "@/domain/entities/job-query";

/**
 * Port de trabajos. Igual que en clientes, las lecturas lanzan si falla la
 * infraestructura y las escrituras devuelven un resultado que la UI explica.
 */
export interface JobRepository {
  /** Trabajos de todos los clientes que cumplen la consulta del listado global. */
  listJobs(query: JobListQuery): Promise<JobListing[]>;

  /** Trabajos de un cliente, del más reciente al más antiguo. */
  listClientJobs(clientId: string): Promise<Job[]>;

  getJob(jobId: string): Promise<Job | null>;

  createJob(draft: JobDraft): Promise<ClientResult<Job>>;

  updateJob(jobId: string, draft: JobDraft): Promise<ClientResult<Job>>;

  deleteJob(jobId: string): Promise<ClientResult<null>>;

  /** Invalida los enlaces emitidos y devuelve el trabajo con el enlace nuevo. */
  regenerateReportLink(jobId: string): Promise<ClientResult<Job>>;
}

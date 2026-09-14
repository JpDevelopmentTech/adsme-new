import type { ClientStatus } from "@/domain/entities/client";
import type { ClientJobSummary } from "@/domain/entities/client-listing";
import { countActiveJobs } from "@/utils/count-active-jobs";

/**
 * Estado del cliente derivado de sus trabajos. `paused` es tener trabajos pero
 * ninguno corriendo, que es una situación distinta de no tener ninguno.
 */
export function resolveClientStatus(jobs: ClientJobSummary[]): ClientStatus {
  if (jobs.length === 0) return "empty";

  return countActiveJobs(jobs) > 0 ? "active" : "paused";
}

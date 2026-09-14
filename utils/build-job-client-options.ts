import type { JobListing } from "@/domain/entities/job-listing";
import type { FilterSelectOption } from "@/types/ui.types";

/**
 * Opciones del filtro «Cliente», tomadas de los trabajos existentes para no
 * ofrecer clientes que no tienen ninguno.
 */
export function buildJobClientOptions(
  jobs: JobListing[],
): FilterSelectOption<string>[] {
  const byHandle = new Map<string, string>();

  for (const job of jobs) {
    if (!byHandle.has(job.clientHandle)) {
      byHandle.set(job.clientHandle, job.artistName);
    }
  }

  const options = [...byHandle.entries()]
    .map(([value, label]) => ({ value, label }))
    .sort((a, b) => a.label.localeCompare(b.label, "es"));

  return [{ value: "all", label: "Todos" }, ...options];
}

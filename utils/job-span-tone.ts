import type { JobListing } from "@/domain/entities/job-listing";
import type { JobSpanTone } from "@/types/jobs-list.types";

/**
 * Color del tramo en la línea de tiempo. Repite la información del estado sin
 * repetir la palabra, y reserva el rojo para el único caso que pide acción: una
 * pauta que sigue activa cuando su período ya terminó.
 */
export function jobSpanTone(job: JobListing, today: string): JobSpanTone {
  if (job.status === "finished") return "muted";
  if (job.status === "syncing") return "syncing";
  if (job.endsOn < today) return "overdue";
  if (job.startsOn > today) return "upcoming";

  return "running";
}

import { JOB_EVOLUTION_DAYS } from "@/constants/job-detail.constants";
import type { Job } from "@/domain/entities/job";
import type { JobPeriod } from "@/types/job-detail.types";
import { shiftIsoDate } from "@/utils/shift-iso-date";

/**
 * Ventana de días que muestra la evolución del lanzamiento: los últimos
 * `JOB_EVOLUTION_DAYS` hasta hoy, o hasta el último día de pauta si el trabajo
 * ya terminó, para que uno cerrado no enseñe semanas vacías.
 */
export function getJobEvolutionPeriod(
  job: Pick<Job, "endsOn">,
  today: string,
): JobPeriod {
  const endsOn = job.endsOn < today ? job.endsOn : today;

  return { startsOn: shiftIsoDate(endsOn, -(JOB_EVOLUTION_DAYS - 1)), endsOn };
}

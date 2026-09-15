import type { JobListing } from "@/domain/entities/job-listing";
import type { JobsSummary } from "@/types/jobs-list.types";
import { daysBetween } from "@/utils/month-range";

/** Días por delante a partir de los cuales el cierre deja de ser «esta semana». */
const CLOSING_WEEK = 7;

/**
 * Cifras de la banda de `B5`. Los cinco grupos son excluyentes y suman el total,
 * porque si se solapan la línea de puntos deja de poder leerse como un reparto.
 * «Vencidos» existe aparte porque un trabajo activo cuyo período ya pasó no está
 * ni corriendo ni cerrado: es un descuadre que hay que resolver.
 */
export function buildJobsSummary(jobs: JobListing[], today: string): JobsSummary {
  const summary: JobsSummary = {
    invested: 0,
    total: jobs.length,
    running: 0,
    endingSoon: 0,
    overdue: 0,
    upcoming: 0,
    finished: 0,
  };

  for (const job of jobs) {
    summary.invested += job.investment;

    if (job.status === "finished") summary.finished += 1;
    else if (job.startsOn > today) summary.upcoming += 1;
    else if (job.endsOn < today) summary.overdue += 1;
    else if (daysBetween(today, job.endsOn) - 1 <= CLOSING_WEEK) {
      summary.endingSoon += 1;
    } else summary.running += 1;
  }

  return summary;
}

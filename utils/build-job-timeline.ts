import type { JobListing } from "@/domain/entities/job-listing";
import type { JobTimeline, JobTimelineSpan } from "@/types/jobs-list.types";
import { SHORT_MONTHS } from "@/utils/format-job-period";
import { daysBetween } from "@/utils/month-range";

/** Ancho mínimo del tramo, para que una pauta de un día siga viéndose. */
const MIN_SPAN = 3;

/** Mismo abreviado que usan las celdas, para que la cabecera hable su idioma. */
function shortMonth(isoDate: string): string {
  return SHORT_MONTHS[Number(isoDate.slice(5, 7)) - 1] ?? "";
}

/** Posición de una fecha dentro del eje, en porcentaje. */
function percentOf(isoDate: string, from: string, totalDays: number): number {
  return ((daysBetween(from, isoDate) - 1) / totalDays) * 100;
}

/**
 * Eje común a todas las filas visibles: va del primer inicio al último fin, con
 * hoy siempre dentro. Compartirlo es lo que hace comparables los tramos y lo que
 * alinea la marca de hoy en la misma vertical de la tabla.
 */
export function buildJobTimeline(jobs: JobListing[], today: string): JobTimeline {
  const starts = jobs.map((job) => job.startsOn).concat(today);
  const ends = jobs.map((job) => job.endsOn).concat(today);

  const from = starts.reduce((min, date) => (date < min ? date : min));
  const to = ends.reduce((max, date) => (date > max ? date : max));
  const totalDays = daysBetween(from, to);
  const fromMonth = shortMonth(from);
  const toMonth = shortMonth(to);

  return {
    from,
    to,
    totalDays,
    todayPercent: percentOf(today, from, totalDays),
    label: fromMonth === toMonth ? fromMonth : `${fromMonth}–${toMonth}`,
  };
}

/** Tramo que ocupa el trabajo dentro del eje, recortado a sus extremos. */
export function positionJob(
  job: JobListing,
  timeline: JobTimeline,
): JobTimelineSpan {
  const left = Math.max(
    0,
    percentOf(job.startsOn, timeline.from, timeline.totalDays),
  );
  const span = (daysBetween(job.startsOn, job.endsOn) / timeline.totalDays) * 100;

  return {
    leftPercent: Math.min(left, 100 - MIN_SPAN),
    widthPercent: Math.max(MIN_SPAN, Math.min(span, 100 - left)),
  };
}

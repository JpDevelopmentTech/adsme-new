import type { JobListing } from "@/domain/entities/job-listing";
import type { JobCountdown } from "@/types/jobs-list.types";
import { daysBetween } from "@/utils/month-range";

/** Días a partir de los cuales el cierre deja de ser inminente. */
const CLOSING_SOON = 3;

/**
 * Cuánto le queda a la pauta, en las palabras de la tabla: `en 2 d` si no ha
 * empezado, `12 d` mientras corre y `hace 4 d` cuando ya terminó. Ese último
 * caso se marca en rojo solo si el trabajo sigue activo, porque entonces es un
 * descuadre que hay que resolver y no el final normal de una campaña.
 */
export function formatJobCountdown(job: JobListing, today: string): JobCountdown {
  if (job.startsOn > today) {
    return { label: `en ${daysBetween(today, job.startsOn) - 1} d`, tone: "muted" };
  }

  if (job.endsOn >= today) {
    const left = daysBetween(today, job.endsOn) - 1;

    if (left === 0) return { label: "último día", tone: "warning" };

    return { label: `${left} d`, tone: left <= CLOSING_SOON ? "warning" : "muted" };
  }

  return {
    label: `hace ${daysBetween(job.endsOn, today) - 1} d`,
    tone: job.status === "active" ? "danger" : "muted",
  };
}

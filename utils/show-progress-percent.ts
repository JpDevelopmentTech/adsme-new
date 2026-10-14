import type { NominaShowProgress } from "@/domain/entities/nomina-artist";

/** Avance hacia el mínimo de shows en porcentaje entero, tope 100. */
export function showProgressPercent({ shows, minShows }: NominaShowProgress): number {
  if (minShows <= 0) return shows > 0 ? 100 : 0;
  return Math.min(100, Math.round((shows / minShows) * 100));
}

import type { NominaSemaphore } from "@/domain/entities/nomina-artist";
import type { NominaMovement } from "@/domain/entities/nomina-movement";
import { SAMPLE_CURRENT_MONTH } from "@/infrastructure/sample-data/nomina/sample-calendar.constants";
import type { SampleArtistSpec } from "@/infrastructure/sample-data/nomina/sample-nomina.types";
import { buildSampleMovements } from "@/infrastructure/sample-data/nomina/build-sample-movements";

/** Cálculos compartidos de un artista de muestra que usan todas las vistas. */
export interface SampleArtistFacts {
  spec: SampleArtistSpec;
  movements: NominaMovement[];
  current: NominaMovement[];
  shows: number;
  serviceShows: number;
  semaphore: NominaSemaphore;
  adsSpent: number;
}

/** Deriva movimientos, semáforo y gasto en Ads de un artista de muestra. */
export function buildSampleArtist(spec: SampleArtistSpec): SampleArtistFacts {
  const movements = buildSampleMovements(spec);
  const current = movements.filter((movement) => movement.assignedMonth === SAMPLE_CURRENT_MONTH);
  const currentShows = current.filter((movement) => movement.concept === "show");
  const shows = currentShows.length;
  const semaphore: NominaSemaphore = shows >= spec.minShows ? "verde" : shows > 0 ? "amarillo" : "rojo";
  const adsSpent = spec.expenses
    .filter((expense) => expense.target === "ads")
    .reduce((total, expense) => total + expense.amount, 0);

  return {
    spec,
    movements,
    current,
    shows,
    serviceShows: currentShows.filter((movement) => movement.split.service > 0).length,
    semaphore,
    adsSpent,
  };
}

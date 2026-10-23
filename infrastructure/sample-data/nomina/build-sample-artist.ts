import { buildArtistFacts, type SampleArtistFacts } from "@/infrastructure/sample-data/nomina/build-artist-facts";
import { buildSampleMovements } from "@/infrastructure/sample-data/nomina/build-sample-movements";
import type { NominaCalendar, SampleArtistSpec } from "@/infrastructure/sample-data/nomina/sample-nomina.types";

export type { SampleArtistFacts };

/** Artista de muestra: sus movimientos se generan a partir de la especificación. */
export function buildSampleArtist(spec: SampleArtistSpec, calendar: NominaCalendar): SampleArtistFacts {
  return buildArtistFacts(spec, buildSampleMovements(spec, calendar), calendar);
}

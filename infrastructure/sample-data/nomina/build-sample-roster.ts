import type { NominaRosterEntry } from "@/domain/entities/nomina-roster";
import type { SampleArtistFacts } from "@/infrastructure/sample-data/nomina/build-sample-artist";
import { sumMovements } from "@/infrastructure/sample-data/nomina/sum-movements";

/** Fila del roster de un artista de muestra. */
export function buildSampleRosterEntry(facts: SampleArtistFacts): NominaRosterEntry {
  const { spec } = facts;
  const total = sumMovements(facts.movements);

  return {
    id: spec.id,
    name: spec.name,
    photoUrl: spec.photoUrl,
    semaphore: facts.semaphore,
    monthIncome: sumMovements(facts.current).amount,
    monthEvents: facts.shows,
    scalability: facts.shows >= spec.minShows ? "Escalable" : "En Desarrollo",
    grossTotal: total.amount,
    labelProfitTotal: total.profit,
    nomina: spec.nomina,
    availableBudget: total.investment - facts.adsSpent,
    joinedAt: spec.joinedAt,
  };
}

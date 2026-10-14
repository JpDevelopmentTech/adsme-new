import type { NominaLedgerRow } from "@/domain/entities/nomina-finance";
import type { SampleArtistFacts } from "@/infrastructure/sample-data/nomina/build-sample-artist";

const CONCEPT_LABELS = { show: "Show", inversion: "Inversión Única", express: "Express", otro: "Otro" } as const;

/** Libro de movimientos de todo el roster, del más reciente al más antiguo. */
export function buildSampleLedger(roster: SampleArtistFacts[]): NominaLedgerRow[] {
  return roster
    .flatMap((facts) =>
      facts.movements.map((movement) => ({
        id: movement.id,
        incomeDate: movement.incomeDate,
        eventDate: movement.eventDate,
        assignedMonth: movement.assignedMonth,
        artistId: facts.spec.id,
        artistName: facts.spec.name,
        conceptLabel: movement.otherConcept ?? CONCEPT_LABELS[movement.concept],
        amount: movement.amount,
        service: movement.split.service,
        profit: movement.split.profit,
      })),
    )
    .sort((a, b) => b.incomeDate.localeCompare(a.incomeDate));
}

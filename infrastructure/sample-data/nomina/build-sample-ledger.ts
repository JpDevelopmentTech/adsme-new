import type { NominaLedgerRow } from "@/domain/entities/nomina-finance";
import type { NominaMovement } from "@/domain/entities/nomina-movement";
import type { SampleArtistFacts } from "@/infrastructure/sample-data/nomina/build-artist-facts";

const CONCEPT_LABELS = { show: "Show", inversion: "Inversión Única", express: "Express", otro: "Otro" } as const;

/** Libro de los movimientos elegidos de cada artista, por Fecha de Ingreso del más reciente al más antiguo. */
export function buildSampleLedger(roster: SampleArtistFacts[], pick: (movement: NominaMovement) => boolean = () => true): NominaLedgerRow[] {
  return roster
    .flatMap((facts) =>
      facts.movements.filter(pick).map((movement) => ({
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
        investment: movement.split.investment,
      })),
    )
    .sort((a, b) => b.incomeDate.localeCompare(a.incomeDate));
}

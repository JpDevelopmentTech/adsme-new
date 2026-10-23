import type { NominaFinance } from "@/domain/entities/nomina-finance";
import type { SampleArtistFacts } from "@/infrastructure/sample-data/nomina/build-artist-facts";
import { buildNominaFinance } from "@/infrastructure/sample-data/nomina/build-nomina-finance";
import type { NominaCalendar } from "@/infrastructure/sample-data/nomina/sample-nomina.types";

/** Finanzas de muestra de los últimos 6 meses, con el periodo anterior fijo del diseño. */
export function buildSampleFinance(roster: SampleArtistFacts[], calendar: NominaCalendar): NominaFinance {
  const range = { from: calendar.months[0], to: calendar.currentMonth, compare: true };
  return { ...buildNominaFinance(roster, range, calendar), previousTotals: calendar.previousTotals };
}

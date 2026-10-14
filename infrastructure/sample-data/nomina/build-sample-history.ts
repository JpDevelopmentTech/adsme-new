import type { NominaMonthSplit } from "@/domain/entities/nomina-bucket";
import type { NominaBudgetMonth } from "@/domain/entities/nomina-profile";
import type { SampleArtistSpec } from "@/infrastructure/sample-data/nomina/sample-nomina.types";

/**
 * Presupuesto mes a mes: la Inversión de Shows de un mes se ejecuta el mes
 * siguiente; la de un Express, en el mes en que ingresa.
 */
export function buildSampleHistory(spec: SampleArtistSpec, months: NominaMonthSplit[]): NominaBudgetMonth[] {
  return months.map((month, index) => ({
    ...month,
    shows: spec.showsByMonth[index],
    minShows: spec.minShows,
    receivedBudget: (index === 0 ? spec.previousInvestment : months[index - 1].investment) + month.expressInvestment,
    leftBudget: month.investment,
  }));
}

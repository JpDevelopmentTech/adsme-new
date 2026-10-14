import type { NominaArtistProfile } from "@/domain/entities/nomina-profile";
import type { SampleArtistFacts } from "@/infrastructure/sample-data/nomina/build-sample-artist";
import { buildSampleDailyPoints } from "@/infrastructure/sample-data/nomina/build-sample-daily-points";
import { buildSampleHistory } from "@/infrastructure/sample-data/nomina/build-sample-history";
import { buildSampleMonthSplits } from "@/infrastructure/sample-data/nomina/build-sample-month-splits";
import { sumMovements } from "@/infrastructure/sample-data/nomina/sum-movements";

/** Perfil completo de un artista de muestra. */
export function buildSampleProfile(facts: SampleArtistFacts): NominaArtistProfile {
  const { spec, movements } = facts;
  const total = sumMovements(movements);
  const month = sumMovements(facts.current);
  const ownIncome = total.service + total.profit;

  return {
    id: spec.id,
    name: spec.name,
    photoUrl: spec.photoUrl,
    semaphore: facts.semaphore,
    nomina: spec.nomina,
    joinedAt: spec.joinedAt,
    scalability: facts.shows >= spec.minShows ? "Escalable" : "En Desarrollo",
    socials: spec.socials,
    kpis: {
      monthIncome: month.amount,
      availableBudget: total.investment - facts.adsSpent,
      monthProfit: month.profit,
      adsSpent: facts.adsSpent,
      monthService: month.service,
      monthTaxes: month.taxes,
      serviceAssumedByAdsme: spec.adsmeAssumesService,
    },
    profitability: { margin: ownIncome > 0 ? (total.netProfit / ownIncome) * 100 : null },
    progress: { shows: facts.shows, minShows: spec.minShows, serviceShows: facts.serviceShows },
    fixedProfitGoal: spec.fixedProfitGoal,
    movements,
    movementTotals: { count: movements.length, ...total },
    expenses: spec.expenses,
    monthDistribution: [
      { key: "inversion", amount: month.investment },
      { key: "servicio", amount: month.service },
      { key: "utilidadNeta", amount: month.netProfit },
      { key: "impuestos", amount: month.taxes },
    ],
    performance: buildSampleDailyPoints(movements),
    history: buildSampleHistory(spec, buildSampleMonthSplits(movements)),
    raisedInvestment: total.investment,
  };
}

import type { NominaOverview } from "@/domain/entities/nomina-overview";
import type { SampleArtistFacts } from "@/infrastructure/sample-data/nomina/build-artist-facts";
import { buildSampleDailyPoints } from "@/infrastructure/sample-data/nomina/build-sample-daily-points";
import type { NominaCalendar } from "@/infrastructure/sample-data/nomina/sample-nomina.types";
import { sumMovements } from "@/infrastructure/sample-data/nomina/sum-movements";

/** Resumen del mes en curso para todo el roster de muestra. */
export function buildSampleOverview(roster: SampleArtistFacts[], calendar: NominaCalendar): NominaOverview {
  const month = sumMovements(roster.flatMap((facts) => facts.current));

  const topArtists = roster
    .map((facts) => ({ facts, income: sumMovements(facts.current).amount }))
    .filter((item) => item.income > 0)
    .sort((a, b) => b.income - a.income)
    .slice(0, 5)
    .map(({ facts, income }) => ({
      id: facts.spec.id,
      name: facts.spec.name,
      photoUrl: facts.spec.photoUrl,
      semaphore: facts.semaphore,
      monthIncome: income,
      progress: { shows: facts.shows, minShows: facts.spec.minShows, serviceShows: facts.serviceShows },
    }));

  return {
    month: calendar.currentMonth,
    kpis: {
      grossIncome: month.amount,
      profit: month.profit,
      investment: month.investment,
      service: month.service,
      taxes: month.taxes,
      serviceAssumedBy: roster.filter((facts) => facts.spec.adsmeAssumesService).length,
      artistCount: roster.length,
    },
    distribution: [
      { key: "inversion", amount: month.investment },
      { key: "servicio", amount: month.service },
      { key: "utilidadNeta", amount: month.netProfit },
      { key: "impuestos", amount: month.taxes },
    ],
    performance: buildSampleDailyPoints(roster.flatMap((facts) => facts.movements), calendar),
    topArtists,
  };
}

import type { NominaFinance } from "@/domain/entities/nomina-finance";
import type { SampleArtistFacts } from "@/infrastructure/sample-data/nomina/build-sample-artist";
import { buildSampleLedger } from "@/infrastructure/sample-data/nomina/build-sample-ledger";
import { buildSampleMonthSplits } from "@/infrastructure/sample-data/nomina/build-sample-month-splits";
import { SAMPLE_MONTHS, SAMPLE_PREVIOUS_TOTALS, SAMPLE_TODAY } from "@/infrastructure/sample-data/nomina/sample-calendar.constants";
import { sumMovements } from "@/infrastructure/sample-data/nomina/sum-movements";

/** Finanzas de muestra de los últimos 6 meses para todo el roster. */
export function buildSampleFinance(roster: SampleArtistFacts[]): NominaFinance {
  const all = roster.flatMap((facts) => facts.movements);
  const total = sumMovements(all);
  const byConcept = (concept: "show" | "inversion" | "express" | "otro") =>
    all.filter((movement) => movement.concept === concept).reduce((sum, movement) => sum + movement.amount, 0);

  const artists = roster
    .filter((facts) => facts.movements.length > 0)
    .map((facts) => {
      const own = sumMovements(facts.movements);
      const goal = facts.spec.fixedProfitGoal;
      return {
        id: facts.spec.id, name: facts.spec.name, photoUrl: facts.spec.photoUrl, semaphore: facts.semaphore,
        income: own.amount, service: own.service, profit: own.profit, investment: own.investment,
        shows: facts.movements.filter((movement) => movement.concept === "show").length,
        fixedGoalProgress: goal ? (sumMovements(facts.current).profit / goal) * 100 : null,
      };
    });

  const ledger = buildSampleLedger(roster);

  return {
    fromMonth: SAMPLE_MONTHS[0],
    toMonth: SAMPLE_MONTHS[SAMPLE_MONTHS.length - 1],
    totals: { income: total.amount, service: total.service, profit: total.profit, investment: total.investment },
    previousTotals: { ...SAMPLE_PREVIOUS_TOTALS },
    months: buildSampleMonthSplits(all),
    artists,
    incomeByConcept: (["show", "express", "inversion", "otro"] as const)
      .map((concept) => ({ concept, amount: byConcept(concept) }))
      .filter((item) => item.amount > 0),
    consumedAds: roster.reduce((sum, facts) => sum + facts.adsSpent, 0),
    currentMonthIncome: sumMovements(roster.flatMap((facts) => facts.current)).amount,
    currentDay: SAMPLE_TODAY,
    daysInCurrentMonth: 31,
    serviceAssumedBy: roster.filter((facts) => facts.spec.adsmeAssumesService).length,
    artistCount: roster.length,
    ledgerCount: ledger.length,
    ledger,
  };
}

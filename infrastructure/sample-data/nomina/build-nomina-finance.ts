import type { NominaFinance, NominaPeriodTotals } from "@/domain/entities/nomina-finance";
import type { NominaIncomeConcept, NominaMovement } from "@/domain/entities/nomina-movement";
import type { NominaPeriodRange } from "@/domain/entities/nomina-period";
import type { SampleArtistFacts } from "@/infrastructure/sample-data/nomina/build-artist-facts";
import { buildSampleLedger } from "@/infrastructure/sample-data/nomina/build-sample-ledger";
import { buildSampleMonthSplits } from "@/infrastructure/sample-data/nomina/build-sample-month-splits";
import type { NominaCalendar } from "@/infrastructure/sample-data/nomina/sample-nomina.types";
import { sumMovements } from "@/infrastructure/sample-data/nomina/sum-movements";
import { listMonthsBetween } from "@/utils/list-months-between";
import { shiftMonth } from "@/utils/shift-month";

const CONCEPTS: NominaIncomeConcept[] = ["show", "express", "inversion", "otro"];

/** Filtro por Mes Asignado dentro de un rango de meses. */
const within = (from: string, to: string) => (movement: NominaMovement) => movement.assignedMonth >= from && movement.assignedMonth <= to;

/** Totales de periodo de una lista de movimientos. */
function toTotals(movements: NominaMovement[]): NominaPeriodTotals {
  const total = sumMovements(movements);
  return { income: total.amount, service: total.service, profit: total.profit, investment: total.investment };
}

/** Totales del mismo número de meses inmediatamente anteriores, o `null` si no hubo movimientos. */
function previousTotals(all: NominaMovement[], range: NominaPeriodRange, length: number): NominaPeriodTotals | null {
  if (!range.compare) return null;
  const previous = all.filter(within(shiftMonth(range.from, -length), shiftMonth(range.from, -1)));
  return previous.length > 0 ? toTotals(previous) : null;
}

/**
 * Finanzas del roster en un periodo, con las reglas del original: todo se
 * agrupa por Mes Asignado; el gasto en Ads y el disponible son acumulados sin
 * importar el periodo; la meta de Utilidad fija se mide con el mes en curso.
 */
export function buildNominaFinance(roster: SampleArtistFacts[], range: NominaPeriodRange, calendar: NominaCalendar): NominaFinance {
  const months = listMonthsBetween(range.from, range.to);
  const inRange = within(range.from, range.to);
  const everything = roster.flatMap((facts) => facts.movements);
  const all = everything.filter(inRange);
  const current = all.filter((movement) => movement.assignedMonth === calendar.currentMonth);

  const artists = roster
    .map((facts) => ({ facts, own: facts.movements.filter(inRange) }))
    .filter(({ own }) => own.length > 0)
    .map(({ facts, own }) => {
      const goal = facts.spec.fixedProfitGoal;
      return {
        id: facts.spec.id, name: facts.spec.name, photoUrl: facts.spec.photoUrl, semaphore: facts.semaphore,
        ...toTotals(own),
        shows: own.filter((movement) => movement.concept === "show").length,
        fixedGoalProgress: goal ? (sumMovements(facts.current).profit / goal) * 100 : null,
      };
    });

  const ledger = buildSampleLedger(roster, inRange);
  const consumedAds = roster.reduce((sum, facts) => sum + facts.adsSpent, 0);

  return {
    fromMonth: range.from,
    toMonth: range.to,
    totals: toTotals(all),
    previousTotals: previousTotals(everything, range, months.length),
    months: buildSampleMonthSplits(all, months),
    artists,
    incomeByConcept: CONCEPTS
      .map((concept) => ({ concept, amount: all.filter((movement) => movement.concept === concept).reduce((sum, movement) => sum + movement.amount, 0) }))
      .filter((item) => item.amount > 0),
    consumedAds,
    availableAds: sumMovements(everything).investment - consumedAds,
    currentMonthIncome: current.length > 0 ? sumMovements(current).amount : null,
    currentMonth: calendar.currentMonth,
    currentDay: calendar.today,
    daysInCurrentMonth: calendar.daysInCurrentMonth,
    serviceAssumedBy: roster.filter((facts) => facts.spec.adsmeAssumesService).length,
    artistCount: roster.length,
    ledgerCount: ledger.length,
    ledger,
  };
}

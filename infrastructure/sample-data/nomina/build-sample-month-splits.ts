import type { NominaMonthSplit } from "@/domain/entities/nomina-bucket";
import type { NominaMovement } from "@/domain/entities/nomina-movement";
import { SAMPLE_MONTHS } from "@/infrastructure/sample-data/nomina/sample-calendar.constants";

/** Suma los movimientos de cada mes de muestra por Mes Asignado. */
export function buildSampleMonthSplits(movements: NominaMovement[]): NominaMonthSplit[] {
  return SAMPLE_MONTHS.map((month) => {
    const inMonth = movements.filter((movement) => movement.assignedMonth === month);
    const sum = (pick: (movement: NominaMovement) => number) =>
      inMonth.reduce((total, movement) => total + pick(movement), 0);

    return {
      month,
      income: sum((movement) => movement.amount),
      service: sum((movement) => movement.split.service),
      profit: sum((movement) => movement.split.profit),
      investment: sum((movement) => (movement.concept === "express" ? 0 : movement.split.investment)),
      expressInvestment: sum((movement) => (movement.concept === "express" ? movement.split.investment : 0)),
    };
  });
}

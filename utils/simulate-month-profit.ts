import { MAX_SIMULATED_SHOWS } from "@/constants/nomina-modales.constants";
import type { NominaSplitModel } from "@/types/nomina-modales.types";
import { splitShowIncome } from "@/utils/split-show-income";

/** Utilidad acumulada del mes tras cada show de valor igual a la nómina (índice 0 = show 1). */
export function simulateMonthProfit(model: NominaSplitModel): number[] {
  const totals: number[] = [];
  let profit = 0;

  for (let show = 0; show < MAX_SIMULATED_SHOWS; show += 1) {
    profit += splitShowIncome(model, show * model.nomina, model.nomina).profit;
    totals.push(profit);
  }

  return totals;
}

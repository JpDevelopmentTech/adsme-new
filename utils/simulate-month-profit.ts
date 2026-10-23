import { MAX_SIMULATED_SHOWS } from "@/constants/nomina-modales.constants";
import type { NominaSplitModel } from "@/types/nomina-modales.types";
import { splitShowIncome } from "@/utils/split-show-income";

/**
 * Utilidad generada acumulada del mes tras cada show de valor igual a la nómina
 * (índice 0 = show 1). Es la bruta: si AdsME asume el Servicio, no descuenta lo
 * que esa Utilidad cubre del Servicio (la revisión lo compara aparte).
 */
export function simulateMonthProfit(model: NominaSplitModel): number[] {
  const totals: number[] = [];
  let profit = 0;

  for (let show = 0; show < MAX_SIMULATED_SHOWS; show += 1) {
    profit += splitShowIncome(model, show * model.nomina, model.nomina, Number.POSITIVE_INFINITY).profit;
    totals.push(profit);
  }

  return totals;
}

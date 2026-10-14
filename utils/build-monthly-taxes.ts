import type { NominaMonthSplit } from "@/domain/entities/nomina-bucket";
import type { MonthlyTaxRow } from "@/types/nomina-finanzas.types";
import { computeNominaTax } from "@/utils/compute-nomina-tax";

/** Impuesto de cada mes del periodo, en orden cronológico, con el acumulado. */
export function buildMonthlyTaxes(months: NominaMonthSplit[]): MonthlyTaxRow[] {
  let cumulative = 0;

  return months.map((month) => {
    const tax = computeNominaTax(month.profit);
    cumulative += tax;
    return { month: month.month, base: month.profit, tax, netProfit: month.profit - tax, cumulative };
  });
}

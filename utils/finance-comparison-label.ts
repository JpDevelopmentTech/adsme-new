import { FINANCE_COPY } from "@/constants/nomina-finanzas-copy.constants";

/** «vs. mes anterior» si el periodo es de un mes; «vs. periodo anterior» si son varios. */
export function financeComparisonLabel(monthCount: number): string {
  return monthCount === 1 ? FINANCE_COPY.comparisonMonth : FINANCE_COPY.comparison;
}

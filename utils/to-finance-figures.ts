import type { NominaPeriodTotals } from "@/domain/entities/nomina-finance";
import type { FinanceFigures } from "@/types/nomina-finanzas.types";
import { computeNominaTax } from "@/utils/compute-nomina-tax";

/** Completa las sumas de un periodo con sus impuestos y su utilidad neta. */
export function toFinanceFigures(totals: NominaPeriodTotals): FinanceFigures {
  const taxes = computeNominaTax(totals.profit);
  return { ...totals, taxes, netProfit: totals.profit - taxes };
}

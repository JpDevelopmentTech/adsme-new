import { PROFIT_THRESHOLDS } from "@/constants/nomina.constants";
import type { ProfitLevel } from "@/types/nomina-ui.types";

/** Veredicto de rentabilidad a partir del margen neto y la utilidad neta. */
export function resolveProfitLevel(margin: number | null, netProfit: number): ProfitLevel {
  if (margin === null || netProfit <= 0) return "sinUtilidad";
  if (margin < PROFIT_THRESHOLDS.low) return "bajo";
  if (margin < PROFIT_THRESHOLDS.healthy) return "ajustado";
  if (margin < PROFIT_THRESHOLDS.excellent) return "rentable";
  return "muyRentable";
}

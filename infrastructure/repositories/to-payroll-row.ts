import type { NominaSplitTerms } from "@/domain/entities/nomina-split-terms";

/** Columnas del modelo de reparto para escribir en `client_payroll`. */
export function toSplitColumns(split: NominaSplitTerms) {
  return {
    has_service: split.hasService,
    service: split.service,
    service_payer: split.servicePayer,
    has_scalability: split.hasScalability,
    profit_percent: split.profitPercent,
    profit_per_show_after_min: split.profitPerShowAfterMin,
    has_fixed_profit: split.hasFixedProfit,
    fixed_profit: split.hasFixedProfit ? split.fixedProfit : 0,
  };
}

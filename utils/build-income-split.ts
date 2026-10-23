import { SINGLE_INVESTMENT_PROFIT_RATE } from "@/constants/nomina-modales.constants";
import type { NominaSplit } from "@/domain/entities/nomina-bucket";
import type { NominaIncomeSplitInput, NominaShowShare } from "@/types/nomina-modales.types";
import { completeSplit } from "@/utils/complete-split";
import { splitExpressIncome } from "@/utils/split-express-income";
import { splitShowIncome } from "@/utils/split-show-income";

/** Reparto de un ingreso según su concepto, antes de impuestos. */
function shareOf({ concept, amount, cost, model, monthBilled, serviceCovered }: NominaIncomeSplitInput): NominaShowShare {
  if (concept === "inversion") {
    const service = Math.min(cost, amount);
    const profit = (amount - service) * SINGLE_INVESTMENT_PROFIT_RATE;
    return { service, profit, investment: amount - service - profit };
  }
  if (concept === "express") return splitExpressIncome(model, monthBilled, amount, serviceCovered);
  return splitShowIncome(model, monthBilled, amount, serviceCovered);
}

/**
 * Distribución automática del modal de ingreso: reparte el monto y deriva los
 * impuestos (30 % de la Utilidad) y la Utilidad neta. Servicio y Utilidad se
 * redondean al peso y la Inversión es el resto, así la suma cuadra con el monto.
 */
export function buildIncomeSplit(input: NominaIncomeSplitInput): NominaSplit {
  const share = shareOf(input);
  const service = Math.round(share.service);
  const profit = Math.round(share.profit);

  return completeSplit(service, profit, Math.round(input.amount) - service - profit);
}

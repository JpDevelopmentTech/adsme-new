import { SINGLE_INVESTMENT_PROFIT_RATE } from "@/constants/nomina-modales.constants";
import type { NominaSplit } from "@/domain/entities/nomina-bucket";
import type { NominaIncomeSplitInput, NominaShowShare } from "@/types/nomina-modales.types";
import { completeSplit } from "@/utils/complete-split";
import { splitShowIncome } from "@/utils/split-show-income";

/** Reparto de un ingreso según su concepto, antes de impuestos. */
function shareOf({ concept, amount, cost, model, monthBilled }: NominaIncomeSplitInput): NominaShowShare {
  if (concept === "inversion") {
    const service = Math.min(cost, amount);
    const profit = (amount - service) * SINGLE_INVESTMENT_PROFIT_RATE;
    return { service, profit, investment: amount - service - profit };
  }
  if (concept === "express") {
    const pending = model.hasService && model.servicePayer === "cliente" ? Math.max(0, model.service - monthBilled) : 0;
    const service = Math.min(pending, amount);
    const profit = (amount - service) * (model.profitPercent / 100);
    return { service, profit, investment: amount - service - profit };
  }
  return splitShowIncome(model, monthBilled, amount);
}

/**
 * Distribución automática del modal de ingreso: reparte el monto y deriva los
 * impuestos (30 % de la Utilidad) y la Utilidad neta, todo redondeado al peso.
 */
export function buildIncomeSplit(input: NominaIncomeSplitInput): NominaSplit {
  const share = shareOf(input);
  const service = Math.round(share.service);
  const profit = Math.round(share.profit);

  return completeSplit(service, profit, Math.max(0, input.amount - service - profit));
}

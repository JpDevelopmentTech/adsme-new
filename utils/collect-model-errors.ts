import { VIABILITY_ERRORS } from "@/constants/nomina-modales-viability-copy.constants";
import type { NominaSplitModel } from "@/types/nomina-modales.types";
import { formatExactCurrency } from "@/utils/format-exact-currency";

/**
 * Errores que hacen inviable el modelo. `fixedShow` es el show en que se logra
 * la Utilidad fija (o `null` si no llega en 60 shows).
 */
export function collectModelErrors(model: NominaSplitModel, fixedShow: number | null): string[] {
  const money = formatExactCurrency;
  const threshold = model.minShows * model.nomina;
  const errors: string[] = [];

  if (model.minShows < 1) errors.push(VIABILITY_ERRORS.minShows);
  if (model.hasService && model.service <= 0) errors.push(VIABILITY_ERRORS.serviceEmpty);
  if (model.hasService && model.service > 0 && model.servicePayer === "cliente" && model.minShows >= 1 && model.service >= threshold) {
    errors.push(VIABILITY_ERRORS.serviceTooHigh(money(model.service), money(threshold)));
  }
  if (model.profitPercent < 0 || model.profitPercent > 100) errors.push(VIABILITY_ERRORS.percentRange);
  if (model.hasScalability && model.profitPerShowAfterMin > model.nomina) {
    errors.push(VIABILITY_ERRORS.postTooHigh(money(model.profitPerShowAfterMin), money(model.nomina)));
  }
  if (model.profitPercent === 0 && (!model.hasScalability || model.profitPerShowAfterMin === 0)) {
    errors.push(VIABILITY_ERRORS.noProfit);
  }
  if (model.hasFixedProfit && model.fixedProfit <= 0) errors.push(VIABILITY_ERRORS.fixedEmpty);
  if (model.hasFixedProfit && model.fixedProfit > 0 && fixedShow === null && errors.length === 0) {
    errors.push(VIABILITY_ERRORS.fixedUnreachable(money(model.fixedProfit), money(model.nomina)));
  }

  return errors;
}

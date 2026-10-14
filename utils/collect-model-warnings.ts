import { VIABILITY_WARNINGS } from "@/constants/nomina-modales-viability-copy.constants";
import type { NominaSplitModel } from "@/types/nomina-modales.types";
import { formatExactCurrency } from "@/utils/format-exact-currency";

/** Avisos del modelo: se puede guardar, pero conviene revisarlo. */
export function collectModelWarnings(model: NominaSplitModel, fixedShow: number | null, adsmeShow: number | null): string[] {
  const money = formatExactCurrency;
  const warnings: string[] = [];
  const isAdsme = model.hasService && model.servicePayer === "adsme" && model.service > 0;

  if (model.hasScalability && model.profitPerShowAfterMin > model.nomina / 2 && model.profitPerShowAfterMin <= model.nomina) {
    warnings.push(VIABILITY_WARNINGS.postOverHalf(money(model.profitPerShowAfterMin), money(model.nomina)));
  }
  if (!model.hasScalability) warnings.push(VIABILITY_WARNINGS.noScalability);
  if (model.hasFixedProfit && fixedShow !== null && fixedShow > model.minShows) {
    warnings.push(VIABILITY_WARNINGS.fixedLate(money(model.fixedProfit), fixedShow, model.minShows));
  }
  if (isAdsme && adsmeShow !== null && adsmeShow > model.minShows) {
    warnings.push(VIABILITY_WARNINGS.adsmeLate(adsmeShow, model.minShows));
  }
  if (isAdsme && adsmeShow === null) warnings.push(VIABILITY_WARNINGS.adsmeNever(money(model.nomina), money(model.service)));

  return warnings;
}

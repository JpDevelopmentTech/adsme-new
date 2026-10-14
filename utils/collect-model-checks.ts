import { NOMINA_TAX_RATE } from "@/constants/nomina.constants";
import { VIABILITY_CHECKS } from "@/constants/nomina-modales-viability-copy.constants";
import type { NominaSplitModel } from "@/types/nomina-modales.types";
import { formatExactCurrency } from "@/utils/format-exact-currency";
import { formatPlainPercent } from "@/utils/format-plain-percent";

/** Confirmaciones (✓) que explican cómo se reparte el mes con este modelo. */
export function collectModelChecks(
  model: NominaSplitModel,
  cumulative: number[],
  fixedShow: number | null,
  adsmeShow: number | null,
): string[] {
  const money = formatExactCurrency;
  const nomina = money(model.nomina);
  const checks = [VIABILITY_CHECKS.threshold(model.minShows, nomina, money(model.minShows * model.nomina))];

  if (model.hasService && model.servicePayer === "adsme") {
    checks.push(VIABILITY_CHECKS.adsmeAssumes(money(model.service)));
    checks.push(adsmeShow === null ? VIABILITY_CHECKS.adsmeNeverEarns(nomina) : VIABILITY_CHECKS.adsmeEarnsFrom(nomina, adsmeShow));
  } else {
    checks.push(VIABILITY_CHECKS.clientSplit(formatPlainPercent(model.profitPercent), formatPlainPercent(100 - model.profitPercent)));
  }
  if (model.hasScalability) checks.push(VIABILITY_CHECKS.afterMin(money(model.profitPerShowAfterMin)));

  const monthProfit = Math.round(cumulative[model.minShows - 1] ?? 0);
  checks.push(VIABILITY_CHECKS.monthProfit(model.minShows, money(monthProfit), money(Math.round(monthProfit * (1 - NOMINA_TAX_RATE)))));
  if (model.hasFixedProfit && fixedShow !== null) checks.push(VIABILITY_CHECKS.fixedAt(fixedShow));

  return checks;
}

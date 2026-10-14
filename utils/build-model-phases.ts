import { RULER_COLORS } from "@/constants/nomina-buckets.constants";
import { PHASE_COPY } from "@/constants/nomina-modales-reparto-copy.constants";
import type { NominaPhaseRow, NominaSplitModel } from "@/types/nomina-modales.types";
import { formatExactCurrency } from "@/utils/format-exact-currency";
import { formatPlainPercent } from "@/utils/format-plain-percent";

/** «hasta 2», o «hasta 3*» si el show se reparte entre dos fases. */
function upToShow(amount: number, nomina: number): string {
  const shows = Math.ceil(amount / nomina);
  return PHASE_COPY.upTo(`${shows}${amount % nomina === 0 ? "" : "*"}`);
}

/** Filas de la tabla de fases: Servicio (si lo paga el cliente), hasta y después del mínimo. */
export function buildModelPhases(model: NominaSplitModel): NominaPhaseRow[] {
  const money = formatExactCurrency;
  const profit = formatPlainPercent(model.profitPercent);
  const investment = formatPlainPercent(100 - model.profitPercent);
  const isAdsme = model.hasService && model.servicePayer === "adsme";
  const rows: NominaPhaseRow[] = [];

  if (model.hasService && !isAdsme) {
    rows.push({ key: "servicio", label: PHASE_COPY.service, how: PHASE_COPY.serviceHow(money(model.service)), accumulated: money(model.service), show: upToShow(model.service, model.nomina), color: RULER_COLORS.service });
  }
  rows.push({
    key: "hastaMinimo",
    label: PHASE_COPY.untilMin,
    how: isAdsme ? PHASE_COPY.untilHowAdsme(investment, profit, money(model.service)) : PHASE_COPY.untilHow(investment, profit),
    accumulated: money(model.minShows * model.nomina),
    show: PHASE_COPY.upTo(String(model.minShows)),
    color: RULER_COLORS.untilMin,
  });

  const post = money(model.profitPerShowAfterMin);
  const afterHow = !model.hasScalability ? PHASE_COPY.afterHowFlat(investment, profit) : isAdsme ? PHASE_COPY.afterHowAdsme(post) : PHASE_COPY.afterHow(post);
  rows.push({ key: "despuesMinimo", label: PHASE_COPY.afterMin, how: afterHow, accumulated: PHASE_COPY.none, show: PHASE_COPY.from(model.minShows + 1), color: RULER_COLORS.afterMin });

  return rows;
}

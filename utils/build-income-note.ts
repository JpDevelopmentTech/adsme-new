import { INCOME_SPLIT_COPY } from "@/constants/nomina-modales-ingreso-copy.constants";
import type { NominaIncomeNoteInput } from "@/types/nomina-modales-ingreso.types";
import { formatExactCurrency } from "@/utils/format-exact-currency";
import { formatMonthShort } from "@/utils/format-nomina-dates";
import { formatPlainPercent } from "@/utils/format-plain-percent";

/** Nota bajo la distribución: explica la regla del concepto o el acumulado del mes. */
export function buildIncomeNote({ concept, amount, cost, month, model, context }: NominaIncomeNoteInput): string {
  const money = formatExactCurrency;
  const percent = formatPlainPercent(model.profitPercent);

  if (concept === "inversion") return cost > 0 ? INCOME_SPLIT_COPY.costNote(money(Math.min(cost, amount))) : INCOME_SPLIT_COPY.investmentNote;
  if (concept === "express") {
    return model.hasService && model.servicePayer === "adsme" ? INCOME_SPLIT_COPY.expressAdsmeNote(percent, money(model.service)) : INCOME_SPLIT_COPY.expressNote(percent);
  }

  const threshold = money(model.minShows * model.nomina);
  const label = month ? formatMonthShort(month) : "";
  return context.monthBilled > 0
    ? INCOME_SPLIT_COPY.monthNote(label, money(context.monthBilled), context.monthMovementCount, money(context.monthBilled + amount), threshold)
    : INCOME_SPLIT_COPY.firstNote(label, threshold);
}

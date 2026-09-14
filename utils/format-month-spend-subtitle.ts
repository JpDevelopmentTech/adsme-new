import { DASHBOARD_COPY } from "@/constants/dashboard.constants";
import type { MonthSpend } from "@/domain/entities/dashboard";
import { formatCompactCurrency } from "@/utils/format-compact-currency";

/**
 * Pie de la gráfica de inversión. Con serie importada encabeza el gasto medido,
 * que es el dato duro; sin ella se sigue describiendo el reparto planificado
 * para no dar por gastado lo que solo está comprometido.
 */
export function formatMonthSpendSubtitle(spend: MonthSpend): string {
  const parts = spend.hasReal
    ? [
        `${formatCompactCurrency(spend.spent)} ${DASHBOARD_COPY.spentToDate}`,
        `${formatCompactCurrency(spend.planned)} ${DASHBOARD_COPY.plannedMonth}`,
      ]
    : [
        `${formatCompactCurrency(spend.planned)} ${DASHBOARD_COPY.plannedSplit}`,
        `${formatCompactCurrency(spend.peakAmount)} ${DASHBOARD_COPY.peakPerDay}`,
      ];

  return [spend.monthLabel, ...parts].join(" · ");
}

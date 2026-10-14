import { BUCKET_META } from "@/constants/nomina-buckets.constants";
import { HISTORY_TAB_COPY } from "@/constants/nomina-perfil-tabs-copy.constants";
import type { NominaBudgetMonth } from "@/domain/entities/nomina-profile";
import { formatExactCurrency } from "@/utils/format-exact-currency";
import { formatMonthLong, nextMonth } from "@/utils/format-nomina-dates";
import { splitBudgetMonth } from "@/utils/split-budget-month";

/** Fila del tooltip: punto de color, nombre y monto. */
function row(color: string, label: string, amount: number): string {
  return `<div style="display:flex;align-items:center;gap:8px;font-size:12px;color:#ffffffb8"><span style="width:7px;height:7px;border-radius:99px;background:${color}"></span><span style="flex:1">${label}</span><span style="color:#fff">${formatExactCurrency(amount)}</span></div>`;
}

/**
 * HTML del tooltip del Mapa de meses: el mes, sus ingresos, el reparto y, en
 * lila, el presupuesto que deja para el mes siguiente. Solo lleva cifras y
 * textos propios, así que no hay nada que escapar.
 */
export function buildMonthsMapTooltip(month: NominaBudgetMonth, isCurrent: boolean): string {
  const split = splitBudgetMonth(month);
  const title = `${formatMonthLong(month.month)}${isCurrent ? ` · ${HISTORY_TAB_COPY.current}` : ""}`;
  const rows = [
    row(BUCKET_META.servicio.color, BUCKET_META.servicio.label, split.service),
    row(BUCKET_META.utilidadNeta.color, BUCKET_META.utilidadNeta.label, split.netProfit),
    row(BUCKET_META.impuestos.color, HISTORY_TAB_COPY.tooltipTaxes, split.taxes),
    row(BUCKET_META.inversion.color, HISTORY_TAB_COPY.tooltipShows, split.investment),
    split.expressInvestment > 0 ? row(BUCKET_META.inversionExpress.color, BUCKET_META.inversionExpress.label, split.expressInvestment) : "",
  ].join("");

  return `<div style="display:flex;flex-direction:column;gap:8px;min-width:230px;padding:14px 16px;font-family:var(--font-body)">
<div style="font-size:12px;color:#ffffff8f">${title}</div>
<div style="display:flex;justify-content:space-between;font-size:13px;color:#fff"><span>${HISTORY_TAB_COPY.tooltipIncome}</span><span>${formatExactCurrency(month.income)}</span></div>
<div style="height:1px;background:#ffffff1f"></div>${rows}<div style="height:1px;background:#ffffff1f"></div>
<div style="font-size:12px;color:#C9B6FF">${HISTORY_TAB_COPY.tooltipBudget} ${formatMonthLong(nextMonth(month.month))}</div>
<div style="font-size:14px;color:#C9B6FF">${formatExactCurrency(split.investment)}</div></div>`;
}

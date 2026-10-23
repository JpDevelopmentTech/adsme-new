import type { NominaFinance } from "@/domain/entities/nomina-finance";
import type { MiniStatProps } from "@/types/nomina-ui.types";
import { formatExactCurrency } from "@/utils/format-exact-currency";
import { formatMonthLong } from "@/utils/format-nomina-dates";
import { formatOptionalPercent } from "@/utils/format-optional-percent";
import { shareOf } from "@/utils/share-of";
import { toFinanceFigures } from "@/utils/to-finance-figures";

/** Ingresos del mes en curso proyectados al cierre con el ritmo de hoy. */
function projectMonth(finance: NominaFinance): number | null {
  if (finance.currentMonthIncome === null || finance.currentDay <= 0) return null;
  return (finance.currentMonthIncome / finance.currentDay) * finance.daysInCurrentMonth;
}

/** Los ocho «Indicadores clave» del Resumen. */
export function buildFinanceIndicators(finance: NominaFinance): MiniStatProps[] {
  const figures = toFinanceFigures(finance.totals);
  const withIncome = finance.months.filter((month) => month.income > 0);
  const best = withIncome.reduce<(typeof withIncome)[number] | null>((top, month) => (!top || month.income > top.income ? month : top), null);
  const projection = projectMonth(finance);
  const ratio = (part: number) => formatOptionalPercent(shareOf(part, figures.income));

  return [
    { label: "Margen bruto", value: ratio(figures.profit), sub: "Utilidad / ingresos" },
    { label: "Margen neto s/ brutos", value: ratio(figures.netProfit), sub: "Utilidad neta / ingresos brutos" },
    { label: "Peso del servicio", value: ratio(figures.service), sub: "Servicio / ingresos" },
    { label: "Reinversión en Ads", value: ratio(figures.investment), sub: "Inversión / ingresos" },
    {
      label: "Promedio mensual",
      value: formatExactCurrency(withIncome.length ? figures.income / withIncome.length : 0),
      sub: `${withIncome.length} ${withIncome.length === 1 ? "mes" : "meses"} con ingresos`,
    },
    { label: "Mejor mes", value: best ? formatExactCurrency(best.income) : "—", sub: best ? formatMonthLong(best.month) : undefined },
    {
      label: "Proyección de este mes",
      value: projection === null ? "—" : formatExactCurrency(projection),
      sub: projection === null ? "Sin ingresos este mes" : `Ritmo al día ${finance.currentDay}`,
    },
    {
      label: "Disponible para Ads",
      value: formatExactCurrency(finance.availableAds),
      sub: `Consumido: ${formatExactCurrency(finance.consumedAds)}`,
    },
  ];
}

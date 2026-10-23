import { FINANCE_TAX_COPY as COPY } from "@/constants/nomina-finanzas-copy.constants";
import type { NominaFinance } from "@/domain/entities/nomina-finance";
import type { FinanceKpi, MonthlyTaxRow } from "@/types/nomina-finanzas.types";
import { formatExactCurrency } from "@/utils/format-exact-currency";
import { formatMonthLong } from "@/utils/format-nomina-dates";
import { formatOptionalPercent } from "@/utils/format-optional-percent";
import { shareOf } from "@/utils/share-of";
import { toFinanceFigures } from "@/utils/to-finance-figures";

/** Las cuatro cifras de Tributario; «Causado en…» es siempre el mes en curso (0 si queda fuera del periodo). */
export function buildTaxKpis(finance: NominaFinance, monthly: MonthlyTaxRow[]): FinanceKpi[] {
  const figures = toFinanceFigures(finance.totals);
  const current = monthly.find((row) => row.month === finance.currentMonth);

  return [
    { label: COPY.caused, value: formatExactCurrency(figures.taxes), delta: null, valueClassName: "text-danger" },
    { label: COPY.base, value: formatExactCurrency(figures.profit), delta: null },
    { label: COPY.rate, value: formatOptionalPercent(shareOf(figures.taxes, figures.profit)), delta: null },
    { label: COPY.causedIn(formatMonthLong(finance.currentMonth)), value: formatExactCurrency(current?.tax ?? 0), delta: null },
  ];
}

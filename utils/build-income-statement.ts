import { FINANCE_SUMMARY_COPY } from "@/constants/nomina-finanzas-copy.constants";
import type { NominaMonthSplit } from "@/domain/entities/nomina-bucket";
import type { IncomeStatement, StatementTone } from "@/types/nomina-finanzas.types";
import { computeNominaTax } from "@/utils/compute-nomina-tax";
import { formatExactCurrency } from "@/utils/format-exact-currency";
import { formatMonthTick } from "@/utils/format-nomina-dates";
import { formatOptionalPercent } from "@/utils/format-optional-percent";
import { shareOf } from "@/utils/share-of";

interface Column {
  income: number;
  service: number;
  investment: number;
  profit: number;
  taxes: number;
  netProfit: number;
}

/** Una columna del estado: lo que entró en el mes y cómo bajó hasta la utilidad neta. */
function toColumn(month: Pick<NominaMonthSplit, "income" | "service" | "profit" | "investment" | "expressInvestment">): Column {
  const taxes = computeNominaTax(month.profit);
  return { income: month.income, service: month.service, investment: month.investment + month.expressInvestment, profit: month.profit, taxes, netProfit: month.profit - taxes };
}

const ROWS: { label: string; tone: StatementTone; field: keyof Column }[] = [
  { label: "Ingresos brutos", tone: "strong", field: "income" },
  { label: "(−) Servicio", tone: "plain", field: "service" },
  { label: "(−) Inversión en Ads", tone: "plain", field: "investment" },
  { label: "= Utilidad bruta", tone: "strong", field: "profit" },
  { label: "(−) Impuestos (30%)", tone: "plain", field: "taxes" },
  { label: "= Utilidad neta", tone: "net", field: "netProfit" },
];

/** Estado de resultados mes a mes con la columna del total del periodo. */
export function buildIncomeStatement(months: NominaMonthSplit[]): IncomeStatement {
  const total = months.reduce(
    (sum, month) => ({ income: sum.income + month.income, service: sum.service + month.service, profit: sum.profit + month.profit, investment: sum.investment + month.investment, expressInvestment: sum.expressInvestment + month.expressInvestment }),
    { income: 0, service: 0, profit: 0, investment: 0, expressInvestment: 0 },
  );
  const columns = [...months.map(toColumn), toColumn(total)];

  return {
    columns: [...months.map((month) => formatMonthTick(month.month)), FINANCE_SUMMARY_COPY.statementTotal],
    rows: [
      ...ROWS.map(({ label, tone, field }) => ({ label, tone, cells: columns.map((column) => formatExactCurrency(column[field])) })),
      { label: "Margen neto", tone: "margin", cells: columns.map((column) => formatOptionalPercent(shareOf(column.netProfit, column.income))) },
    ],
  };
}

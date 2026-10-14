import { NOMINA_TAX_RATE } from "@/constants/nomina.constants";
import { FINANCE_TAX_COPY } from "@/constants/nomina-finanzas-copy.constants";
import type { MonthlyTaxTableProps } from "@/types/nomina-finanzas-props.types";
import { cn } from "@/utils/cn";
import { formatExactCurrency } from "@/utils/format-exact-currency";
import { formatMonthLong } from "@/utils/format-nomina-dates";
import { NOMINA_ROW_CLASSES, NOMINA_TABLE_SCROLL_CLASSES, NOMINA_TD_CLASSES, NOMINA_TH_CLASSES } from "@/utils/nomina-table-styles";

const RATE = `${Math.round(NOMINA_TAX_RATE * 100)}%`;

/** Detalle tributario mes a mes, del más reciente al más antiguo. Los meses sin base se atenúan. */
export function MonthlyTaxTable({ rows }: MonthlyTaxTableProps) {
  const right = cn(NOMINA_TD_CLASSES, "text-right");

  return (
    <div className={NOMINA_TABLE_SCROLL_CLASSES}>
      <table className="w-full min-w-[640px] border-collapse">
        <thead>
          <tr className="border-b border-border">
            {FINANCE_TAX_COPY.monthlyColumns.map((column, index) => (
              <th key={column} scope="col" className={cn(NOMINA_TH_CLASSES, index === 0 ? "text-left" : "text-right")}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.month} className={cn(NOMINA_ROW_CLASSES, row.base <= 0 && "opacity-55")}>
              <th scope="row" className={cn(NOMINA_TD_CLASSES, "text-left font-normal text-text-primary")}>{formatMonthLong(row.month)}</th>
              <td className={right}>{formatExactCurrency(row.base)}</td>
              <td className={right}>{row.base > 0 ? RATE : "—"}</td>
              <td className={cn(right, row.tax > 0 && "text-danger")}>{formatExactCurrency(row.tax)}</td>
              <td className={cn(right, "text-success")}>{formatExactCurrency(row.netProfit)}</td>
              <td className={right}>{formatExactCurrency(row.cumulative)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

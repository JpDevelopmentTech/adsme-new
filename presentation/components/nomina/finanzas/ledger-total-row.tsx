import { FINANCE_LEDGER_COPY } from "@/constants/nomina-finanzas-copy.constants";
import type { LedgerTotalRowProps } from "@/types/nomina-finanzas-props.types";
import { cn } from "@/utils/cn";
import { formatExactCurrency } from "@/utils/format-exact-currency";
import { NOMINA_TD_CLASSES } from "@/utils/nomina-table-styles";

/** Totales del periodo (o del artista filtrado) al pie del libro. */
export function LedgerTotalRow({ totals }: LedgerTotalRowProps) {
  const cell = cn(NOMINA_TD_CLASSES, "py-4 text-right font-normal text-text-primary");

  return (
    <tr className="bg-surface">
      <th scope="row" colSpan={4} className={cn(NOMINA_TD_CLASSES, "rounded-l-sm py-4 text-left font-normal text-text-primary")}>
        {FINANCE_LEDGER_COPY.total}
      </th>
      <td className={cell}>{formatExactCurrency(totals.amount)}</td>
      <td className={cell}>{formatExactCurrency(totals.service)}</td>
      <td className={cell}>{formatExactCurrency(totals.profit)}</td>
      <td className={cn(cell, "text-danger")}>{formatExactCurrency(totals.taxes)}</td>
      <td className={cn(cell, "text-success")}>{formatExactCurrency(totals.netProfit)}</td>
      <td className={cn(cell, "rounded-r-sm")}>{formatExactCurrency(totals.investment)}</td>
    </tr>
  );
}

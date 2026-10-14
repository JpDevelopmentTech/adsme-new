import { HISTORY_TAB_COPY } from "@/constants/nomina-perfil-tabs-copy.constants";
import type { BudgetRowProps } from "@/types/nomina-perfil.types";
import { cn } from "@/utils/cn";
import { formatExactCurrency } from "@/utils/format-exact-currency";
import { formatMonthLong } from "@/utils/format-nomina-dates";
import { NOMINA_ROW_CLASSES, NOMINA_TD_CLASSES } from "@/utils/nomina-table-styles";
import { splitBudgetMonth } from "@/utils/split-budget-month";

/** Fila de un mes del presupuesto; los meses sin movimientos quedan atenuados. */
export function BudgetRow({ month, isCurrent }: BudgetRowProps) {
  const { taxes } = splitBudgetMonth(month);
  const amountClasses = cn(NOMINA_TD_CLASSES, "text-right");

  return (
    <tr className={cn(NOMINA_ROW_CLASSES, month.income === 0 && "opacity-55")}>
      <th scope="row" className={cn(NOMINA_TD_CLASSES, "text-left font-normal text-text-primary")}>
        <span className="flex items-center gap-2">
          {formatMonthLong(month.month)}
          {isCurrent ? <span className="rounded-pill bg-lilac/16 px-2 py-0.5 text-[11px] text-lilac">{HISTORY_TAB_COPY.current}</span> : null}
        </span>
      </th>
      <td className={amountClasses}>{formatExactCurrency(month.income)}</td>
      <td className={cn(NOMINA_TD_CLASSES, "text-center")}>
        {month.shows} / {month.minShows}
      </td>
      <td className={amountClasses}>{formatExactCurrency(month.service)}</td>
      <td className={amountClasses}>{formatExactCurrency(month.profit)}</td>
      <td className={cn(amountClasses, "text-danger")}>{formatExactCurrency(taxes)}</td>
      <td className={amountClasses}>{formatExactCurrency(month.receivedBudget)}</td>
      <td className={cn(amountClasses, "bg-lilac/8 font-normal text-text-primary")}>{formatExactCurrency(month.leftBudget)}</td>
    </tr>
  );
}

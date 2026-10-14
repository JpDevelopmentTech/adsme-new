import { ExpenseRowActions } from "@/presentation/components/nomina/modales/expense-row-actions";
import { ExpenseTargetChip } from "@/presentation/components/nomina/perfil/expense-target-chip";
import type { ExpenseRowProps } from "@/types/nomina-perfil.types";
import { cn } from "@/utils/cn";
import { formatExactCurrency } from "@/utils/format-exact-currency";
import { formatMonthShort, formatShortDate } from "@/utils/format-nomina-dates";
import { NOMINA_ROW_CLASSES, NOMINA_TD_CLASSES } from "@/utils/nomina-table-styles";

/** Fila de un gasto: concepto con proveedor, monto, bolsa, fechas y acciones. */
export function ExpenseRow({ artist, expense, isReadOnly = false }: ExpenseRowProps) {
  const detail = [expense.provider, expense.description].filter(Boolean).join(" · ");

  return (
    <tr className={NOMINA_ROW_CLASSES}>
      <td className={cn(NOMINA_TD_CLASSES, "whitespace-normal")}>
        <p className="font-normal text-text-primary">{expense.concept}</p>
        {detail ? <p className="pt-0.5 text-xs text-text-muted">{detail}</p> : null}
      </td>
      <td className={cn(NOMINA_TD_CLASSES, "text-right font-normal text-text-primary")}>{formatExactCurrency(expense.amount)}</td>
      <td className={cn(NOMINA_TD_CLASSES, "text-center")}>
        <ExpenseTargetChip target={expense.target} />
      </td>
      <td className={NOMINA_TD_CLASSES}>{formatShortDate(expense.date)}</td>
      <td className={NOMINA_TD_CLASSES}>{formatMonthShort(expense.assignedMonth)}</td>
      {isReadOnly ? null : (
        <td className={cn(NOMINA_TD_CLASSES, "text-right")}>
          <ExpenseRowActions artist={artist} expense={expense} />
        </td>
      )}
    </tr>
  );
}

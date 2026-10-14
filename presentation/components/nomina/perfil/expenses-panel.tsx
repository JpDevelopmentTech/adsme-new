import { FINANCE_TAB_COPY } from "@/constants/nomina-perfil-copy.constants";
import { NominaPanel } from "@/presentation/components/nomina/nomina-panel";
import { ExpenseRow } from "@/presentation/components/nomina/perfil/expense-row";
import { TotalFigure } from "@/presentation/components/nomina/perfil/total-figure";
import type { ExpensesPanelProps } from "@/types/nomina-perfil.types";
import { cn } from "@/utils/cn";
import { NOMINA_TABLE_SCROLL_CLASSES, NOMINA_TH_CLASSES } from "@/utils/nomina-table-styles";
import { sumExpensesByTarget } from "@/utils/sum-expenses-by-target";

/** Panel «Gastos»: solo aparece si el artista tiene al menos un gasto. */
export function ExpensesPanel({ artist, expenses, isReadOnly = false }: ExpensesPanelProps) {
  if (expenses.length === 0) return null;
  const columns = FINANCE_TAB_COPY.expenseColumns;

  return (
    <NominaPanel isThick title={FINANCE_TAB_COPY.expensesTitle} subtitle={`${FINANCE_TAB_COPY.expensesSubtitle} ${artist.name}`}>
      <div className={NOMINA_TABLE_SCROLL_CLASSES}>
        <table className="w-full min-w-[640px] border-collapse text-left">
          <thead>
            <tr className="border-b border-border">
              <th scope="col" className={NOMINA_TH_CLASSES}>{columns.concept}</th>
              <th scope="col" className={cn(NOMINA_TH_CLASSES, "text-right")}>{columns.amount}</th>
              <th scope="col" className={cn(NOMINA_TH_CLASSES, "text-center")}>{columns.target}</th>
              <th scope="col" className={NOMINA_TH_CLASSES}>{columns.date}</th>
              <th scope="col" className={NOMINA_TH_CLASSES}>{columns.month}</th>
              {isReadOnly ? null : <th scope="col" className={cn(NOMINA_TH_CLASSES, "text-right")}>{columns.actions}</th>}
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <ExpenseRow key={expense.id} artist={artist} expense={expense} isReadOnly={isReadOnly} />
            ))}
          </tbody>
        </table>
      </div>
      <p className="flex flex-wrap items-center gap-x-5 gap-y-1 text-[11.5px]">
        <TotalFigure label={FINANCE_TAB_COPY.totalAds} title={FINANCE_TAB_COPY.targetAds} amount={sumExpensesByTarget(expenses, "ads")} />
        <TotalFigure label={FINANCE_TAB_COPY.totalService} title={FINANCE_TAB_COPY.targetService} amount={sumExpensesByTarget(expenses, "servicio")} />
      </p>
    </NominaPanel>
  );
}

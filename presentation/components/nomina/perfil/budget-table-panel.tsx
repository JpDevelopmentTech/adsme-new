import { HISTORY_TAB_COPY } from "@/constants/nomina-perfil-tabs-copy.constants";
import { NominaPanel } from "@/presentation/components/nomina/nomina-panel";
import { BudgetRow } from "@/presentation/components/nomina/perfil/budget-row";
import type { BudgetTableProps } from "@/types/nomina-perfil.types";
import { cn } from "@/utils/cn";
import { NOMINA_TABLE_SCROLL_CLASSES, NOMINA_TH_CLASSES } from "@/utils/nomina-table-styles";

/** Panel «Presupuesto mes a mes», del mes más reciente al más antiguo. Solo con datos. */
export function BudgetTablePanel({ months, currentMonth }: BudgetTableProps) {
  if (months.every((month) => month.income === 0)) return null;
  const columns = HISTORY_TAB_COPY.budgetColumns;
  const lastIndex = columns.length - 1;

  return (
    <NominaPanel isThick title={HISTORY_TAB_COPY.budgetTitle} subtitle={HISTORY_TAB_COPY.budgetSubtitle}>
      <div className={NOMINA_TABLE_SCROLL_CLASSES}>
        <table className="w-full min-w-[880px] border-collapse">
          <thead>
            <tr className="border-b border-border">
              {columns.map((column, index) => (
                <th
                  key={column}
                  scope="col"
                  className={cn(
                    NOMINA_TH_CLASSES,
                    index === 0 ? "text-left" : index === 2 ? "text-center" : "text-right",
                    index === lastIndex && "bg-lilac/8 text-lilac",
                  )}
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...months].reverse().map((month) => (
              <BudgetRow key={month.month} month={month} isCurrent={month.month === currentMonth} />
            ))}
          </tbody>
        </table>
      </div>
    </NominaPanel>
  );
}

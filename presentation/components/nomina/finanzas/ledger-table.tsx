import { FINANCE_LEDGER_COPY } from "@/constants/nomina-finanzas-copy.constants";
import { LedgerMoreRow } from "@/presentation/components/nomina/finanzas/ledger-more-row";
import { LedgerRow } from "@/presentation/components/nomina/finanzas/ledger-row";
import { LedgerTotalRow } from "@/presentation/components/nomina/finanzas/ledger-total-row";
import type { LedgerTableProps } from "@/types/nomina-finanzas-props.types";
import { cn } from "@/utils/cn";
import { NOMINA_TABLE_SCROLL_CLASSES, NOMINA_TH_CLASSES } from "@/utils/nomina-table-styles";

/** Las cuatro primeras columnas son texto; las demás, importes alineados a la derecha. */
const TEXT_COLUMNS = 4;

/** Tabla del libro: movimientos visibles, la fila para ver el resto y la de totales. */
export function LedgerTable({ entries, totals, hiddenCount, onShowAll }: LedgerTableProps) {
  return (
    <div className={NOMINA_TABLE_SCROLL_CLASSES}>
      <table className="w-full min-w-[960px] border-collapse">
        <thead>
          <tr className="border-b border-border">
            {FINANCE_LEDGER_COPY.columns.map((column, index) => (
              <th key={column} scope="col" className={cn(NOMINA_TH_CLASSES, index < TEXT_COLUMNS ? "text-left" : "text-right")}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <LedgerRow key={entry.id} entry={entry} />
          ))}
          {hiddenCount > 0 ? <LedgerMoreRow count={hiddenCount} onShowAll={onShowAll} /> : null}
        </tbody>
        <tfoot>
          <LedgerTotalRow totals={totals} />
        </tfoot>
      </table>
    </div>
  );
}

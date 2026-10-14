import { FINANCE_SUMMARY_COPY } from "@/constants/nomina-finanzas-copy.constants";
import type { IncomeStatementTableProps } from "@/types/nomina-finanzas-props.types";
import type { StatementTone } from "@/types/nomina-finanzas.types";
import { cn } from "@/utils/cn";
import { NOMINA_TABLE_SCROLL_CLASSES, NOMINA_TD_CLASSES, NOMINA_TH_CLASSES } from "@/utils/nomina-table-styles";

/** Clases de fila y de la celda fija del concepto según el peso de la fila. */
const TONE_ROW: Record<StatementTone, string> = {
  plain: "",
  strong: "bg-surface [&>*]:font-normal [&>*]:text-text-primary",
  net: "bg-surface [&>*]:font-normal [&>*]:text-success",
  margin: "[&>td:last-child]:font-normal [&>td:last-child]:text-text-primary",
};

/** La celda fija necesita fondo opaco para tapar lo que pasa por debajo. */
const STICKY = "sticky left-0 z-10 bg-[#130b25] text-left";
const STICKY_STRONG = "bg-[#1e1630]";

/**
 * Estado de resultados mes a mes. La columna «Concepto» queda fija al
 * desplazarse en horizontal para no perder qué fila se está leyendo.
 */
export function IncomeStatementTable({ statement }: IncomeStatementTableProps) {
  return (
    <div className={NOMINA_TABLE_SCROLL_CLASSES}>
      <table className="w-full min-w-[860px] border-collapse">
        <thead>
          <tr className="border-b border-border">
            <th scope="col" className={cn(NOMINA_TH_CLASSES, STICKY)}>{FINANCE_SUMMARY_COPY.statementConcept}</th>
            {statement.columns.map((column) => (
              <th key={column} scope="col" className={cn(NOMINA_TH_CLASSES, "text-right")}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {statement.rows.map((row) => (
            <tr key={row.label} className={cn("border-b border-border last:border-b-0", TONE_ROW[row.tone])}>
              <th scope="row" className={cn(NOMINA_TD_CLASSES, STICKY, "font-light text-text-primary", (row.tone === "strong" || row.tone === "net") && STICKY_STRONG)}>
                {row.label}
              </th>
              {row.cells.map((cell, index) => (
                <td key={statement.columns[index]} className={cn(NOMINA_TD_CLASSES, "text-right", index === row.cells.length - 1 && "font-normal text-text-primary")}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

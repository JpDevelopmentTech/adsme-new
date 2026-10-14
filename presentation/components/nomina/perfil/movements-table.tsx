"use client";

import { ChevronsDown } from "lucide-react";
import { useState } from "react";
import { FINANCE_TAB_COPY } from "@/constants/nomina-perfil-copy.constants";
import { MovementRow } from "@/presentation/components/nomina/perfil/movement-row";
import { MovementTotals } from "@/presentation/components/nomina/perfil/movement-totals";
import type { MovementsTableProps } from "@/types/nomina-perfil.types";
import { cn } from "@/utils/cn";
import { NOMINA_TABLE_SCROLL_CLASSES, NOMINA_TH_CLASSES } from "@/utils/nomina-table-styles";

/**
 * Tabla del desglose con filas expandibles. La primera llega abierta para que
 * el detalle económico se descubra sin buscarlo; el chevron de la cabecera
 * abre o cierra todas.
 */
export function MovementsTable({ artist, movements, totals, incomeContext, isReadOnly = false }: MovementsTableProps) {
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set(movements.slice(0, 1).map((movement) => movement.id)));
  const isAllExpanded = expanded.size === movements.length;
  const allLabel = isAllExpanded ? FINANCE_TAB_COPY.collapseAll : FINANCE_TAB_COPY.expandAll;
  const columns = FINANCE_TAB_COPY.columns;

  function toggle(id: string) {
    setExpanded((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <>
      <div className={NOMINA_TABLE_SCROLL_CLASSES}>
        <table className="w-full min-w-[720px] border-collapse text-left">
          <thead>
            <tr className="border-b border-border">
              <th scope="col" className="w-9 py-2 pl-2.5">
                <button
                  type="button"
                  onClick={() => setExpanded(isAllExpanded ? new Set() : new Set(movements.map((movement) => movement.id)))}
                  aria-label={allLabel}
                  title={allLabel}
                  className="grid size-7 cursor-pointer place-items-center rounded-sm text-text-muted hover:text-text-primary focus-visible:ring-2 focus-visible:ring-lilac focus-visible:outline-none"
                >
                  <ChevronsDown size={14} strokeWidth={1.75} className={cn("transition-transform", isAllExpanded && "rotate-180")} aria-hidden />
                </button>
              </th>
              <th scope="col" className={NOMINA_TH_CLASSES}>{columns.concept}</th>
              <th scope="col" className={cn(NOMINA_TH_CLASSES, "text-right")}>{columns.amount}</th>
              <th scope="col" className={NOMINA_TH_CLASSES}>{columns.eventDate}</th>
              <th scope="col" className={NOMINA_TH_CLASSES}>{columns.incomeDate}</th>
              <th scope="col" className={NOMINA_TH_CLASSES}>{columns.assignedMonth}</th>
              {isReadOnly ? null : <th scope="col" className={cn(NOMINA_TH_CLASSES, "text-right")}>{columns.actions}</th>}
            </tr>
          </thead>
          <tbody>
            {movements.map((movement) => (
              <MovementRow
                key={movement.id}
                artist={artist}
                movement={movement}
                isExpanded={expanded.has(movement.id)}
                onToggle={toggle}
                incomeContext={incomeContext}
                isReadOnly={isReadOnly}
              />
            ))}
          </tbody>
        </table>
      </div>
      <MovementTotals totals={totals} />
    </>
  );
}

import { ChevronRight } from "lucide-react";
import { FINANCE_TAB_COPY } from "@/constants/nomina-perfil-copy.constants";
import { MovementRowActions } from "@/presentation/components/nomina/modales/movement-row-actions";
import { MovementDetail } from "@/presentation/components/nomina/perfil/movement-detail";
import type { MovementRowProps } from "@/types/nomina-perfil.types";
import { cn } from "@/utils/cn";
import { formatExactCurrency } from "@/utils/format-exact-currency";
import { formatMovementConcept } from "@/utils/format-movement-concept";
import { formatMonthShort, formatShortDate } from "@/utils/format-nomina-dates";
import { NOMINA_TD_CLASSES } from "@/utils/nomina-table-styles";

/** Fila de un movimiento con su chevron y, al expandirla, su detalle económico debajo. */
export function MovementRow({ artist, movement, isExpanded, onToggle, isReadOnly = false }: MovementRowProps) {
  const toggleLabel = isExpanded ? FINANCE_TAB_COPY.collapseRow : FINANCE_TAB_COPY.expandRow;
  const detailId = `detalle-${movement.id}`;

  return (
    <>
      <tr className={cn("border-b border-border", isExpanded && "border-b-0 bg-white/[0.03]")}>
        <td className="w-9 py-2 pl-2.5">
          <button
            type="button"
            onClick={() => onToggle(movement.id)}
            aria-expanded={isExpanded}
            aria-controls={isExpanded ? detailId : undefined}
            aria-label={toggleLabel}
            title={toggleLabel}
            className="grid size-7 cursor-pointer place-items-center rounded-sm text-text-secondary hover:text-text-primary focus-visible:ring-2 focus-visible:ring-lilac focus-visible:outline-none"
          >
            <ChevronRight size={15} strokeWidth={1.75} className={cn("transition-transform", isExpanded && "rotate-90")} aria-hidden />
          </button>
        </td>
        <td className={cn(NOMINA_TD_CLASSES, "font-normal text-text-primary")}>{formatMovementConcept(movement)}</td>
        <td className={cn(NOMINA_TD_CLASSES, "text-right font-normal text-text-primary")}>{formatExactCurrency(movement.amount)}</td>
        <td className={NOMINA_TD_CLASSES}>{formatShortDate(movement.eventDate)}</td>
        <td className={NOMINA_TD_CLASSES}>{formatShortDate(movement.incomeDate)}</td>
        <td className={NOMINA_TD_CLASSES}>{formatMonthShort(movement.assignedMonth)}</td>
        {isReadOnly ? null : (
          <td className={cn(NOMINA_TD_CLASSES, "text-right")}>
            <MovementRowActions artist={artist} movement={movement} />
          </td>
        )}
      </tr>
      {isExpanded ? (
        <tr id={detailId} className="border-b border-border bg-white/[0.03]">
          <td colSpan={isReadOnly ? 6 : 7} className="px-2.5 pb-4 sm:pl-11">
            <MovementDetail movement={movement} />
          </td>
        </tr>
      ) : null}
    </>
  );
}

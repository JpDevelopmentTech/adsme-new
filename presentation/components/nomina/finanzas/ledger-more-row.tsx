import { FINANCE_LEDGER_COPY as COPY } from "@/constants/nomina-finanzas-copy.constants";
import type { LedgerMoreRowProps } from "@/types/nomina-finanzas-props.types";

/** Fila que avisa de cuántos movimientos quedan ocultos y los muestra al pulsarla. */
export function LedgerMoreRow({ count, onShowAll }: LedgerMoreRowProps) {
  return (
    <tr className="border-b border-border">
      <td colSpan={COPY.columns.length} className="p-0">
        <button
          type="button"
          onClick={onShowAll}
          className="w-full cursor-pointer py-3 text-center text-xs text-text-muted transition-colors hover:text-text-primary focus-visible:ring-2 focus-visible:ring-lilac focus-visible:outline-none"
        >
          {COPY.more(count)}
        </button>
      </td>
    </tr>
  );
}

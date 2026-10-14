import { MousePointer2 } from "lucide-react";
import { FINANCE_FLOW_COPY as COPY } from "@/constants/nomina-finanzas-copy.constants";
import type { SankeyHoverLineProps } from "@/types/nomina-sankey.types";
import { formatExactCurrency } from "@/utils/format-exact-currency";
import { formatPercent } from "@/utils/format-percent";

/** Línea bajo el Sankey que cuenta el flujo resaltado, o invita a pasar el ratón. */
export function SankeyHoverLine({ link, total }: SankeyHoverLineProps) {
  return (
    <p
      aria-live="polite"
      className="flex w-fit max-w-full flex-wrap items-center gap-x-2 gap-y-1 rounded-md border border-border bg-surface px-3.5 py-2.5 text-[13px] text-text-secondary"
    >
      <MousePointer2 size={14} strokeWidth={1.5} className="shrink-0 text-text-muted" aria-hidden />
      {link ? (
        <span>
          <strong className="font-normal text-text-primary">{link.sourceLabel}</strong>
          <span className="px-1.5 text-text-muted">→</span>
          <strong className="font-normal text-text-primary">{link.targetLabel}</strong>
          {`: ${formatExactCurrency(link.value)} · ${total > 0 ? formatPercent((link.value / total) * 100) : "—"} ${COPY.ofIncome}`}
        </span>
      ) : (
        <span>{COPY.hint}</span>
      )}
    </p>
  );
}

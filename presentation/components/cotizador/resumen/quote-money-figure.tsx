import { formatQuoteMoney } from "@/domain/use-cases/quote/format-quote-money";
import type { QuoteMoneyFigureProps } from "@/types/quote-summary.types";
import { cn } from "@/utils/cn";

/** Cifra de contexto con su rótulo, en un panel de vidrio. */
export function QuoteMoneyFigure({ label, value, currency, tone }: QuoteMoneyFigureProps) {
  return (
    <div className="glass-panel flex min-w-0 flex-col gap-1 rounded-tile px-3 py-2.5">
      <span className="text-[11px] text-text-muted">{label}</span>
      <span className={cn("text-[13px] font-normal tabular-nums break-words", tone ?? "text-text-primary")}>{formatQuoteMoney(value, currency)}</span>
    </div>
  );
}

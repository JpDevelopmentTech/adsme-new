import { formatQuoteMoney } from "@/domain/use-cases/quote/format-quote-money";
import type { QuoteShareBarProps } from "@/types/quote-summary.types";

/**
 * Barra proporcional del total: cada tramo mide lo que pesa en la suma. La
 * leyenda acompaña al color para que no dependa solo de él.
 */
export function QuoteShareBar({ label, segments, currency }: QuoteShareBarProps) {
  const total = segments.reduce((sum, segment) => sum + Math.max(0, segment.value), 0);
  const summary = segments.map((segment) => `${segment.label} ${formatQuoteMoney(segment.value, currency)}`).join(", ");

  return (
    <div className="flex flex-col gap-2">
      <div role="img" aria-label={`${label}: ${summary}`} className="flex h-2 w-full gap-0.5 overflow-hidden rounded-pill bg-surface">
        {total > 0
          ? segments.map((segment) => (
              <span key={segment.label} className="h-full rounded-pill" style={{ width: `${(Math.max(0, segment.value) / total) * 100}%`, backgroundColor: segment.color }} />
            ))
          : null}
      </div>
      <ul aria-hidden className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-text-muted">
        {segments.map((segment) => (
          <li key={segment.label} className="flex items-center gap-1.5">
            <span className="size-2 rounded-pill" style={{ backgroundColor: segment.color }} />
            {segment.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

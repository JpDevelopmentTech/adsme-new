"use client";

import { CollapsedChip } from "@/presentation/components/cotizador/plataformas/collapsed-chip";
import { formatQuoteMoney, formatQuotePct } from "@/domain/use-cases/quote/format-quote-money";
import { useQuote } from "@/presentation/hooks/use-quote";
import type { PlatformFiguresProps } from "@/types/quote-platforms.types";
import { quoteLineDisplayLabel } from "@/utils/quote-line-display-label";
import { quoteSharePct } from "@/utils/quote-share-pct";

/** Resumen de la plataforma recogida: un chip por línea de pauta. */
export function PlatformCollapsedSummary({ platform, figures }: PlatformFiguresProps) {
  const { state } = useQuote();
  const count = platform.lines.length;
  const showPct = count > 1 && figures.pauta > 0;

  return (
    <ul className="flex flex-wrap gap-2">
      {platform.lines.map((line, index) => (
        <CollapsedChip
          key={line.id}
          label={quoteLineDisplayLabel(line.label, index, count)}
          amount={formatQuoteMoney(figures.lineValues[index] ?? 0, state.draft.currency)}
          pct={showPct ? `${formatQuotePct(quoteSharePct(figures.lineValues[index] ?? 0, figures.pauta))}%` : null}
        />
      ))}
    </ul>
  );
}

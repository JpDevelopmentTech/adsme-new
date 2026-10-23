"use client";

import { PLATFORM_FOOTER_COPY as COPY, QUOTE_MONEY_EPSILON } from "@/constants/quote-platforms-copy.constants";
import { formatQuoteMoney } from "@/domain/use-cases/quote/format-quote-money";
import { QuoteNumberField } from "@/presentation/components/cotizador/campos/quote-number-field";
import { FooterStat } from "@/presentation/components/cotizador/plataformas/footer-stat";
import { useQuote } from "@/presentation/hooks/use-quote";
import { useQuoteFigures } from "@/presentation/hooks/use-quote-figures";
import { useQuoteSnapshot } from "@/presentation/hooks/use-quote-snapshot";
import type { PlatformFiguresProps } from "@/types/quote-platforms.types";
import { cn } from "@/utils/cn";
import { quoteSharePct } from "@/utils/quote-share-pct";

/** Pie de la tarjeta: descuento, ganancia y servicios; a la derecha el total y su % del total general. */
export function PlatformCardFooter({ platform, figures }: PlatformFiguresProps) {
  const { state, dispatch } = useQuote();
  const { grand } = useQuoteFigures();
  const snapshot = useQuoteSnapshot();
  const money = (value: number) => formatQuoteMoney(value, state.draft.currency);

  return (
    <footer className={cn("-mx-5 -mb-5 flex flex-wrap items-end justify-between gap-4 rounded-b-card border-t px-5 py-4 sm:-mx-6 sm:-mb-6 sm:px-6", platform.locked ? "border-lilac/30 bg-lilac/8" : "border-border bg-surface")}>
      <div className="grid min-w-0 flex-1 basis-64 grid-cols-3 gap-3">
        <FooterStat label={COPY.totalDiscount} value={money(figures.discount)} tone={figures.discount > QUOTE_MONEY_EPSILON ? "warning" : "default"} />
        <FooterStat label={COPY.profit} value={money(figures.fee)} tone={figures.fee < 0 ? "danger" : "success"} />
        <FooterStat label={COPY.services} value={money(figures.service)} />
      </div>
      <div className="flex items-end gap-3">
        <div className="flex min-w-0 flex-col items-end gap-0.5">
          <span className="text-xs text-text-secondary">{`${COPY.totalPrefix} ${platform.name}`}</span>
          <span className="text-2xl font-extralight text-text-primary tabular-nums">{money(figures.total)}</span>
        </div>
        <span title={COPY.shareLabel} className="w-[104px]">
          <QuoteNumberField
            value={quoteSharePct(figures.total, grand)}
            kind="pct"
            label={COPY.share}
            isLabelVisible
            size="sm"
            isReadOnly={platform.locked}
            onValueChange={(pct) => dispatch({ type: "setPlatformShare", platformId: platform.id, pct })}
            {...snapshot}
          />
        </span>
      </div>
    </footer>
  );
}

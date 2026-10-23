"use client";

import { PLATFORM_FEES_COPY as COPY, QUOTE_MONEY_EPSILON } from "@/constants/quote-platforms-copy.constants";
import { formatQuoteMoney, formatQuotePct } from "@/domain/use-cases/quote/format-quote-money";
import { QuoteNumberField } from "@/presentation/components/cotizador/campos/quote-number-field";
import { FieldHeading } from "@/presentation/components/cotizador/plataformas/field-heading";
import { FigureRow } from "@/presentation/components/cotizador/plataformas/figure-row";
import { useQuote } from "@/presentation/hooks/use-quote";
import { useQuoteSnapshot } from "@/presentation/hooks/use-quote-snapshot";
import type { PlatformFiguresProps } from "@/types/quote-platforms.types";
import { cn } from "@/utils/cn";

/** «% AdsME sobre valor a trabajar»: el % que se cobra o su descuento, y la comisión que deja. */
export function PlatformFeeBlock({ platform, figures }: PlatformFiguresProps) {
  const { state, dispatch } = useQuote();
  const snapshot = useQuoteSnapshot();
  const { currency, settings } = state.draft;
  const hasDiscount = figures.feeDiscount > QUOTE_MONEY_EPSILON;
  const set = (field: "fee" | "feeDiscount", value: number) => dispatch({ type: "setPlatformField", platformId: platform.id, field, value });

  return (
    <div className={cn("glass-panel flex flex-col gap-3 rounded-tile p-4", hasDiscount && "ring-1 ring-warning/45 ring-inset")}>
      <FieldHeading label={COPY.feeTitle} note={`${COPY.feeStandardPrefix} ${formatQuotePct(settings.fee)}%`} isNoteWarning={hasDiscount} />
      <div className="grid grid-cols-2 gap-2">
        <QuoteNumberField value={platform.fee} kind="pct" label={COPY.feeCharged} isLabelVisible onValueChange={(value) => set("fee", value)} {...snapshot} />
        <QuoteNumberField value={figures.feeDiscount} kind={currency} label={COPY.feeDiscount} isLabelVisible onValueChange={(value) => set("feeDiscount", value)} {...snapshot} />
      </div>
      <div className="flex flex-col gap-1.5 border-t border-border pt-3">
        <FigureRow label={`${formatQuotePct(figures.shownPct)}${COPY.feeStandardSuffix}`} value={formatQuoteMoney(figures.feeStandard, currency)} />
        <FigureRow label={COPY.feeResult} value={formatQuoteMoney(figures.fee, currency)} isStrong />
      </div>
    </div>
  );
}

"use client";

import { QUOTE_GRAND_COPY } from "@/constants/quote-summary-copy.constants";
import { QUOTE_SHARE_COLORS } from "@/constants/quote-summary.constants";
import { formatQuoteMoney } from "@/domain/use-cases/quote/format-quote-money";
import { QuoteNumberField } from "@/presentation/components/cotizador/campos/quote-number-field";
import { QuoteGrandHeading } from "@/presentation/components/cotizador/resumen/quote-grand-heading";
import { QuoteGrandNote } from "@/presentation/components/cotizador/resumen/quote-grand-note";
import { QuoteMoneyFigure } from "@/presentation/components/cotizador/resumen/quote-money-figure";
import { QuoteShareBar } from "@/presentation/components/cotizador/resumen/quote-share-bar";
import { useQuote } from "@/presentation/hooks/use-quote";
import { useQuoteFigures } from "@/presentation/hooks/use-quote-figures";
import { useQuoteSnapshot } from "@/presentation/hooks/use-quote-snapshot";
import { cn } from "@/utils/cn";
import { describeQuoteGrandNote } from "@/utils/describe-quote-grand-note";

const TITLE_ID = "cotizador-total-general";

/**
 * Total general editable: al escribirlo queda fijo y se reparte entre las
 * plataformas en proporción. Debajo, la ganancia y el reparto agregado.
 */
export function QuoteGrandCard() {
  const { state, dispatch } = useQuote();
  const figures = useQuoteFigures();
  const snapshot = useQuoteSnapshot();
  const { currency, grandFixed, platforms } = state.draft;
  const note = describeQuoteGrandNote(grandFixed, platforms.length, figures.sum, figures.grand, currency);

  return (
    <section aria-labelledby={TITLE_ID} className="glass-thick flex flex-col gap-4 rounded-card p-5">
      <div className="flex flex-col gap-2">
        <QuoteGrandHeading titleId={TITLE_ID} isFixed={grandFixed} onRelease={() => dispatch({ type: "releaseGrand" })} />
        <QuoteNumberField value={figures.grand} kind={currency} label={QUOTE_GRAND_COPY.title} size="lg" onValueChange={(value) => dispatch({ type: "setGrand", value })} {...snapshot} />
        {note ? <QuoteGrandNote note={note} /> : null}
      </div>
      <div className="flex items-baseline justify-between gap-3 border-t border-border pt-4">
        <span className="text-[13px] text-text-secondary">{QUOTE_GRAND_COPY.profit}</span>
        <span className={cn("text-2xl font-extralight tabular-nums", figures.profit < 0 ? "text-danger" : "text-success")}>{formatQuoteMoney(figures.profit, currency)}</span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <QuoteMoneyFigure label={QUOTE_GRAND_COPY.pauta} value={figures.pauta} currency={currency} />
        <QuoteMoneyFigure label={QUOTE_GRAND_COPY.service} value={figures.service} currency={currency} />
        <QuoteMoneyFigure label={QUOTE_GRAND_COPY.discount} value={figures.discount} currency={currency} tone={figures.discount > 0.004 ? "text-warning" : undefined} />
      </div>
      <QuoteShareBar
        label={QUOTE_GRAND_COPY.barLabel}
        currency={currency}
        segments={[
          { label: QUOTE_GRAND_COPY.barService, value: figures.service, color: QUOTE_SHARE_COLORS.service },
          { label: QUOTE_GRAND_COPY.barProfit, value: figures.profit, color: QUOTE_SHARE_COLORS.profit },
          { label: QUOTE_GRAND_COPY.barPauta, value: figures.pauta, color: QUOTE_SHARE_COLORS.pauta },
        ]}
      />
    </section>
  );
}

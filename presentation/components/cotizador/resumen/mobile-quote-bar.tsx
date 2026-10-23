"use client";

import { QUOTE_MOBILE_BAR_COPY } from "@/constants/quote-summary-copy.constants";
import { QUOTE_FORM_ID, QUOTE_SUMMARY_ID } from "@/constants/quote-summary.constants";
import { formatQuoteMoney } from "@/domain/use-cases/quote/format-quote-money";
import { QuoteMobileNavButton } from "@/presentation/components/cotizador/resumen/quote-mobile-nav-button";
import { useQuote } from "@/presentation/hooks/use-quote";
import { useQuoteFigures } from "@/presentation/hooks/use-quote-figures";
import { useQuotePanelVisible } from "@/presentation/hooks/use-quote-panel-visible";

const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

/**
 * Barra inferior en pantallas pequeñas: el total general efectivo (el fijo si
 * lo hay, igual que la columna) y el salto entre el formulario y la cotización.
 * Va pegada abajo dentro del área con scroll para no tapar el pie al final.
 */
export function MobileQuoteBar() {
  const { state } = useQuote();
  const figures = useQuoteFigures();
  const isQuoteVisible = useQuotePanelVisible();

  return (
    <div className="sticky bottom-[calc(12px+env(safe-area-inset-bottom))] z-30 xl:hidden">
      <nav aria-label={QUOTE_MOBILE_BAR_COPY.nav} className="glass-menu flex items-center justify-between gap-3 rounded-card py-2 pr-2 pl-4">
        <div className="flex min-w-0 flex-col">
          <span className="text-[11px] text-text-muted">{QUOTE_MOBILE_BAR_COPY.label}</span>
          <span className="truncate text-lg font-extralight tabular-nums">{formatQuoteMoney(figures.grand, state.draft.currency)}</span>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <QuoteMobileNavButton label={QUOTE_MOBILE_BAR_COPY.edit} isActive={!isQuoteVisible} onClick={() => scrollTo(QUOTE_FORM_ID)} />
          <QuoteMobileNavButton label={QUOTE_MOBILE_BAR_COPY.quote} isActive={isQuoteVisible} onClick={() => scrollTo(QUOTE_SUMMARY_ID)} />
        </div>
      </nav>
    </div>
  );
}

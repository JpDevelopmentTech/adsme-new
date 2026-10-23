"use client";

import { SlidersHorizontal } from "lucide-react";
import { useRef, useState } from "react";
import { QUOTE_HEADER_COPY } from "@/constants/quote-summary-copy.constants";
import { QuoteCurrencySwitch } from "@/presentation/components/cotizador/cabecera/quote-currency-switch";
import { QuoteNewButton } from "@/presentation/components/cotizador/cabecera/quote-new-button";
import { QuoteSettingsPanel } from "@/presentation/components/cotizador/cabecera/quote-settings-panel";
import { QuoteTrmField } from "@/presentation/components/cotizador/cabecera/quote-trm-field";
import { SecondaryButton } from "@/presentation/components/ui/secondary-button";
import { useQuote } from "@/presentation/hooks/use-quote";

const SETTINGS_ID = "cotizador-tarifas";

/** Cabecera: título, TRM, moneda, tarifas base y nueva cotización. */
export function QuoteHeader() {
  const { state } = useQuote();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [hasAskedUsd, setHasAskedUsd] = useState(false);
  const trmRef = useRef<HTMLDivElement>(null);
  const { currency, settings } = state.draft;
  const isTrmNeeded = !settings.trm && (hasAskedUsd || currency === "USD");

  const askForTrm = () => {
    setHasAskedUsd(true);
    trmRef.current?.querySelector("input")?.focus();
  };

  return (
    <header className="flex flex-col gap-4">
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
        <div className="flex min-w-0 flex-col gap-1">
          <h1 className="text-[28px] leading-tight font-light tracking-[-0.5px] text-text-primary">{QUOTE_HEADER_COPY.title}</h1>
          <p className="text-[13px] text-text-muted">{QUOTE_HEADER_COPY.subtitle}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <QuoteTrmField isNeeded={isTrmNeeded} onEdit={() => setHasAskedUsd(false)} fieldRef={trmRef} />
          <QuoteCurrencySwitch onMissingTrm={askForTrm} />
          <SecondaryButton
            type="button"
            icon={<SlidersHorizontal size={15} strokeWidth={1.6} aria-hidden />}
            aria-expanded={isSettingsOpen}
            aria-controls={SETTINGS_ID}
            onClick={() => setIsSettingsOpen((open) => !open)}
            className="h-10"
          >
            {QUOTE_HEADER_COPY.settings}
          </SecondaryButton>
          <QuoteNewButton />
        </div>
      </div>
      {isSettingsOpen ? <QuoteSettingsPanel id={SETTINGS_ID} /> : null}
    </header>
  );
}

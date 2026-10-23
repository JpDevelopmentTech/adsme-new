"use client";

import { RotateCcw } from "lucide-react";
import { useState } from "react";
import { QUOTE_DOM_IDS } from "@/constants/quote-dom.constants";
import { QUOTE_HEADER_COPY } from "@/constants/quote-summary-copy.constants";
import { SecondaryButton } from "@/presentation/components/ui/secondary-button";
import { useQuote } from "@/presentation/hooks/use-quote";

/**
 * «Nueva cotización» con confirmación en línea: borra la cotización pero
 * conserva tarifas, TRM y moneda. Sin modal, para no cortar el trabajo.
 */
export function QuoteNewButton() {
  const { dispatch } = useQuote();
  const [isConfirming, setIsConfirming] = useState(false);

  if (!isConfirming) {
    return (
      <SecondaryButton type="button" icon={<RotateCcw size={15} strokeWidth={1.6} aria-hidden />} onClick={() => setIsConfirming(true)} className="h-10">
        {QUOTE_HEADER_COPY.newQuote}
      </SecondaryButton>
    );
  }

  return (
    <div role="group" aria-label={QUOTE_HEADER_COPY.newQuote} className="flex flex-wrap items-center gap-2">
      <span className="text-[13px] text-text-secondary">{QUOTE_HEADER_COPY.confirmQuestion}</span>
      <button
        type="button"
        onClick={() => {
          dispatch({ type: "new" });
          setIsConfirming(false);
          window.requestAnimationFrame(() => document.getElementById(QUOTE_DOM_IDS.artistInput)?.focus());
        }}
        className="h-10 cursor-pointer rounded-pill bg-danger px-4 text-[13px] whitespace-nowrap text-canvas transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-lilac focus-visible:outline-none"
      >
        {QUOTE_HEADER_COPY.confirmYes}
      </button>
      <SecondaryButton type="button" icon={null} onClick={() => setIsConfirming(false)} className="h-10">
        {QUOTE_HEADER_COPY.confirmCancel}
      </SecondaryButton>
    </div>
  );
}

"use client";

import { Save } from "lucide-react";
import { QUOTE_ACTIONS_COPY } from "@/constants/quote-summary-copy.constants";
import { QuoteMenuItem } from "@/presentation/components/cotizador/resumen/quote-menu-item";
import { QuoteSplitButton } from "@/presentation/components/cotizador/resumen/quote-split-button";
import { SecondaryButton } from "@/presentation/components/ui/secondary-button";
import type { QuoteActionsProps } from "@/types/quote-summary.types";

/** Salidas de la cotización: copiar para WhatsApp, los demás formatos y guardar el cliente. */
export function QuoteActions({ outputs }: QuoteActionsProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <QuoteSplitButton
        label={outputs.isCopied ? QUOTE_ACTIONS_COPY.copied : QUOTE_ACTIONS_COPY.whatsapp}
        hint={QUOTE_ACTIONS_COPY.whatsappHint}
        onClick={outputs.copyWhatsapp}
        menuLabel={QUOTE_ACTIONS_COPY.more}
      >
        <QuoteMenuItem label={QUOTE_ACTIONS_COPY.marker} hint={QUOTE_ACTIONS_COPY.markerHint} onSelect={outputs.copyMarker} />
        <QuoteMenuItem label={QUOTE_ACTIONS_COPY.doc} hint={QUOTE_ACTIONS_COPY.docHint} onSelect={outputs.copyDoc} />
        <QuoteMenuItem label={QUOTE_ACTIONS_COPY.pdf} onSelect={outputs.printPdf} />
      </QuoteSplitButton>
      <SecondaryButton type="button" icon={<Save size={15} strokeWidth={1.6} aria-hidden />} onClick={outputs.save} className="h-11">
        {QUOTE_ACTIONS_COPY.save}
      </SecondaryButton>
    </div>
  );
}

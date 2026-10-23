"use client";

import { QUOTE_DOCUMENT_COPY } from "@/constants/quote-summary-copy.constants";
import { QuoteActions } from "@/presentation/components/cotizador/resumen/quote-actions";
import { QuoteEntityPicker } from "@/presentation/components/cotizador/resumen/quote-entity-picker";
import { QuoteFallbackText } from "@/presentation/components/cotizador/resumen/quote-fallback-text";
import { QuotePaper } from "@/presentation/components/cotizador/resumen/quote-paper";
import { QuotePrintSheet } from "@/presentation/components/cotizador/resumen/quote-print-sheet";
import { useQuoteDocument } from "@/presentation/hooks/use-quote-document";
import { useQuoteOutputs } from "@/presentation/hooks/use-quote-outputs";

const TITLE_ID = "cotizador-documento";

/** Bloque «Cotización»: entidad de pago, la hoja que recibe el cliente y sus salidas. */
export function QuoteDocumentCard() {
  const document = useQuoteDocument();
  const outputs = useQuoteOutputs(document);

  return (
    <section aria-labelledby={TITLE_ID} className="glass-thick flex flex-col gap-4 rounded-card p-5">
      <h2 id={TITLE_ID} className="text-[15px] font-normal text-text-primary">{QUOTE_DOCUMENT_COPY.title}</h2>
      <QuoteEntityPicker />
      <QuotePaper document={document} />
      <QuoteActions outputs={outputs} />
      {outputs.fallbackText ? <QuoteFallbackText text={outputs.fallbackText} /> : null}
      <QuotePrintSheet document={document} printedAt={outputs.printedAt} />
    </section>
  );
}

"use client";

import { QUOTE_OUTPUT_TOASTS } from "@/constants/quote-summary-copy.constants";
import type { QuoteDocument } from "@/domain/entities/quote-document";
import { formatQuoteMoney } from "@/domain/use-cases/quote/format-quote-money";
import { useQuote } from "@/presentation/hooks/use-quote";
import { useQuoteClipboard } from "@/presentation/hooks/use-quote-clipboard";
import { useQuoteFigures } from "@/presentation/hooks/use-quote-figures";
import { useQuotePrint } from "@/presentation/hooks/use-quote-print";
import type { QuoteOutputs } from "@/types/quote-summary.types";
import { buildQuoteDocText } from "@/utils/build-quote-doc-text";
import { buildQuoteMarkerText } from "@/utils/build-quote-marker-text";
import { buildQuoteWhatsappText } from "@/utils/build-quote-whatsapp-text";

/**
 * Salidas de la cotización: WhatsApp, Doc, consulta al Marker y PDF. Cada una
 * guarda el cliente en silencio si tiene nombre; «Guardar» avisa siempre.
 */
export function useQuoteOutputs(document: QuoteDocument): QuoteOutputs {
  const { state, dispatch } = useQuote();
  const figures = useQuoteFigures();
  const clipboard = useQuoteClipboard();
  const printer = useQuotePrint();
  const { draft } = state;
  const hasPlatforms = draft.platforms.length > 0;

  const save = (isSilent: boolean) => dispatch({ type: "saveClient", totalText: formatQuoteMoney(figures.sum, draft.currency), isSilent });
  const needPlatform = () => dispatch({ type: "toast", message: QUOTE_OUTPUT_TOASTS.needPlatform });

  return {
    copyWhatsapp: () => { save(true); void clipboard.copy(buildQuoteWhatsappText(document), QUOTE_OUTPUT_TOASTS.whatsapp); },
    copyDoc: () => { save(true); void clipboard.copy(buildQuoteDocText(document), QUOTE_OUTPUT_TOASTS.doc); },
    copyMarker: () => {
      if (!hasPlatforms) return needPlatform();
      save(true);
      void clipboard.copy(buildQuoteMarkerText(document, draft), QUOTE_OUTPUT_TOASTS.marker);
    },
    printPdf: () => {
      if (!hasPlatforms) return needPlatform();
      save(true);
      printer.print(document.client);
    },
    save: () => save(false),
    isCopied: clipboard.isCopied,
    fallbackText: clipboard.fallbackText,
    printedAt: printer.printedAt,
  };
}

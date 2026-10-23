"use client";

import { useState } from "react";
import { flushSync } from "react-dom";
import { QUOTE_OUTPUT_TOASTS } from "@/constants/quote-summary-copy.constants";
import { useQuote } from "@/presentation/hooks/use-quote";
import type { QuotePrinter } from "@/types/quote-summary.types";
import { buildQuotePdfTitle } from "@/utils/build-quote-pdf-title";

/**
 * Imprime la hoja del PDF: fija la fecha de generación, pinta la hoja antes de
 * abrir el diálogo y pone como título «Cotizacion {cliente} x AdsME», que el
 * navegador usa como nombre del archivo.
 */
export function useQuotePrint(): QuotePrinter {
  const { dispatch } = useQuote();
  const [printedAt, setPrintedAt] = useState<Date | null>(null);

  const print = (client: string) => {
    flushSync(() => setPrintedAt(new Date()));
    const previousTitle = document.title;
    window.addEventListener("afterprint", () => {
      document.title = previousTitle;
      dispatch({ type: "toast", message: QUOTE_OUTPUT_TOASTS.pdfReady });
    }, { once: true });
    document.title = buildQuotePdfTitle(client);
    window.print();
  };

  return { printedAt, print };
}

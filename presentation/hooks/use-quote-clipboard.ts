"use client";

import { useEffect, useRef, useState } from "react";
import { QUOTE_OUTPUT_TOASTS } from "@/constants/quote-summary-copy.constants";
import { QUOTE_COPIED_MS } from "@/constants/quote-summary.constants";
import type { QuoteDraft } from "@/domain/entities/quote";
import { useQuote } from "@/presentation/hooks/use-quote";
import type { QuoteClipboard } from "@/types/quote-summary.types";

/**
 * Copia un texto de la cotización y lo confirma con un aviso y «✓ Copiado».
 * Si el portapapeles falla, deja el texto a la vista para copiarlo a mano
 * hasta el siguiente cambio de la cotización.
 */
export function useQuoteClipboard(): QuoteClipboard {
  const { state, dispatch } = useQuote();
  const [isCopied, setIsCopied] = useState(false);
  const [fallback, setFallback] = useState<{ text: string; draft: QuoteDraft } | null>(null);
  const timer = useRef<number | null>(null);

  useEffect(() => () => { if (timer.current) window.clearTimeout(timer.current); }, []);

  const copy = async (text: string, okMessage: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      setFallback({ text, draft: state.draft });
      dispatch({ type: "toast", message: QUOTE_OUTPUT_TOASTS.fallback });
      return;
    }
    setFallback(null);
    setIsCopied(true);
    dispatch({ type: "toast", message: okMessage });
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setIsCopied(false), QUOTE_COPIED_MS);
  };

  const fallbackText = fallback && fallback.draft === state.draft ? fallback.text : null;
  return { copy, isCopied, fallbackText };
}

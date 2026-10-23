"use client";

import { createContext, useEffect, useReducer } from "react";
import { QUOTE_SAVE_DELAY_MS, QUOTE_STORAGE_KEY } from "@/constants/quote-storage.constants";
import { createBlankQuote, defaultQuoteSettings } from "@/domain/use-cases/quote/create-quote-draft";
import { quoteReducer } from "@/presentation/store/quote-reducer";
import type { QuoteContextValue, QuoteProviderProps } from "@/types/quote-store.types";
import { readStoredQuotePrefs } from "@/utils/read-stored-quote-prefs";

export const QuoteContext = createContext<QuoteContextValue | null>(null);

/**
 * Estado del cotizador. Abre siempre una cotización en blanco con la TRM
 * oficial; del navegador recupera solo tarifas, moneda y secciones recogidas.
 */
export function QuoteProvider({ reference, children }: QuoteProviderProps) {
  const [state, dispatch] = useReducer(quoteReducer, undefined, () => {
    const settings = { ...defaultQuoteSettings(), trm: reference.officialTrm?.value ?? 0 };
    return {
      draft: createBlankQuote(settings),
      snapshot: null,
      toast: null,
      clients: reference.savedClients.map((client) => ({ ...client, draft: null })),
    };
  });

  useEffect(() => {
    const prefs = readStoredQuotePrefs(QUOTE_STORAGE_KEY);
    if (!prefs) return;
    const trm = reference.officialTrm?.value ?? prefs.settings.trm;
    const currency = prefs.currency === "USD" && !trm ? "COP" : prefs.currency;
    dispatch({ type: "replace", draft: { ...createBlankQuote({ ...prefs.settings, trm }, currency), sections: prefs.sections } });
  }, [reference.officialTrm]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const { settings, currency, sections } = state.draft;
        window.localStorage.setItem(QUOTE_STORAGE_KEY, JSON.stringify({ settings, currency, sections }));
      } catch {
        // Sin almacenamiento (modo privado): la cotización sigue funcionando sin recordar preferencias.
      }
    }, QUOTE_SAVE_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [state.draft]);

  return <QuoteContext.Provider value={{ state, dispatch, reference }}>{children}</QuoteContext.Provider>;
}

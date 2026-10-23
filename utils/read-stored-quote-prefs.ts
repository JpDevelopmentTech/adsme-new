import type { QuoteCurrency, QuoteSectionsUi, QuoteSettings } from "@/domain/entities/quote";

/** Preferencias del cotizador guardadas en el navegador. */
export interface StoredQuotePrefs {
  settings: QuoteSettings;
  currency: QuoteCurrency;
  sections: QuoteSectionsUi;
}

/** Lee las preferencias guardadas; `null` si no hay o no son válidas. */
export function readStoredQuotePrefs(key: string): StoredQuotePrefs | null {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null) return null;
    const prefs = parsed as Partial<StoredQuotePrefs>;
    if (!prefs.settings || !prefs.sections || (prefs.currency !== "COP" && prefs.currency !== "USD")) return null;
    return { settings: prefs.settings, currency: prefs.currency, sections: prefs.sections };
  } catch {
    return null;
  }
}

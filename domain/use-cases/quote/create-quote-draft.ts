import type { QuoteCurrency, QuoteDraft, QuoteLine, QuotePlatform, QuoteSettings, QuoteTarget } from "@/domain/entities/quote";
import type { QuotePlatformPreset } from "@/domain/entities/quote-catalog";

/** Identificador corto para líneas, segmentos y plataformas. */
export function newQuoteId(): string {
  return Math.random().toString(36).slice(2, 9);
}

/** Tarifas por defecto: 20 % y Servicio Marker de $300.000 o US$100. */
export function defaultQuoteSettings(): QuoteSettings {
  return { fee: 20, service: { COP: 300_000, USD: 100 }, trm: 0 };
}

export function createQuoteLine(): QuoteLine {
  return { id: newQuoteId(), label: "", amount: 0, locked: false, lockPct: 0 };
}

export function createQuoteTarget(pct: number | null): QuoteTarget {
  return { id: newQuoteId(), pct, places: [], zones: [] };
}

/** Plataforma recién agregada: el % estándar, un mes de servicio y una línea vacía. */
export function createQuotePlatform(preset: QuotePlatformPreset, fee: number): QuotePlatform {
  return {
    id: newQuoteId(), key: preset.key, name: preset.addedName, lines: [createQuoteLine()], fee,
    serviceOn: true, serviceDiscountPct: 0, anchor: "pauta", total: 0, months: 1, notes: "", collapsed: false, locked: false,
  };
}

/** Cotización en blanco; conserva las tarifas, la TRM y la moneda que se le pasen. */
export function createBlankQuote(settings: QuoteSettings = defaultQuoteSettings(), currency: QuoteCurrency = "COP"): QuoteDraft {
  return {
    currency, settings, artist: "", project: "", genres: [], customGenres: [], targets: [createQuoteTarget(100)],
    sex: "Todos", ageFrom: "18", ageTo: "50", interests: [], notes: "", terms: "", includePayments: true, platforms: [],
    entity: null, trmManual: false, grandFixed: false, grand: 0, campaignCollapsed: false,
    sections: { project: false, genre: false, target: false, sex: false, interests: true },
  };
}

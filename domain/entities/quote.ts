/** Moneda en la que se ve y se envía la cotización. */
export type QuoteCurrency = "COP" | "USD";

/** Plataformas que se pueden cotizar; «otra» se puede repetir. */
export type QuotePlatformKey = "youtube" | "tiktok" | "meta" | "spotify" | "google" | "otra";

/** Qué valor manda en la plataforma: el presupuesto total o la pauta real. */
export type QuoteAnchor = "pauta" | "total";

export type QuoteSex = "Todos" | "Mujeres" | "Hombres";

/** Tarifas base: % estándar, Servicio Marker por moneda y TRM (COP por 1 USD). */
export interface QuoteSettings {
  fee: number;
  service: Record<QuoteCurrency, number>;
  trm: number;
}

/** Segmento de público: % del presupuesto, países o regiones y zonas. */
export interface QuoteTarget {
  id: string;
  pct: number | null;
  places: string[];
  zones: string[];
}

/** Línea de pauta. El monto se guarda siempre en COP. */
export interface QuoteLine {
  id: string;
  label: string;
  amount: number;
  locked: boolean;
  /** Fracción 0..1 de la pauta que conserva una línea bloqueada. */
  lockPct: number;
}

/** Plataforma de la cotización. `total` en COP. */
export interface QuotePlatform {
  id: string;
  key: QuotePlatformKey;
  name: string;
  lines: QuoteLine[];
  fee: number;
  serviceOn: boolean;
  serviceDiscountPct: number;
  anchor: QuoteAnchor;
  total: number;
  months: number;
  notes: string;
  collapsed: boolean;
  locked: boolean;
}

/** Secciones de «Campaña» que se pueden recoger. */
export interface QuoteSectionsUi {
  project: boolean;
  genre: boolean;
  target: boolean;
  sex: boolean;
  interests: boolean;
}

/** Cotización en edición, con todo lo que se ve y se envía. */
export interface QuoteDraft {
  currency: QuoteCurrency;
  settings: QuoteSettings;
  artist: string;
  project: string;
  genres: string[];
  customGenres: string[];
  targets: QuoteTarget[];
  sex: QuoteSex;
  ageFrom: string;
  ageTo: string;
  interests: string[];
  notes: string;
  terms: string;
  includePayments: boolean;
  platforms: QuotePlatform[];
  /** Entidad elegida a mano; `null` sigue a la moneda. */
  entity: QuoteCurrency | null;
  trmManual: boolean;
  grandFixed: boolean;
  /** Total general fijo, en COP. */
  grand: number;
  campaignCollapsed: boolean;
  sections: QuoteSectionsUi;
}

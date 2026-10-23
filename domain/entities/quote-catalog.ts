import type { QuoteCurrency, QuotePlatformKey } from "@/domain/entities/quote";

/** Plataforma de interés: Meta, TikTok o Google. */
export type QuoteInterestPlatform = "M" | "T" | "G";

export interface QuoteInterest {
  name: string;
  category: string;
  platforms: QuoteInterestPlatform[];
}

export interface QuotePlace {
  code: string;
  name: string;
}

/** Zona agrupada de un país, con las ciudades que incluye. */
export interface QuoteZoneGroup {
  name: string;
  composition: string;
}

/** Zonas de un país: agrupadas, divisiones administrativas y ciudades. */
export interface QuoteCountryZones {
  /** Rótulo de las divisiones del país: Departamentos, Estados, Provincias… */
  regionLabel: string;
  groups: QuoteZoneGroup[];
  regions: string[];
  cities: string[];
}

export interface QuotePlatformPreset {
  key: QuotePlatformKey;
  name: string;
  /** Nombre con el que nace al agregarse. */
  addedName: string;
  color: string;
  linePlaceholder: string;
}

/** Listas de referencia del cotizador. */
export interface QuoteCatalog {
  genres: string[];
  interestCategories: string[];
  interests: QuoteInterest[];
  countries: QuotePlace[];
  regions: QuotePlace[];
  zones: Record<string, QuoteCountryZones>;
  ages: string[];
  presets: QuotePlatformPreset[];
  entities: Record<QuoteCurrency, string>;
}

/** TRM oficial vigente: pesos por 1 dólar y su fecha. */
export interface QuoteOfficialTrm {
  value: number;
  date: string;
  source: string;
}

/** Columna de métodos de pago del PDF; las primeras `bold` líneas van en negrita. */
export interface QuotePaymentColumn {
  title: string;
  lines: string[];
  bold: number;
}

/** Cliente con su última cotización guardada. */
export interface QuoteSavedClient {
  slug: string;
  name: string;
  updatedAt: string;
  total: string;
  currency: QuoteCurrency;
  count: number;
}

/** Todo lo que el cotizador necesita al abrir. */
export interface QuoteReference {
  catalog: QuoteCatalog;
  officialTrm: QuoteOfficialTrm | null;
  paymentColumns: QuotePaymentColumn[];
  savedClients: QuoteSavedClient[];
}

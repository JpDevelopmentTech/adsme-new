import type { ReportSpend } from "@/domain/entities/report-spend";

/** Gasto vacío: el de una plataforma sin campañas o un dato que no se pudo leer. */
export const EMPTY_REPORT_SPEND: ReportSpend = {
  nativeCop: 0,
  conversions: [],
  pending: {},
};

/** Textos con los que el reporte explica de dónde sale el gasto en pesos. */
export const REPORT_SPEND_COPY = {
  /** «$1.996.923 en pesos + US$876 × $4.000». Sin pesos, solo la conversión. */
  trmLine: (native: string | null, usd: string, rate: string) =>
    native ? `${native} en pesos + ${usd} × ${rate}` : `${usd} × ${rate}`,
  /** Varias TRM a la vez, en el reporte del artista. */
  trmMulti: (native: string | null, usd: string) =>
    native
      ? `${native} en pesos + ${usd} convertidos con la TRM de cada lanzamiento`
      : `${usd} convertidos con la TRM de cada lanzamiento`,
  /** Lo que no se suma al total, en la nota de una cifra: «+ US$450 sin convertir». */
  extra: (amounts: string) => `+ ${amounts} sin convertir`,
  /** Nota de una cifra que no está en pesos y no tiene TRM con que pasarla. */
  unconverted: "Sin convertir a pesos",
} as const;

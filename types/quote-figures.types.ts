import type { QuotePlatformFigures } from "@/domain/entities/quote-figures";

/** Cifras ya calculadas de toda la cotización, en la moneda de la vista. */
export interface QuoteFigures {
  byPlatform: Record<string, QuotePlatformFigures>;
  /** Suma de los totales de las plataformas. */
  sum: number;
  /** Total general efectivo: el fijo o la suma. */
  grand: number;
  profit: number;
  pauta: number;
  service: number;
  discount: number;
}

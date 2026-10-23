import type { SpendByCurrency } from "@/domain/entities/money";

/** Dólares pasados a pesos con la TRM fijada en un trabajo. */
export interface TrmConversion {
  usd: number;
  /** Pesos por dólar acordados con el cliente. */
  rate: number;
}

/**
 * Gasto tal como lo enseña el reporte público. Los pesos se suman tal cual;
 * los dólares de trabajos con TRM se convierten con ella, y todo lo demás
 * (dólares sin TRM, otras monedas) queda aparte, sin sumarse a nada.
 *
 * Las conversiones se agrupan por tasa porque el reporte del artista junta
 * lanzamientos que pueden tener TRM distintas.
 */
export interface ReportSpend {
  /** Gasto que ya estaba en pesos. */
  nativeCop: number;
  conversions: TrmConversion[];
  /** Gasto sin convertir, por moneda. Nunca lleva pesos. */
  pending: SpendByCurrency;
}

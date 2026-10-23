/** Quién paga el Servicio: sale del dinero del cliente o lo asume AdsME. */
export type NominaServicePayer = "cliente" | "adsme";

/**
 * Modelo de reparto de un artista tal como se configura. `service: null`
 * significa el sugerido (2/7 del punto de equilibrio).
 */
export interface NominaSplitTerms {
  hasService: boolean;
  service: number | null;
  servicePayer: NominaServicePayer;
  hasScalability: boolean;
  profitPercent: number;
  profitPerShowAfterMin: number;
  hasFixedProfit: boolean;
  fixedProfit: number;
}

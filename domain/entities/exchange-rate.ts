/**
 * Pesos colombianos que vale una unidad de `currency` desde `validFrom`. Para
 * el dólar es la TRM que certifica la Superintendencia Financiera.
 */
export interface ExchangeRate {
  /** Moneda de origen, ISO 4217 (`USD`). */
  currency: string;
  /** Primer día de vigencia, `YYYY-MM-DD` en hora de Colombia. */
  validFrom: string;
  /** Pesos por una unidad de `currency`. */
  rate: number;
  /** De dónde salió la tasa, para poder rastrearla. */
  source: string;
}

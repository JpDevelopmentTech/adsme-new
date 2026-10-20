import type { ExchangeRate } from "@/domain/entities/exchange-rate";

/** Port de la fuente oficial de tasas de cambio a pesos. */
export interface ExchangeRateProvider {
  /**
   * Tasa vigente el día `date` (`YYYY-MM-DD`). Lanza si la fuente no responde
   * o no tiene una tasa para ese día.
   */
  fetchRate(date: string): Promise<ExchangeRate>;
}

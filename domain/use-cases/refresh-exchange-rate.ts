import type { ExchangeRate } from "@/domain/entities/exchange-rate";
import type { ExchangeRateProvider } from "@/domain/interfaces/exchange-rate-provider";
import type { ExchangeRateRepository } from "@/domain/interfaces/exchange-rate-repository";

/**
 * Caso de uso: traer la tasa vigente hoy y guardarla. La conversión a pesos de
 * campañas y reportes lee siempre la última guardada, así que basta con
 * refrescarla una vez al día para que todo el gasto en dólares se valore a la
 * TRM del día.
 */
export function createRefreshExchangeRate(
  provider: ExchangeRateProvider,
  repository: ExchangeRateRepository,
) {
  return async function refreshExchangeRate(
    today: string,
  ): Promise<ExchangeRate> {
    const rate = await provider.fetchRate(today);

    await repository.saveRate(rate);

    return rate;
  };
}

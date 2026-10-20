import type { ExchangeRate } from "@/domain/entities/exchange-rate";

/** Port del almacén de tasas de cambio, del que lee la conversión a pesos. */
export interface ExchangeRateRepository {
  /** Guarda la tasa; si ya hay una para esa moneda y día, la reemplaza. */
  saveRate(rate: ExchangeRate): Promise<void>;
}

import "server-only";

import type { SupabaseClient } from "@supabase/supabase-js";
import type { ExchangeRate } from "@/domain/entities/exchange-rate";
import type { ExchangeRateRepository } from "@/domain/interfaces/exchange-rate-repository";

const EXCHANGE_RATES_TABLE = "exchange_rates";

/**
 * Tasas de cambio sobre Supabase. La tabla no tiene políticas de escritura: las
 * tasas son comunes a todos los usuarios y solo las escribe el servidor, así
 * que este repositorio espera el cliente con la clave de servicio.
 */
export function createSupabaseExchangeRateRepository(
  supabase: SupabaseClient,
): ExchangeRateRepository {
  return {
    async saveRate(rate: ExchangeRate): Promise<void> {
      const { error } = await supabase.from(EXCHANGE_RATES_TABLE).upsert(
        {
          currency: rate.currency,
          valid_from: rate.validFrom,
          rate: rate.rate,
          source: rate.source,
          fetched_at: new Date().toISOString(),
        },
        { onConflict: "currency,valid_from" },
      );

      if (error) throw new Error(error.message);
    },
  };
}

import "server-only";

import {
  EXCHANGE_RATE_ERRORS,
  REPORTING_TIME_ZONE,
} from "@/constants/exchange-rate.constants";
import { createRefreshExchangeRate } from "@/domain/use-cases/refresh-exchange-rate";
import { createTrmProvider } from "@/infrastructure/exchange-rates/trm-provider";
import { logger } from "@/infrastructure/logging/logger";
import { createSupabaseExchangeRateRepository } from "@/infrastructure/repositories/supabase-exchange-rate-repository";
import { createServiceSupabaseClient } from "@/infrastructure/supabase/service-supabase-client";
import { todayInTimeZone } from "@/utils/today-in-time-zone";

/**
 * Guarda la TRM vigente hoy. Devuelve `null` si fue bien y el aviso para el
 * usuario si no.
 *
 * Nunca lanza: sin TRM nueva la conversión sigue funcionando con la última
 * guardada, que es mejor que dejar de importar campañas por una caída de
 * datos.gov.co.
 */
export async function refreshTrm(now: Date = new Date()): Promise<string | null> {
  try {
    const rate = await createRefreshExchangeRate(
      createTrmProvider(),
      createSupabaseExchangeRateRepository(createServiceSupabaseClient()),
    )(todayInTimeZone(now, REPORTING_TIME_ZONE));

    logger.info("trm.refreshed", { validFrom: rate.validFrom, rate: rate.rate });

    return null;
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);

    logger.error("trm.refresh_failed", { reason });

    return EXCHANGE_RATE_ERRORS.refreshFailed(reason);
  }
}

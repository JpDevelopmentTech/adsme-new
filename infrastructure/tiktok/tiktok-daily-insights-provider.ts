import "server-only";

import {
  TIKTOK_DAILY_CONCURRENCY,
  TIKTOK_DAILY_HISTORY_DAYS,
  TIKTOK_DAILY_MAX_RANGE_DAYS,
  TIKTOK_DAILY_MAX_WINDOWS,
} from "@/constants/tiktok-ads.constants";
import type { CampaignDayInsight } from "@/domain/entities/campaign-daily";
import type { Connection } from "@/domain/entities/connection";
import type { DailyInsightsProvider } from "@/domain/interfaces/daily-insights-provider";
import { fetchTiktokDailyWindow } from "@/infrastructure/tiktok/tiktok-daily-report";
import { chunk } from "@/utils/chunk";
import { shiftIsoDate } from "@/utils/shift-iso-date";
import { splitDateRange } from "@/utils/split-date-range";

/**
 * Adaptador de TikTok para el port de series diarias.
 *
 * Recibe el token ya resuelto porque el de la conexión puede estar caducado: en
 * TikTok se renueva con el `refresh_token` justo antes de sincronizar.
 */
export function createTiktokDailyInsightsProvider(
  accessToken: string,
): DailyInsightsProvider {
  return {
    async fetchDailyInsights(
      connection: Connection,
      since: string | null,
    ): Promise<CampaignDayInsight[]> {
      const today = new Date().toISOString().slice(0, 10);
      const from = since ?? shiftIsoDate(today, -TIKTOK_DAILY_HISTORY_DAYS);

      // Los tramos más recientes van primero: si el tope corta el histórico, lo
      // que se pierde es lo viejo, que es lo que menos se mira.
      const windows = splitDateRange(from, today, TIKTOK_DAILY_MAX_RANGE_DAYS)
        .reverse()
        .slice(0, TIKTOK_DAILY_MAX_WINDOWS);

      const days: CampaignDayInsight[] = [];

      // Por tandas: el histórico completo son ~25 ventanas de 30 días, y ni
      // encadenarlas de una en una ni dispararlas todas a la vez sale bien.
      for (const batch of chunk(windows, TIKTOK_DAILY_CONCURRENCY)) {
        const fetched = await Promise.all(
          batch.map((range) =>
            fetchTiktokDailyWindow(
              accessToken,
              connection.externalAccountId,
              range,
            ),
          ),
        );

        days.push(...fetched.flat());
      }

      return days;
    },
  };
}

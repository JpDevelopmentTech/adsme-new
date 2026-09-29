import "server-only";

import {
  META_DAILY_HISTORY_DAYS,
  META_DAILY_WINDOW_DAYS,
} from "@/constants/meta-ads.constants";
import type { CampaignDayInsight } from "@/domain/entities/campaign-daily";
import type { Connection } from "@/domain/entities/connection";
import type { DailyInsightsProvider } from "@/domain/interfaces/daily-insights-provider";
import { fetchCampaignDailyInsights } from "@/infrastructure/meta/meta-daily-api";
import { toCampaignDayInsight } from "@/infrastructure/meta/meta-daily-insights-mapper";
import { shiftIsoDate } from "@/utils/shift-iso-date";
import { splitDateRange } from "@/utils/split-date-range";

/**
 * Adaptador de Meta para el port de series diarias. El caso de uso solo conoce
 * este contrato, así que YouTube y TikTok entrarán con su propio adaptador sin
 * tocar la importación.
 *
 * El rango se pide por ventanas y en serie: de golpe, el histórico de una
 * cuenta grande tumba la consulta, y en paralelo se come la cuota de la cuenta.
 */
export function createMetaDailyInsightsProvider(): DailyInsightsProvider {
  return {
    async fetchDailyInsights(
      connection: Connection,
      since: string | null,
    ): Promise<CampaignDayInsight[]> {
      const until = untilToday();
      const from = since ?? shiftIsoDate(until, -META_DAILY_HISTORY_DAYS);
      const days: CampaignDayInsight[] = [];

      for (const range of splitDateRange(from, until, META_DAILY_WINDOW_DAYS)) {
        const rows = await fetchCampaignDailyInsights(
          connection.accessToken,
          connection.externalAccountId,
          range,
        );

        for (const row of rows) {
          const day = toCampaignDayInsight(row);
          if (day) days.push(day);
        }
      }

      return days;
    },
  };
}

/**
 * Fin del rango pedido a Meta. Va un día por delante de hoy en UTC porque el
 * rango se interpreta en la zona de la cuenta publicitaria, que puede ir por
 * delante; Meta recorta sola lo que caiga en el futuro.
 */
function untilToday(): string {
  return shiftIsoDate(new Date().toISOString().slice(0, 10), 1);
}

import "server-only";

import type { CampaignDayInsight } from "@/domain/entities/campaign-daily";
import type { Connection } from "@/domain/entities/connection";
import type { DailyInsightsProvider } from "@/domain/interfaces/daily-insights-provider";
import { fetchCampaignDailyInsights } from "@/infrastructure/meta/meta-daily-api";
import { toCampaignDayInsight } from "@/infrastructure/meta/meta-daily-insights-mapper";
import { shiftIsoDate } from "@/utils/shift-iso-date";

/**
 * Adaptador de Meta para el port de series diarias. El caso de uso solo conoce
 * este contrato, así que YouTube y TikTok entrarán con su propio adaptador sin
 * tocar la importación.
 */
export function createMetaDailyInsightsProvider(): DailyInsightsProvider {
  return {
    async fetchDailyInsights(
      connection: Connection,
      since: string | null,
    ): Promise<CampaignDayInsight[]> {
      const rows = await fetchCampaignDailyInsights(
        connection.accessToken,
        connection.externalAccountId,
        since,
        untilToday(),
      );

      return rows
        .map(toCampaignDayInsight)
        .filter((day): day is CampaignDayInsight => day !== null);
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

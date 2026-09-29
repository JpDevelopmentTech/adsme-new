import "server-only";

import {
  TIKTOK_AUDIENCE_DIMENSIONS,
  TIKTOK_DAILY_CONCURRENCY,
  TIKTOK_DAILY_HISTORY_DAYS,
  TIKTOK_DAILY_MAX_RANGE_DAYS,
  TIKTOK_DAILY_MAX_WINDOWS,
  TIKTOK_REGION_DIMENSIONS,
} from "@/constants/tiktok-ads.constants";
import type { CampaignBreakdownInsight } from "@/domain/entities/campaign-breakdown";
import type { DailyRange } from "@/domain/entities/campaign-daily";
import type { Connection } from "@/domain/entities/connection";
import type { BreakdownInsightsProvider } from "@/domain/interfaces/breakdown-insights-provider";
import { fetchTiktokAudienceWindow } from "@/infrastructure/tiktok/tiktok-audience-report";
import { fetchTiktokRegionNames } from "@/infrastructure/tiktok/tiktok-region-names";
import { chunk } from "@/utils/chunk";
import { shiftIsoDate } from "@/utils/shift-iso-date";
import { splitDateRange } from "@/utils/split-date-range";

/**
 * Adaptador de TikTok para el port de repartos: sexo, edad y provincia. El
 * territorio llega como id en un informe aparte, y su nombre sale del catálogo
 * de lugares de la cuenta, que se pide una sola vez.
 *
 * El informe de audiencia no da el acumulado de por vida, así que se pide el
 * mismo histórico que la serie diaria, con sus mismas ventanas, y se devuelven
 * todos los tramos juntos: `toCampaignBreakdownDrafts` suma los que coinciden.
 * Cada ventana son dos peticiones —una por informe— y se reparten en las mismas
 * tandas, para no pasar del ritmo que TikTok aguanta.
 *
 * Recibe el token ya resuelto porque el guardado puede estar caducado y quien
 * sabe renovarlo es `resolveTiktokAccess`, no este adaptador.
 */
export function createTiktokBreakdownsProvider(
  accessToken: string,
): BreakdownInsightsProvider {
  return {
    async fetchBreakdowns(
      connection: Connection,
    ): Promise<CampaignBreakdownInsight[]> {
      const advertiserId = connection.externalAccountId;
      const regionNames = await fetchTiktokRegionNames(accessToken, advertiserId);
      const requests = historyWindows().flatMap((range) =>
        [TIKTOK_AUDIENCE_DIMENSIONS, TIKTOK_REGION_DIMENSIONS].map(
          (dimensions) => () =>
            fetchTiktokAudienceWindow(accessToken, advertiserId, range, {
              dimensions,
              regionNames,
            }),
        ),
      );

      const insights: CampaignBreakdownInsight[] = [];

      for (const batch of chunk(requests, TIKTOK_DAILY_CONCURRENCY)) {
        const fetched = await Promise.all(batch.map((request) => request()));

        insights.push(...fetched.flat());
      }

      return insights;
    },
  };
}

/** Ventanas del histórico, de la más reciente a la más antigua. */
function historyWindows(): DailyRange[] {
  const today = new Date().toISOString().slice(0, 10);
  const from = shiftIsoDate(today, -TIKTOK_DAILY_HISTORY_DAYS);

  return splitDateRange(from, today, TIKTOK_DAILY_MAX_RANGE_DAYS)
    .reverse()
    .slice(0, TIKTOK_DAILY_MAX_WINDOWS);
}

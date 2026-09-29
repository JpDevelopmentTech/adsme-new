import "server-only";

import {
  META_DAILY_INSIGHT_FIELDS,
  META_DAILY_MAX_PAGES,
  META_GRAPH_URL,
  META_INSIGHTS_LEVEL,
  META_INSIGHTS_LIMIT,
  META_INSIGHTS_TIME_INCREMENT,
} from "@/constants/meta-ads.constants";
import type { DailyRange } from "@/domain/entities/campaign-daily";
import type { MetaDailyInsightsPayload } from "@/domain/entities/meta-ads";
import { getJsonOrThrow } from "@/infrastructure/meta/meta-http";

interface DailyInsightsPage {
  data?: MetaDailyInsightsPayload[];
  paging?: { next?: string };
}

/**
 * Serie diaria de todas las campañas de la cuenta dentro de un tramo de
 * fechas, un tramo por campaña y día.
 *
 * Con `time_increment=1` cada campaña deja de ser una fila y pasa a ser tantas
 * como días haya estado entregando, así que la respuesta se pagina: se sigue el
 * enlace `paging.next` que devuelve Meta hasta agotarla o llegar al tope.
 */
export async function fetchCampaignDailyInsights(
  accessToken: string,
  adAccountId: string,
  range: DailyRange,
): Promise<MetaDailyInsightsPayload[]> {
  const params = new URLSearchParams({
    level: META_INSIGHTS_LEVEL,
    time_increment: META_INSIGHTS_TIME_INCREMENT,
    fields: META_DAILY_INSIGHT_FIELDS,
    limit: META_INSIGHTS_LIMIT,
    time_range: JSON.stringify({ since: range.from, until: range.to }),
    access_token: accessToken,
  });

  let url: string | undefined =
    `${META_GRAPH_URL}/${adAccountId}/insights?${params}`;
  const rows: MetaDailyInsightsPayload[] = [];

  for (let page = 0; page < META_DAILY_MAX_PAGES && url; page += 1) {
    const payload: DailyInsightsPage = await getJsonOrThrow<DailyInsightsPage>(url);

    rows.push(...(payload.data ?? []));
    url = payload.paging?.next;
  }

  return rows;
}


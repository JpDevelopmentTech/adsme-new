import "server-only";

import {
  TIKTOK_AUDIENCE_MAX_PAGES,
  TIKTOK_AUDIENCE_METRICS,
  TIKTOK_AUDIENCE_REPORT_TYPE,
  TIKTOK_LIFETIME_QUERY,
  TIKTOK_PAGE_SIZE,
  TIKTOK_REPORT_DATA_LEVEL,
} from "@/constants/tiktok-ads.constants";
import type { CampaignBreakdownInsight } from "@/domain/entities/campaign-breakdown";
import type { DailyRange } from "@/domain/entities/campaign-daily";
import { tiktokGet } from "@/infrastructure/tiktok/tiktok-client";
import {
  toBreakdownInsights,
  type TiktokAudienceRow,
} from "@/infrastructure/tiktok/tiktok-audience-mapper";

interface AudienceReportPage {
  list?: TiktokAudienceRow[];
  page_info?: { total_page?: number };
}

/** Qué informe de audiencia pedir y cómo nombrar sus provincias. */
export interface TiktokAudienceQuery {
  dimensions: readonly string[];
  regionNames: ReadonlyMap<string, string>;
}

/**
 * Reparto de todas las campañas de la cuenta dentro de un tramo de fechas
 * —por sexo y edad o por provincia, según `dimensions`—, recorriendo sus
 * páginas. TikTok pagina por número de página y anuncia cuántas hay en
 * `page_info`, igual que en el informe diario.
 */
export async function fetchTiktokAudienceWindow(
  accessToken: string,
  advertiserId: string,
  range: DailyRange,
  query: TiktokAudienceQuery,
): Promise<CampaignBreakdownInsight[]> {
  const insights: CampaignBreakdownInsight[] = [];
  let totalPages = 1;

  for (
    let page = 1;
    page <= Math.min(totalPages, TIKTOK_AUDIENCE_MAX_PAGES);
    page += 1
  ) {
    const payload = await tiktokGet<AudienceReportPage>(
      "/report/integrated/get/",
      {
        advertiser_id: advertiserId,
        report_type: TIKTOK_AUDIENCE_REPORT_TYPE,
        data_level: TIKTOK_REPORT_DATA_LEVEL,
        dimensions: JSON.stringify(query.dimensions),
        metrics: JSON.stringify(TIKTOK_AUDIENCE_METRICS),
        query_lifetime: TIKTOK_LIFETIME_QUERY,
        start_date: range.from,
        end_date: range.to,
        page: String(page),
        page_size: String(TIKTOK_PAGE_SIZE),
      },
      accessToken,
    );

    totalPages = payload.page_info?.total_page ?? 1;

    for (const row of payload.list ?? []) {
      insights.push(...toBreakdownInsights(row, query.regionNames));
    }
  }

  return insights;
}

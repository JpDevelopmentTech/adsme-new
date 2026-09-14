import "server-only";

import {
  TIKTOK_DAILY_MAX_PAGES,
  TIKTOK_PAGE_SIZE,
  TIKTOK_REPORT_DAILY_DIMENSIONS,
  TIKTOK_REPORT_DATA_LEVEL,
  TIKTOK_REPORT_METRICS,
  TIKTOK_REPORT_TYPE,
} from "@/constants/tiktok-ads.constants";
import type { CampaignDayInsight, DailyRange } from "@/domain/entities/campaign-daily";
import { tiktokGet } from "@/infrastructure/tiktok/tiktok-client";
import {
  toCampaignDayInsight,
  type TiktokDailyRow,
} from "@/infrastructure/tiktok/tiktok-daily-mapper";

interface DailyReportPage {
  list?: TiktokDailyRow[];
  page_info?: { total_page?: number };
}

/**
 * Informe de un tramo de fechas, recorriendo sus páginas. TikTok pagina por
 * número de página y anuncia cuántas hay en `page_info`, al contrario que Meta,
 * que entrega el enlace a la siguiente.
 */
export async function fetchTiktokDailyWindow(
  accessToken: string,
  advertiserId: string,
  range: DailyRange,
): Promise<CampaignDayInsight[]> {
  const days: CampaignDayInsight[] = [];
  let totalPages = 1;

  for (let page = 1; page <= Math.min(totalPages, TIKTOK_DAILY_MAX_PAGES); page += 1) {
    const payload = await tiktokGet<DailyReportPage>(
      "/report/integrated/get/",
      {
        advertiser_id: advertiserId,
        report_type: TIKTOK_REPORT_TYPE,
        data_level: TIKTOK_REPORT_DATA_LEVEL,
        dimensions: JSON.stringify(TIKTOK_REPORT_DAILY_DIMENSIONS),
        metrics: JSON.stringify(TIKTOK_REPORT_METRICS),
        start_date: range.from,
        end_date: range.to,
        page: String(page),
        page_size: String(TIKTOK_PAGE_SIZE),
      },
      accessToken,
    );

    totalPages = payload.page_info?.total_page ?? 1;

    for (const row of payload.list ?? []) {
      const day = toCampaignDayInsight(row);
      if (day) days.push(day);
    }
  }

  return days;
}

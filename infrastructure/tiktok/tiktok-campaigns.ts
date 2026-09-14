import "server-only";

import {
  TIKTOK_CAMPAIGN_FIELDS,
  TIKTOK_PAGE_SIZE,
  TIKTOK_REPORT_DATA_LEVEL,
  TIKTOK_REPORT_DIMENSIONS,
  TIKTOK_REPORT_METRICS,
  TIKTOK_REPORT_TYPE,
} from "@/constants/tiktok-ads.constants";
import type { TiktokCampaign } from "@/domain/entities/tiktok-ads";
import { tiktokGet } from "@/infrastructure/tiktok/tiktok-client";
import {
  toTiktokCampaignMetrics,
  type TiktokMetricsPayload,
} from "@/infrastructure/tiktok/tiktok-metrics-mapper";

interface CampaignRow {
  campaign_id: string;
  campaign_name?: string;
  operation_status?: string;
  objective_type?: string;
  create_time?: string;
}

interface ReportRow {
  dimensions?: { campaign_id?: string };
  metrics?: TiktokMetricsPayload;
}

/** Métricas por campaña, indexadas para poder cruzarlas con el listado. */
async function fetchReport(
  accessToken: string,
  advertiserId: string,
): Promise<Map<string, TiktokMetricsPayload>> {
  const payload = await tiktokGet<{ list?: ReportRow[] }>(
    "/report/integrated/get/",
    {
      advertiser_id: advertiserId,
      report_type: TIKTOK_REPORT_TYPE,
      data_level: TIKTOK_REPORT_DATA_LEVEL,
      dimensions: JSON.stringify(TIKTOK_REPORT_DIMENSIONS),
      metrics: JSON.stringify(TIKTOK_REPORT_METRICS),
      // Histórico completo, para no desalinearse con Meta, que importa todo.
      query_lifetime: "true",
      page_size: String(TIKTOK_PAGE_SIZE),
    },
    accessToken,
  );

  return new Map(
    (payload.list ?? [])
      .filter((row) => row.dimensions?.campaign_id)
      .map((row) => [row.dimensions!.campaign_id!, row.metrics ?? {}]),
  );
}

/**
 * Campañas de la cuenta con sus métricas.
 *
 * TikTok parte la información en dos: el listado da nombre, estado y fechas
 * pero ninguna métrica, y el informe da métricas pero ni nombre ni fechas. Se
 * parte del listado y no del informe para que una campaña sin entrega —que el
 * informe puede omitir— siga apareciendo y se pueda vincular a un trabajo.
 */
export async function fetchTiktokCampaigns(
  accessToken: string,
  advertiserId: string,
): Promise<TiktokCampaign[]> {
  const listing = await tiktokGet<{ list?: CampaignRow[] }>("/campaign/get/", {
    advertiser_id: advertiserId,
    fields: JSON.stringify(TIKTOK_CAMPAIGN_FIELDS),
    page_size: String(TIKTOK_PAGE_SIZE),
  }, accessToken);

  const campaigns = listing.list ?? [];
  if (campaigns.length === 0) return [];

  const report = await fetchReport(accessToken, advertiserId);

  return campaigns.map((campaign) => ({
    id: campaign.campaign_id,
    name: campaign.campaign_name ?? campaign.campaign_id,
    status: campaign.operation_status ?? "",
    objective: campaign.objective_type ?? null,
    startsAt: campaign.create_time ?? null,
    ...toTiktokCampaignMetrics(report.get(campaign.campaign_id) ?? {}),
  }));
}

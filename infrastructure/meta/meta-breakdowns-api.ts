import "server-only";

import {
  META_BREAKDOWN_FIELDS,
  META_BREAKDOWN_MAX_PAGES,
  META_GRAPH_URL,
  META_INSIGHTS_DATE_PRESET,
  META_INSIGHTS_LEVEL,
  META_INSIGHTS_LIMIT,
} from "@/constants/meta-ads.constants";
import type { MetaBreakdownPayload } from "@/domain/entities/meta-ads";
import { getJsonOrThrow } from "@/infrastructure/meta/meta-http";

interface BreakdownPage {
  data?: MetaBreakdownPayload[];
  paging?: { next?: string };
}

/**
 * Insights de toda la cuenta partidos por un eje —`age,gender` o `region`—,
 * acumulados de toda la vida de cada campaña.
 *
 * Sin `time_increment`: al reporte le interesa el reparto del lanzamiento
 * entero, no cómo cambió día a día. La respuesta se pagina siguiendo
 * `paging.next`, igual que la serie diaria.
 */
export async function fetchCampaignBreakdowns(
  accessToken: string,
  adAccountId: string,
  breakdowns: string,
): Promise<MetaBreakdownPayload[]> {
  const params = new URLSearchParams({
    level: META_INSIGHTS_LEVEL,
    breakdowns,
    fields: META_BREAKDOWN_FIELDS,
    date_preset: META_INSIGHTS_DATE_PRESET,
    limit: META_INSIGHTS_LIMIT,
    access_token: accessToken,
  });

  let url: string | undefined =
    `${META_GRAPH_URL}/${adAccountId}/insights?${params}`;
  const rows: MetaBreakdownPayload[] = [];

  for (let page = 0; page < META_BREAKDOWN_MAX_PAGES && url; page += 1) {
    const payload: BreakdownPage = await getJsonOrThrow<BreakdownPage>(url);

    rows.push(...(payload.data ?? []));
    url = payload.paging?.next;
  }

  return rows;
}

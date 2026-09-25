import "server-only";

import {
  META_AUDIENCE_BREAKDOWNS,
  META_REGION_BREAKDOWN,
} from "@/constants/meta-ads.constants";
import type { CampaignBreakdownInsight } from "@/domain/entities/campaign-breakdown";
import type { Connection } from "@/domain/entities/connection";
import type { MetaBreakdownPayload } from "@/domain/entities/meta-ads";
import type { BreakdownInsightsProvider } from "@/domain/interfaces/breakdown-insights-provider";
import { fetchCampaignBreakdowns } from "@/infrastructure/meta/meta-breakdowns-api";
import {
  toAgeSlice,
  toGenderSlice,
  toRegionSlice,
} from "@/utils/to-breakdown-slice";

/** Adaptador de Meta para el port de repartos por audiencia y territorio. */
export function createMetaBreakdownsProvider(): BreakdownInsightsProvider {
  return {
    async fetchBreakdowns(
      connection: Connection,
    ): Promise<CampaignBreakdownInsight[]> {
      const [audience, regions] = await Promise.all([
        fetchCampaignBreakdowns(
          connection.accessToken,
          connection.externalAccountId,
          META_AUDIENCE_BREAKDOWNS,
        ),
        fetchCampaignBreakdowns(
          connection.accessToken,
          connection.externalAccountId,
          META_REGION_BREAKDOWN,
        ),
      ]);

      return [...audience, ...regions].flatMap(toBreakdownInsights);
    },
  };
}

/**
 * Una fila puede alimentar dos ejes a la vez: pedir `age,gender` devuelve el
 * cruce de ambos, y cada fila aporta sus impresiones tanto a su franja de edad
 * como a su sexo. Quien las suma después es `toCampaignBreakdownDrafts`.
 */
function toBreakdownInsights(
  row: MetaBreakdownPayload,
): CampaignBreakdownInsight[] {
  const externalCampaignId = row.campaign_id;
  const impressions = Number(row.impressions ?? 0);

  if (!externalCampaignId || impressions <= 0) return [];

  const slices = [
    row.age ? toAgeSlice(row.age, impressions) : null,
    row.gender ? toGenderSlice(row.gender, impressions) : null,
    row.region ? toRegionSlice(row.region, impressions) : null,
  ];

  return slices
    .filter((slice) => slice !== null)
    .map((slice) => ({ ...slice, externalCampaignId }));
}

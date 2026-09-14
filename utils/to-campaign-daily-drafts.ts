import type { Campaign } from "@/domain/entities/campaign";
import type {
  CampaignDailyDraft,
  CampaignDayInsight,
} from "@/domain/entities/campaign-daily";

/**
 * Resuelve cada día al identificador que la campaña tiene en adsme. Los días de
 * campañas que no están importadas se descartan: la serie diaria cuelga de
 * `campaigns` y sin fila padre no se puede guardar.
 */
export function toCampaignDailyDrafts(
  insights: CampaignDayInsight[],
  campaigns: Campaign[],
): CampaignDailyDraft[] {
  const idByExternalId = new Map(
    campaigns.map((campaign) => [campaign.externalCampaignId, campaign.id]),
  );

  return insights.flatMap((insight) => {
    const campaignId = idByExternalId.get(insight.externalCampaignId);
    if (!campaignId) return [];

    return [{ ...toDraftFields(insight), campaignId }];
  });
}

/** El id externo se queda fuera: en la serie diaria la campaña ya es la de adsme. */
function toDraftFields(insight: CampaignDayInsight): Omit<CampaignDailyDraft, "campaignId"> {
  return {
    date: insight.date,
    spend: insight.spend,
    impressions: insight.impressions,
    clicks: insight.clicks,
    reach: insight.reach,
    videoPlays: insight.videoPlays,
    engagement: insight.engagement,
    comments: insight.comments,
    shares: insight.shares,
    reactions: insight.reactions,
    extra: insight.extra,
  };
}

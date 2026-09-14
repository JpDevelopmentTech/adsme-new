import type { CampaignDraft } from "@/domain/entities/campaign";
import type { MetaCampaign } from "@/domain/entities/meta-ads";

/** Traduce las campañas que devuelve Meta a lo que guarda adsme. */
export function toMetaCampaignDrafts(
  connectionId: string,
  campaigns: MetaCampaign[],
): CampaignDraft[] {
  return campaigns.map((campaign) => ({
    connectionId,
    externalCampaignId: campaign.id,
    name: campaign.name,
    status: campaign.status,
    objective: campaign.objective,
    spend: campaign.spend,
    impressions: campaign.impressions,
    clicks: campaign.clicks,
    reach: campaign.reach,
    videoPlays: campaign.videoPlays,
    engagement: campaign.engagement,
    comments: campaign.comments,
    shares: campaign.shares,
    reactions: campaign.reactions,
    startsAt: campaign.startsAt,
    extra: { videoRetention: campaign.videoRetention },
  }));
}

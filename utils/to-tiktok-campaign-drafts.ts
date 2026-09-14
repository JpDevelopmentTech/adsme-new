import type { CampaignDraft } from "@/domain/entities/campaign";
import type { TiktokCampaign } from "@/domain/entities/tiktok-ads";

/** Traduce las campañas que devuelve TikTok a lo que guarda adsme. */
export function toTiktokCampaignDrafts(
  connectionId: string,
  campaigns: TiktokCampaign[],
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
    // Los cuartiles de TikTok son conteos sobre reproducciones, como en Meta.
    extra: { videoRetention: campaign.videoRetention, retentionBasis: "plays" },
  }));
}

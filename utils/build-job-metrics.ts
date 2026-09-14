import type { Campaign } from "@/domain/entities/campaign";
import type { ConnectionPlatform } from "@/domain/entities/connection";

export interface JobMetrics {
  views: number;
  reach: number;
  spend: number;
  /** Porcentaje de clics sobre impresiones; 0 cuando no hubo entrega. */
  ctr: number;
}

/** Suma las métricas de las campañas vinculadas al trabajo. */
export function buildJobMetrics(campaigns: Campaign[]): JobMetrics {
  const sum = (pick: (campaign: Campaign) => number) =>
    campaigns.reduce((total, campaign) => total + pick(campaign), 0);

  const impressions = sum((campaign) => campaign.impressions);
  const clicks = sum((campaign) => campaign.clicks);

  return {
    views: sum((campaign) => campaign.videoPlays),
    reach: sum((campaign) => campaign.reach),
    spend: sum((campaign) => campaign.spend),
    ctr: impressions > 0 ? (clicks / impressions) * 100 : 0,
  };
}

/** Métrica principal de cada plataforma: alcance en Meta, reproducciones en el resto. */
export function primaryMetricFor(
  platform: ConnectionPlatform,
  campaigns: Campaign[],
): number {
  const sum = (pick: (campaign: Campaign) => number) =>
    campaigns.reduce((total, campaign) => total + pick(campaign), 0);

  if (platform === "meta") return sum((campaign) => campaign.reach);

  return sum((campaign) => campaign.videoPlays);
}

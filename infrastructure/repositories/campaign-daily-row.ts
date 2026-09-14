import type {
  CampaignDailyDraft,
  CampaignDailyPoint,
} from "@/domain/entities/campaign-daily";
import type { JobPlatform } from "@/domain/entities/job";

/** Fila de `public.campaign_daily_metrics`. */
export interface CampaignDailyRow {
  metric_date: string;
  spend: number | string;
  impressions: number;
  clicks: number;
  reach: number;
  video_plays: number;
  engagement: number;
  comments: number;
  shares: number;
  reactions: number;
}

/** La misma fila con la campaña, su trabajo y la plataforma de su conexión. */
export interface CampaignDailyPointRow extends CampaignDailyRow {
  campaigns:
    | {
        job_id: string | null;
        connections: { platform: string } | { platform: string }[] | null;
      }
    | null;
}

export const CAMPAIGN_DAILY_COLUMNS =
  "metric_date, spend, impressions, clicks, reach, video_plays, engagement, comments, shares, reactions";

export const CAMPAIGN_DAILY_POINT_COLUMNS = `${CAMPAIGN_DAILY_COLUMNS}, campaigns!inner ( job_id, connections!inner ( platform ) )`;

/**
 * La conexión de Google se llama `google_ads`, pero en los trabajos y en los
 * gráficos esa plataforma es YouTube. El mapeo vive aquí para que la serie
 * diaria hable el mismo idioma que el resto de la aplicación.
 */
function toJobPlatform(platform: string | undefined): JobPlatform {
  if (platform === "google_ads") return "youtube";

  return platform === "tiktok" ? "tiktok" : "meta";
}

export function toCampaignDailyPoint(
  row: CampaignDailyPointRow,
): CampaignDailyPoint {
  const connections = row.campaigns?.connections;
  const connection = Array.isArray(connections) ? connections[0] : connections;

  return {
    date: row.metric_date,
    platform: toJobPlatform(connection?.platform),
    jobId: row.campaigns?.job_id ?? null,
    // `numeric` llega como cadena para no perder precisión.
    spend: Number(row.spend),
    impressions: Number(row.impressions),
    clicks: Number(row.clicks),
    reach: Number(row.reach),
    videoPlays: Number(row.video_plays),
    engagement: Number(row.engagement),
    comments: Number(row.comments),
    shares: Number(row.shares),
    reactions: Number(row.reactions),
  };
}

/** Traduce el draft a columnas; el propietario lo pone el `default` de la tabla. */
export function toCampaignDailyRow(draft: CampaignDailyDraft) {
  return {
    campaign_id: draft.campaignId,
    metric_date: draft.date,
    spend: draft.spend,
    impressions: draft.impressions,
    clicks: draft.clicks,
    reach: draft.reach,
    video_plays: draft.videoPlays,
    engagement: draft.engagement,
    comments: draft.comments,
    shares: draft.shares,
    reactions: draft.reactions,
    extra_json: draft.extra,
  };
}

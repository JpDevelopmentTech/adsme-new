import type {
  TiktokCampaignMetrics,
  TiktokVideoRetention,
} from "@/domain/entities/tiktok-ads";

/** Fila de métricas del informe; TikTok las manda todas como cadenas. */
export type TiktokMetricsPayload = Record<string, string | number | undefined>;

/** TikTok devuelve números en cadenas, y a veces `"-"` cuando no hay dato. */
function toNumber(value: string | number | undefined): number {
  const parsed = Number(value);

  return Number.isFinite(parsed) ? parsed : 0;
}

function toRetention(metrics: TiktokMetricsPayload): TiktokVideoRetention {
  return {
    p25: toNumber(metrics.video_views_p25),
    p50: toNumber(metrics.video_views_p50),
    p75: toNumber(metrics.video_views_p75),
    p100: toNumber(metrics.video_views_p100),
  };
}

/**
 * Normaliza el informe de TikTok a la forma plana que guarda `campaigns`.
 *
 * TikTok llena las cuatro columnas que Google deja vacías —alcance, likes,
 * comentarios y compartidos—, así que el mapeo es casi directo. Dos matices:
 * `engagement` no viene agregado y se compone sumando las interacciones que sí
 * reporta, y los cuartiles llegan como conteos absolutos, igual que en Meta y
 * al contrario que en Google, donde son tasas.
 */
export function toTiktokCampaignMetrics(
  metrics: TiktokMetricsPayload,
): TiktokCampaignMetrics {
  const likes = toNumber(metrics.likes);
  const comments = toNumber(metrics.comments);
  const shares = toNumber(metrics.shares);

  return {
    spend: toNumber(metrics.spend),
    impressions: toNumber(metrics.impressions),
    clicks: toNumber(metrics.clicks),
    reach: toNumber(metrics.reach),
    // `video_play_actions` cuenta inicios de reproducción, igual que en Meta.
    videoPlays: toNumber(metrics.video_play_actions),
    engagement: likes + comments + shares,
    comments,
    shares,
    reactions: likes,
    videoRetention: toRetention(metrics),
  };
}

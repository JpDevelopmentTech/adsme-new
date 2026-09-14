import type { CampaignDayInsight } from "@/domain/entities/campaign-daily";
import {
  toTiktokCampaignMetrics,
  type TiktokMetricsPayload,
} from "@/infrastructure/tiktok/tiktok-metrics-mapper";

/** Fila del informe diario: la campaña y el día en `dimensions`, el resto aparte. */
export interface TiktokDailyRow {
  dimensions?: { campaign_id?: string; stat_time_day?: string };
  metrics?: TiktokMetricsPayload;
}

/**
 * Convierte una fila del informe diario en un día de la serie de adsme.
 * Devuelve `null` cuando la fila no se puede situar —sin campaña o sin día no
 * hay dónde guardarla— para que quien llama la descarte.
 */
export function toCampaignDayInsight(
  row: TiktokDailyRow,
): CampaignDayInsight | null {
  const externalCampaignId = row.dimensions?.campaign_id;
  const statTimeDay = row.dimensions?.stat_time_day;

  if (!externalCampaignId || !statTimeDay) return null;

  const { videoRetention, ...metrics } = toTiktokCampaignMetrics(row.metrics ?? {});

  return {
    ...metrics,
    externalCampaignId,
    // TikTok fecha el tramo como `2026-06-01 00:00:00`; solo interesa el día.
    date: statTimeDay.slice(0, 10),
    extra: { videoRetention, retentionBasis: "plays" },
  };
}

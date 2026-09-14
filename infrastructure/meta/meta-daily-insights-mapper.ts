import type { CampaignDayInsight } from "@/domain/entities/campaign-daily";
import type { MetaDailyInsightsPayload } from "@/domain/entities/meta-ads";
import { toCampaignMetrics } from "@/infrastructure/meta/meta-insights-mapper";

/**
 * Convierte un tramo diario de la Graph API en un día de la serie de adsme.
 * Devuelve `null` cuando la fila no se puede situar —sin campaña o sin fecha no
 * hay dónde guardarla— para que quien llama la descarte.
 */
export function toCampaignDayInsight(
  row: MetaDailyInsightsPayload,
): CampaignDayInsight | null {
  if (!row.campaign_id || !row.date_start) return null;

  const { videoRetention, ...metrics } = toCampaignMetrics(row);

  return {
    ...metrics,
    externalCampaignId: row.campaign_id,
    date: row.date_start,
    // La retención por tramos no merece columna: se guarda tal cual.
    extra: { videoRetention },
  };
}

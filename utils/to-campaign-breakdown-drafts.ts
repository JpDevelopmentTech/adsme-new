import type { Campaign } from "@/domain/entities/campaign";
import type {
  CampaignBreakdownDraft,
  CampaignBreakdownInsight,
} from "@/domain/entities/campaign-breakdown";

/**
 * Resuelve cada tramo al identificador que la campaña tiene en adsme y suma los
 * que caen en el mismo sitio: una plataforma puede devolver varias filas para
 * el mismo tramo —Meta parte por edad y sexo a la vez— y la tabla guarda una
 * sola por campaña, eje y tramo.
 *
 * Los tramos de campañas que no están importadas se descartan: cuelgan de
 * `campaigns` y sin fila padre no se pueden guardar.
 */
export function toCampaignBreakdownDrafts(
  insights: CampaignBreakdownInsight[],
  campaigns: Campaign[],
): CampaignBreakdownDraft[] {
  const idByExternalId = new Map(
    campaigns.map((campaign) => [campaign.externalCampaignId, campaign.id]),
  );
  const byKey = new Map<string, CampaignBreakdownDraft>();

  for (const insight of insights) {
    const campaignId = idByExternalId.get(insight.externalCampaignId);
    if (!campaignId) continue;

    const key = `${campaignId}|${insight.kind}|${insight.bucket}`;
    const current = byKey.get(key);

    if (current) {
      current.impressions += insight.impressions;
      continue;
    }

    byKey.set(key, {
      campaignId,
      kind: insight.kind,
      bucket: insight.bucket,
      label: insight.label,
      impressions: insight.impressions,
    });
  }

  return [...byKey.values()];
}

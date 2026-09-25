import type { CampaignBreakdownInsight } from "@/domain/entities/campaign-breakdown";
import { toAgeSlice, toGenderSlice } from "@/utils/to-breakdown-slice";

/** Fila del informe de audiencia: la campaña y los ejes en `dimensions`. */
export interface TiktokAudienceRow {
  dimensions?: { campaign_id?: string; gender?: string; age?: string };
  metrics?: { impressions?: string | number };
}

/**
 * Convierte una fila del informe en los tramos de adsme. Cada fila es el cruce
 * de sexo y edad, así que aporta a las dos barras; sumarlas después es cosa de
 * `toCampaignBreakdownDrafts`.
 *
 * Devuelve lista vacía cuando la fila no se puede situar —sin campaña o sin
 * impresiones no hay nada que repartir—.
 */
export function toBreakdownInsights(
  row: TiktokAudienceRow,
): CampaignBreakdownInsight[] {
  const externalCampaignId = row.dimensions?.campaign_id;
  const impressions = Number(row.metrics?.impressions ?? 0);

  if (!externalCampaignId || impressions <= 0) return [];

  const slices = [
    row.dimensions?.age ? toAgeSlice(row.dimensions.age, impressions) : null,
    row.dimensions?.gender
      ? toGenderSlice(row.dimensions.gender, impressions)
      : null,
  ];

  return slices
    .filter((slice) => slice !== null)
    .map((slice) => ({ ...slice, externalCampaignId }));
}

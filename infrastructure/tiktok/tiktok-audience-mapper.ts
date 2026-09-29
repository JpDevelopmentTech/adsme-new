import type { CampaignBreakdownInsight } from "@/domain/entities/campaign-breakdown";
import {
  toAgeSlice,
  toGenderSlice,
  toRegionSlice,
} from "@/utils/to-breakdown-slice";

/** Fila del informe de audiencia: la campaña y los ejes en `dimensions`. */
export interface TiktokAudienceRow {
  dimensions?: {
    campaign_id?: string;
    gender?: string;
    age?: string;
    province_id?: string | number;
  };
  metrics?: { impressions?: string | number };
}

/**
 * Convierte una fila del informe en los tramos de adsme. La del informe de
 * sexo y edad es el cruce de ambos y aporta a las dos barras; la de territorio
 * solo trae la provincia. Sumarlas después es cosa de
 * `toCampaignBreakdownDrafts`.
 *
 * Una provincia que no está en el catálogo se descarta: sin nombre no hay nada
 * que pintar.
 *
 * Devuelve lista vacía cuando la fila no se puede situar —sin campaña o sin
 * impresiones no hay nada que repartir—.
 */
export function toBreakdownInsights(
  row: TiktokAudienceRow,
  regionNames: ReadonlyMap<string, string>,
): CampaignBreakdownInsight[] {
  const externalCampaignId = row.dimensions?.campaign_id;
  const impressions = Number(row.metrics?.impressions ?? 0);

  if (!externalCampaignId || impressions <= 0) return [];

  const { age, gender, province_id: provinceId } = row.dimensions ?? {};
  const regionName =
    provinceId !== undefined ? regionNames.get(String(provinceId)) : undefined;

  const slices = [
    age ? toAgeSlice(age, impressions) : null,
    gender ? toGenderSlice(gender, impressions) : null,
    regionName ? toRegionSlice(regionName, impressions) : null,
  ];

  return slices
    .filter((slice) => slice !== null)
    .map((slice) => ({ ...slice, externalCampaignId }));
}

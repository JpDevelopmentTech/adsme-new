import {
  OTHER_TERRITORIES_LABEL,
  TERRITORIES_LIMIT,
} from "@/constants/breakdowns.constants";
import type { CampaignBreakdownSlice } from "@/domain/entities/campaign-breakdown";
import type { ReportTerritory } from "@/types/report.types";
import { share } from "@/utils/format-compact-number";

/**
 * De dónde vino la gente, de mayor a menor. Lo que no entra en las primeras
 * posiciones se suma en «Otras» en vez de descartarse: sin esa fila los
 * porcentajes no llegarían a 100 y la tarjeta parecería incompleta.
 *
 * Devuelve una lista vacía cuando ninguna plataforma aportó territorios, para
 * que la tarjeta no aparezca vacía.
 */
export function buildReportTerritories(
  slices: CampaignBreakdownSlice[],
): ReportTerritory[] {
  const regions = slices
    .filter((slice) => slice.kind === "region" && slice.impressions > 0)
    .sort((first, second) => second.impressions - first.impressions);

  const total = regions.reduce((sum, region) => sum + region.impressions, 0);

  if (total === 0) return [];

  const top = regions.slice(0, TERRITORIES_LIMIT);
  const rest = regions
    .slice(TERRITORIES_LIMIT)
    .reduce((sum, region) => sum + region.impressions, 0);

  const territories = top.map((region) => ({
    name: region.label,
    percent: Math.round(share(region.impressions, total)),
  }));

  if (rest === 0) return territories;

  return [
    ...territories,
    {
      name: OTHER_TERRITORIES_LABEL,
      percent: Math.round(share(rest, total)),
    },
  ];
}

import {
  AGE_ORDER,
  GENDER_ORDER,
} from "@/constants/breakdowns.constants";
import type { CampaignBreakdownSlice } from "@/domain/entities/campaign-breakdown";
import type { ReportAudience, ReportShare } from "@/types/report.types";
import { share } from "@/utils/format-compact-number";

/**
 * Reparto de un eje en porcentajes, en el orden fijo del diseño y no en el que
 * venga de la base de datos: una barra de edades que cambia de orden entre dos
 * lanzamientos no se puede comparar de un vistazo.
 */
function toShares(
  slices: CampaignBreakdownSlice[],
  order: string[],
): ReportShare[] {
  const total = slices.reduce((sum, slice) => sum + slice.impressions, 0);

  if (total === 0) return [];

  return order.flatMap((bucket) => {
    const slice = slices.find((item) => item.bucket === bucket);

    if (!slice || slice.impressions === 0) return [];

    return [
      { label: slice.label, percent: Math.round(share(slice.impressions, total)) },
    ];
  });
}

/**
 * Quién vio el lanzamiento, por sexo y por edad, sumando las tres plataformas.
 * Devuelve `null` cuando ninguna aportó reparto —campañas pequeñas caen bajo el
 * umbral de privacidad y las plataformas no lo entregan—, para que la tarjeta
 * no aparezca vacía.
 */
export function buildReportAudience(
  slices: CampaignBreakdownSlice[],
): ReportAudience | null {
  const gender = toShares(
    slices.filter((slice) => slice.kind === "gender"),
    GENDER_ORDER,
  );
  const age = toShares(
    slices.filter((slice) => slice.kind === "age"),
    AGE_ORDER,
  );

  if (gender.length === 0 && age.length === 0) return null;

  return { gender, age };
}

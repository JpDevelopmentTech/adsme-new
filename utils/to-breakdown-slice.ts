import {
  AGE_BUCKETS,
  GENDER_LABELS,
  UNKNOWN_BUCKET,
  UNKNOWN_LABEL,
} from "@/constants/breakdowns.constants";
import type { CampaignBreakdownSlice } from "@/domain/entities/campaign-breakdown";

/**
 * Traduce el vocabulario de cada plataforma al tramo normalizado que guarda
 * adsme. Las tres nombran lo mismo de forma distinta —Meta `25-34`, Google
 * `AGE_RANGE_25_34`, TikTok `AGE_25_34`— y sin unificarlo la misma franja
 * saldría tres veces en la misma barra.
 */
export function toAgeSlice(
  raw: string,
  impressions: number,
): CampaignBreakdownSlice {
  // Todas las nomenclaturas empiezan por el límite inferior de la franja, así
  // que el primer número que aparezca basta para situarla.
  const [lower] = raw.match(/\d+/g) ?? [];
  const from = Number(lower);
  const match = Number.isFinite(from)
    ? AGE_BUCKETS.find((range) => from >= range.from)
    : undefined;

  return {
    kind: "age",
    bucket: match?.bucket ?? UNKNOWN_BUCKET,
    label: match?.label ?? UNKNOWN_LABEL,
    impressions,
  };
}

/** `female` se comprueba antes que `male` porque lo contiene dentro. */
export function toGenderSlice(
  raw: string,
  impressions: number,
): CampaignBreakdownSlice {
  const value = raw.toLowerCase();
  const bucket = value.includes("female")
    ? "female"
    : value.includes("male")
      ? "male"
      : UNKNOWN_BUCKET;

  return {
    kind: "gender",
    bucket,
    label: GENDER_LABELS[bucket] ?? UNKNOWN_LABEL,
    impressions,
  };
}

/**
 * La clave de una región es su nombre sin acentos ni puntuación, porque cada
 * plataforma lo escribe a su manera («Bogotá» / «Bogota») y agrupar por el
 * texto tal cual partiría la misma barra en dos.
 */
export function toRegionSlice(
  name: string,
  impressions: number,
): CampaignBreakdownSlice {
  const bucket = name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return { kind: "region", bucket, label: name.trim(), impressions };
}

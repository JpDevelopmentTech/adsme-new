import type { CampaignBreakdownInsight } from "@/domain/entities/campaign-breakdown";
import type { CampaignDraft } from "@/domain/entities/campaign";
import type { CampaignDayInsight } from "@/domain/entities/campaign-daily";
import {
  toAgeSlice,
  toGenderSlice,
  toRegionSlice,
} from "@/utils/to-breakdown-slice";

/** Fila de `public.google_ads_campaigns`, el buzón que llena el script. */
export interface GoogleAdsCampaignRow {
  customer_id: string;
  external_campaign_id: string;
  name: string;
  status: string;
  objective: string | null;
  spend: number | string;
  impressions: number;
  clicks: number;
  reach: number;
  video_plays: number;
  engagement: number;
  comments: number;
  shares: number;
  reactions: number;
  starts_at: string | null;
  ends_at: string | null;
}

/** Fila de `public.google_ads_daily`. */
export interface GoogleAdsDailyRow {
  customer_id: string;
  external_campaign_id: string;
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

export const GOOGLE_ADS_CAMPAIGN_COLUMNS =
  "customer_id, external_campaign_id, name, status, objective, spend, impressions, clicks, reach, video_plays, engagement, comments, shares, reactions, starts_at, ends_at";

export const GOOGLE_ADS_DAILY_COLUMNS =
  "customer_id, external_campaign_id, metric_date, spend, impressions, clicks, reach, video_plays, engagement, comments, shares, reactions";

/**
 * Convierte la fila del buzón en el draft que entiende el resto de adsme. La
 * conexión se inyecta aquí porque es la del usuario que está sincronizando: el
 * buzón es común, pero cada uno materializa las campañas en su propio espacio.
 */
export function toGoogleCampaignDraft(
  connectionId: string,
  row: GoogleAdsCampaignRow,
): CampaignDraft {
  return {
    connectionId,
    externalCampaignId: row.external_campaign_id,
    name: row.name,
    status: row.status,
    objective: row.objective,
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
    startsAt: row.starts_at,
    endsAt: row.ends_at,
    extra: { customerId: row.customer_id },
  };
}

/** Convierte la fila diaria del buzón en el día que espera el caso de uso. */
export function toGoogleDayInsight(row: GoogleAdsDailyRow): CampaignDayInsight {
  return {
    externalCampaignId: row.external_campaign_id,
    date: row.metric_date,
    spend: Number(row.spend),
    impressions: Number(row.impressions),
    clicks: Number(row.clicks),
    reach: Number(row.reach),
    videoPlays: Number(row.video_plays),
    engagement: Number(row.engagement),
    comments: Number(row.comments),
    shares: Number(row.shares),
    reactions: Number(row.reactions),
    extra: {},
  };
}

/**
 * Fila de `public.google_ads_breakdowns`. El valor llega tal como lo nombra
 * Google (`AGE_RANGE_25_34`, `FEMALE`, `Antioquia`): normalizarlo es cosa de
 * adsme, no del script, para no tener dos traducciones que mantener a la vez.
 */
export interface GoogleAdsBreakdownRow {
  external_campaign_id: string;
  kind: string;
  value: string;
  impressions: number;
}

export const GOOGLE_ADS_BREAKDOWN_COLUMNS =
  "external_campaign_id, kind, value, impressions";

/**
 * Convierte la fila del buzón en el tramo que espera el caso de uso. Devuelve
 * `null` si el eje no es uno de los que el reporte pinta, para que quien llama
 * la descarte en vez de guardar algo que nadie va a leer.
 */
export function toGoogleBreakdownInsight(
  row: GoogleAdsBreakdownRow,
): CampaignBreakdownInsight | null {
  const impressions = Number(row.impressions);

  if (impressions <= 0) return null;

  const slice =
    row.kind === "age"
      ? toAgeSlice(row.value, impressions)
      : row.kind === "gender"
        ? toGenderSlice(row.value, impressions)
        : row.kind === "region"
          ? toRegionSlice(row.value, impressions)
          : null;

  if (!slice) return null;

  return { ...slice, externalCampaignId: row.external_campaign_id };
}

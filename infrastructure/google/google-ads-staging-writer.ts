import "server-only";

import type { SupabaseClient } from "@supabase/supabase-js";
import type { GoogleAdsIngestInput } from "@/validators/google-ads-ingest.validators";

const CAMPAIGNS_TABLE = "google_ads_campaigns";
const DAILY_TABLE = "google_ads_daily";

/** Filas escritas en cada lote, contadas por tabla. */
export interface GoogleAdsIngestCount {
  campaigns: number;
  daily: number;
}

/**
 * Vuelca en el buzón lo que envía el script de Google Ads.
 *
 * Es upsert por la clave natural de cada tabla, así que reenviar un lote —algo
 * que pasa cuando el script reintenta— actualiza en vez de duplicar. Lanza si
 * la escritura falla: el script necesita ver el error para reintentar.
 */
export async function saveGoogleAdsExport(
  supabase: SupabaseClient,
  payload: GoogleAdsIngestInput,
): Promise<GoogleAdsIngestCount> {
  const { customerId, campaigns, daily } = payload;

  if (campaigns.length > 0) {
    const { error } = await supabase.from(CAMPAIGNS_TABLE).upsert(
      campaigns.map((campaign) => ({
        customer_id: customerId,
        external_campaign_id: campaign.externalCampaignId,
        name: campaign.name,
        status: campaign.status,
        objective: campaign.objective ?? null,
        spend: campaign.spend,
        impressions: campaign.impressions,
        clicks: campaign.clicks,
        reach: campaign.reach,
        video_plays: campaign.videoPlays,
        engagement: campaign.engagement,
        comments: campaign.comments,
        shares: campaign.shares,
        reactions: campaign.reactions,
        starts_at: campaign.startsAt ?? null,
        ends_at: campaign.endsAt ?? null,
        ingested_at: new Date().toISOString(),
      })),
      { onConflict: "customer_id,external_campaign_id" },
    );

    if (error) throw error;
  }

  if (daily.length > 0) {
    const { error } = await supabase.from(DAILY_TABLE).upsert(
      daily.map((day) => ({
        customer_id: customerId,
        external_campaign_id: day.externalCampaignId,
        metric_date: day.date,
        spend: day.spend,
        impressions: day.impressions,
        clicks: day.clicks,
        reach: day.reach,
        video_plays: day.videoPlays,
        engagement: day.engagement,
        comments: day.comments,
        shares: day.shares,
        reactions: day.reactions,
        ingested_at: new Date().toISOString(),
      })),
      { onConflict: "customer_id,external_campaign_id,metric_date" },
    );

    if (error) throw error;
  }

  return { campaigns: campaigns.length, daily: daily.length };
}

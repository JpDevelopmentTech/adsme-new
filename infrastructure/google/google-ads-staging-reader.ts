import "server-only";

import type { SupabaseClient } from "@supabase/supabase-js";
import {
  GOOGLE_ADS_CAMPAIGN_COLUMNS,
  GOOGLE_ADS_DAILY_COLUMNS,
  type GoogleAdsCampaignRow,
  type GoogleAdsDailyRow,
} from "@/infrastructure/google/google-ads-staging-row";
import { getGoogleAdsCustomerId } from "@/infrastructure/google/google-ads-env";

const CAMPAIGNS_TABLE = "google_ads_campaigns";
const DAILY_TABLE = "google_ads_daily";

/** Filas por vuelta. Supabase corta en 1000 y la serie diaria supera eso. */
const PAGE_SIZE = 1_000;

/** Campañas del buzón, acotadas a la cuenta configurada si la hay. */
export async function readStagedCampaigns(
  supabase: SupabaseClient,
): Promise<GoogleAdsCampaignRow[]> {
  return readAllPages<GoogleAdsCampaignRow>((from, to) => {
    const request = supabase
      .from(CAMPAIGNS_TABLE)
      .select(GOOGLE_ADS_CAMPAIGN_COLUMNS)
      .order("external_campaign_id", { ascending: true })
      .range(from, to);

    const customerId = getGoogleAdsCustomerId();

    return customerId ? request.eq("customer_id", customerId) : request;
  });
}

/**
 * Serie diaria del buzón desde `since` inclusive. Con `null` se devuelve todo
 * lo que haya, que es lo que corresponde la primera vez que se sincroniza.
 */
export async function readStagedDaily(
  supabase: SupabaseClient,
  since: string | null,
): Promise<GoogleAdsDailyRow[]> {
  return readAllPages<GoogleAdsDailyRow>((from, to) => {
    let request = supabase
      .from(DAILY_TABLE)
      .select(GOOGLE_ADS_DAILY_COLUMNS)
      .order("metric_date", { ascending: true })
      .order("external_campaign_id", { ascending: true })
      .range(from, to);

    const customerId = getGoogleAdsCustomerId();

    if (customerId) request = request.eq("customer_id", customerId);
    if (since) request = request.gte("metric_date", since);

    return request;
  });
}

/**
 * Recorre la tabla por páginas hasta agotarla. Sin esto una cuenta con varios
 * meses de histórico se quedaría en las primeras mil filas y la serie diaria
 * saldría truncada sin dar ningún error.
 */
async function readAllPages<TRow>(
  page: (from: number, to: number) => PromiseLike<{
    data: TRow[] | null;
    error: { message: string } | null;
  }>,
): Promise<TRow[]> {
  const rows: TRow[] = [];

  for (let from = 0; ; from += PAGE_SIZE) {
    const { data, error } = await page(from, from + PAGE_SIZE - 1);

    if (error) throw new Error(error.message);
    if (!data || data.length === 0) break;

    rows.push(...data);

    if (data.length < PAGE_SIZE) break;
  }

  return rows;
}

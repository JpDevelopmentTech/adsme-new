import "server-only";

import type { SupabaseClient } from "@supabase/supabase-js";
import type { CampaignDayInsight } from "@/domain/entities/campaign-daily";
import type { DailyInsightsProvider } from "@/domain/interfaces/daily-insights-provider";
import { readStagedDaily } from "@/infrastructure/google/google-ads-staging-reader";
import { toGoogleDayInsight } from "@/infrastructure/google/google-ads-staging-row";

/**
 * Implementa el port de series diarias leyendo del buzón en lugar de llamar a
 * una API. Para el caso de uso es indistinguible de Meta o TikTok: recibe los
 * mismos días y no necesita saber que aquí los dejó un script programado.
 *
 * La conexión no se usa porque el buzón es común a todos los usuarios; qué
 * cuenta se lee lo decide `GOOGLE_ADS_CUSTOMER_ID`, no quién sincroniza.
 */
export function createGoogleDailyInsightsProvider(
  supabase: SupabaseClient,
): DailyInsightsProvider {
  return {
    async fetchDailyInsights(
      _connection,
      since: string | null,
    ): Promise<CampaignDayInsight[]> {
      const rows = await readStagedDaily(supabase, since);

      return rows.map(toGoogleDayInsight);
    },
  };
}

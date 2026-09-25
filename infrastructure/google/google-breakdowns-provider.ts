import "server-only";

import type { SupabaseClient } from "@supabase/supabase-js";
import type { CampaignBreakdownInsight } from "@/domain/entities/campaign-breakdown";
import type { BreakdownInsightsProvider } from "@/domain/interfaces/breakdown-insights-provider";
import { readStagedBreakdowns } from "@/infrastructure/google/google-ads-staging-reader";
import { toGoogleBreakdownInsight } from "@/infrastructure/google/google-ads-staging-row";

/**
 * Implementa el port de repartos leyendo del buzón en lugar de llamar a una
 * API, igual que el proveedor de series diarias: para el caso de uso es
 * indistinguible de Meta o TikTok.
 *
 * No usa la conexión porque el buzón es común a todos los usuarios; qué cuenta
 * se lee lo decide `GOOGLE_ADS_CUSTOMER_ID`, no quién sincroniza.
 */
export function createGoogleBreakdownsProvider(
  supabase: SupabaseClient,
): BreakdownInsightsProvider {
  return {
    async fetchBreakdowns(): Promise<CampaignBreakdownInsight[]> {
      const rows = await readStagedBreakdowns(supabase);

      return rows
        .map(toGoogleBreakdownInsight)
        .filter((insight): insight is CampaignBreakdownInsight => insight !== null);
    },
  };
}

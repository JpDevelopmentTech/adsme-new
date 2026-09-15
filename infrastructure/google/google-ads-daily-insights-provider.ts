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
 * No usa ninguno de los dos argumentos del port, y TypeScript deja declararlo
 * sin ellos. La conexión no pinta nada porque el buzón es común a todos los
 * usuarios: qué cuenta se lee lo decide `GOOGLE_ADS_CUSTOMER_ID`, no quién
 * sincroniza. Y `since` acota en las otras plataformas lo que se descarga de su
 * API; aquí acotaría una consulta a una tabla propia y, a cambio, dejaría fuera
 * para siempre el histórico de años anteriores que el script ya trajo, porque
 * el caso de uso pide desde el último día importado. Al ser upsert, releer el
 * buzón entero en cada sync solo reescribe lo mismo.
 */
export function createGoogleDailyInsightsProvider(
  supabase: SupabaseClient,
): DailyInsightsProvider {
  return {
    async fetchDailyInsights(): Promise<CampaignDayInsight[]> {
      const rows = await readStagedDaily(supabase, null);

      return rows.map(toGoogleDayInsight);
    },
  };
}

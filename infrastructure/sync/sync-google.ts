import "server-only";

import type { SupabaseClient } from "@supabase/supabase-js";
import { GOOGLE_ADS_ERRORS } from "@/constants/google-ads.constants";
import type { Connection } from "@/domain/entities/connection";
import { syncFailed, type SyncOutcome } from "@/domain/entities/sync-outcome";
import type { CampaignRepository } from "@/domain/interfaces/campaign-repository";
import { createGetCurrentUser } from "@/domain/use-cases/get-current-user";
import { createImportCampaignDailyMetrics } from "@/domain/use-cases/import-campaign-daily-metrics";
import { createImportCampaigns } from "@/domain/use-cases/import-campaigns";
import { ensureGoogleConnection } from "@/infrastructure/google/ensure-google-connection";
import { createGoogleDailyInsightsProvider } from "@/infrastructure/google/google-ads-daily-insights-provider";
import { readStagedCampaigns } from "@/infrastructure/google/google-ads-staging-reader";
import { toGoogleCampaignDraft } from "@/infrastructure/google/google-ads-staging-row";
import { createSupabaseAuthRepository } from "@/infrastructure/repositories/supabase-auth-repository";
import { createSupabaseCampaignDailyRepository } from "@/infrastructure/repositories/supabase-campaign-daily-repository";
import { createSupabaseCampaignRepository } from "@/infrastructure/repositories/supabase-campaign-repository";
import { createSupabaseConnectionRepository } from "@/infrastructure/repositories/supabase-connection-repository";

/**
 * Materializa en el espacio del usuario lo que el script dejó en el buzón.
 *
 * Aquí no se llama a ninguna API: los datos ya están en `google_ads_campaigns`
 * y `google_ads_daily`, que son comunes a todos. Cada usuario se lleva su propia
 * copia a `campaigns` para poder vincularla a sus trabajos sin pisar a nadie, y
 * como es upsert, las que ya tuviera vinculadas conservan la asociación.
 */
export async function syncGoogle(supabase: SupabaseClient): Promise<SyncOutcome> {
  const user = await createGetCurrentUser(createSupabaseAuthRepository(supabase))();

  if (!user) return syncFailed(GOOGLE_ADS_ERRORS.connectionFailed);

  const staged = await readStagedCampaigns(supabase);

  // Sin datos en el buzón no se crea conexión: dejarla vacía haría creer que
  // Google está sincronizado cuando el script todavía no ha corrido nunca.
  if (staged.length === 0) return syncFailed(GOOGLE_ADS_ERRORS.noData);

  const connection = await ensureGoogleConnection(supabase, user.id);

  if (!connection) return syncFailed(GOOGLE_ADS_ERRORS.connectionFailed);

  const connections = createSupabaseConnectionRepository(supabase);
  const campaignRepository = createSupabaseCampaignRepository(supabase);

  const result = await createImportCampaigns(campaignRepository)(
    connection.id,
    staged.map((row) => toGoogleCampaignDraft(connection.id, row)),
  );

  if (!result.success) {
    await connections.setStatus(connection.id, "error");

    return syncFailed(GOOGLE_ADS_ERRORS.syncFailed);
  }

  const daily = await importDailyMetrics(supabase, campaignRepository, connection);

  await connections.markSynced(connection.id);

  return daily ? syncFailed(daily) : { ok: true };
}

/**
 * Importa la serie diaria ya materializadas las campañas, porque cada día
 * cuelga de una de ellas. Devuelve `null` si fue bien y el aviso para el usuario
 * si no: lo ya importado sigue siendo válido y no debe caerse con esto.
 */
async function importDailyMetrics(
  supabase: SupabaseClient,
  campaignRepository: CampaignRepository,
  connection: Connection,
): Promise<string | null> {
  try {
    const result = await createImportCampaignDailyMetrics(
      campaignRepository,
      createSupabaseCampaignDailyRepository(supabase),
      createGoogleDailyInsightsProvider(supabase),
    )(connection);

    if (result.success) return null;

    return `${GOOGLE_ADS_ERRORS.dailyFailed} No se pudo guardar (${result.error.code}).`;
  } catch {
    return GOOGLE_ADS_ERRORS.dailyFailed;
  }
}

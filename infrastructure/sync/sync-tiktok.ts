import "server-only";

import type { SupabaseClient } from "@supabase/supabase-js";
import { TIKTOK_ERRORS } from "@/constants/tiktok-ads.constants";
import type { Connection } from "@/domain/entities/connection";
import { syncFailed, type SyncOutcome } from "@/domain/entities/sync-outcome";
import type { CampaignRepository } from "@/domain/interfaces/campaign-repository";
import { createImportCampaignDailyMetrics } from "@/domain/use-cases/import-campaign-daily-metrics";
import { createImportCampaigns } from "@/domain/use-cases/import-campaigns";
import { createSupabaseCampaignDailyRepository } from "@/infrastructure/repositories/supabase-campaign-daily-repository";
import { createSupabaseCampaignRepository } from "@/infrastructure/repositories/supabase-campaign-repository";
import { createSupabaseConnectionRepository } from "@/infrastructure/repositories/supabase-connection-repository";
import { resolveTiktokAccess } from "@/infrastructure/tiktok/tiktok-access";
import { TiktokApiError } from "@/infrastructure/tiktok/tiktok-api-error";
import { fetchTiktokCampaigns } from "@/infrastructure/tiktok/tiktok-campaigns";
import { createTiktokDailyInsightsProvider } from "@/infrastructure/tiktok/tiktok-daily-insights-provider";
import { toTiktokCampaignDrafts } from "@/utils/to-tiktok-campaign-drafts";

/**
 * Importa campañas y serie diaria de la cuenta de TikTok conectada. Al ser
 * upsert, las campañas ya vinculadas a un trabajo conservan esa asociación.
 *
 * Devuelve el resultado en vez de redirigir: el sync global recorre todas las
 * plataformas y una redirección a mitad se llevaría por delante las que faltan.
 */
export async function syncTiktok(supabase: SupabaseClient): Promise<SyncOutcome> {
  const connections = createSupabaseConnectionRepository(supabase);
  const connection = await connections.findByPlatform("tiktok");

  if (!connection) return syncFailed(TIKTOK_ERRORS.notConnected);

  const access = await resolveTiktokAccess(connection, connections);

  if (access.status === "revoked") {
    return syncFailed(TIKTOK_ERRORS.needsReauthorization);
  }
  if (access.status === "failed") return syncFailed(TIKTOK_ERRORS.syncFailed);

  let campaigns;
  try {
    campaigns = await fetchTiktokCampaigns(
      access.accessToken,
      connection.externalAccountId,
    );
  } catch (error) {
    if (error instanceof TiktokApiError && error.needsReauthorization) {
      await connections.setStatus(connection.id, "revocado");

      return syncFailed(TIKTOK_ERRORS.needsReauthorization);
    }

    const detail = error instanceof TiktokApiError ? ` ${error.message}` : "";
    await connections.setStatus(connection.id, "error");

    return syncFailed(`${TIKTOK_ERRORS.syncFailed}${detail}`);
  }

  const campaignRepository = createSupabaseCampaignRepository(supabase);

  const result = await createImportCampaigns(campaignRepository)(
    connection.id,
    toTiktokCampaignDrafts(connection.id, campaigns),
  );

  if (!result.success) {
    await connections.setStatus(connection.id, "error");

    return syncFailed(TIKTOK_ERRORS.syncFailed);
  }

  // El día a día va después de las campañas porque cada fila cuelga de una de
  // ellas. Que falle no invalida lo ya importado: se avisa y se sigue.
  const daily = await importDailyMetrics(
    supabase,
    campaignRepository,
    connection,
    access.accessToken,
  );

  await connections.markSynced(connection.id);

  return daily ? syncFailed(daily) : { ok: true };
}

/**
 * Importa la serie diaria de la conexión. Devuelve `null` si fue bien y el
 * mensaje para el usuario si no, con el motivo que dé TikTok: sin él, un fallo
 * de rango, de métrica no soportada o de permisos son indistinguibles entre sí.
 *
 * Nunca lanza: la importación de campañas ya se guardó y no debe caerse con ella.
 */
async function importDailyMetrics(
  supabase: SupabaseClient,
  campaignRepository: CampaignRepository,
  connection: Connection,
  accessToken: string,
): Promise<string | null> {
  try {
    const result = await createImportCampaignDailyMetrics(
      campaignRepository,
      createSupabaseCampaignDailyRepository(supabase),
      createTiktokDailyInsightsProvider(accessToken),
    )(connection);

    if (result.success) return null;

    return `${TIKTOK_ERRORS.dailyFailed} No se pudo guardar (${result.error.code}).`;
  } catch (error) {
    const detail = error instanceof TiktokApiError ? ` ${error.message}` : "";

    return `${TIKTOK_ERRORS.dailyFailed}${detail}`;
  }
}

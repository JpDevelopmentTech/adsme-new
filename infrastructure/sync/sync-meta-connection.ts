import "server-only";

import type { SupabaseClient } from "@supabase/supabase-js";
import { META_ERRORS } from "@/constants/meta-ads.constants";
import type { Connection } from "@/domain/entities/connection";
import { syncFailed, type SyncOutcome } from "@/domain/entities/sync-outcome";
import type { CampaignRepository } from "@/domain/interfaces/campaign-repository";
import { createImportCampaignDailyMetrics } from "@/domain/use-cases/import-campaign-daily-metrics";
import { createImportCampaigns } from "@/domain/use-cases/import-campaigns";
import { fetchCampaigns } from "@/infrastructure/meta/meta-api";
import { MetaApiError } from "@/infrastructure/meta/meta-api-error";
import { createMetaBreakdownsProvider } from "@/infrastructure/meta/meta-breakdowns-provider";
import { createMetaDailyInsightsProvider } from "@/infrastructure/meta/meta-daily-insights-provider";
import { createSupabaseCampaignDailyRepository } from "@/infrastructure/repositories/supabase-campaign-daily-repository";
import { createSupabaseCampaignRepository } from "@/infrastructure/repositories/supabase-campaign-repository";
import type { ConnectionRepository } from "@/infrastructure/repositories/supabase-connection-repository";
import { importBreakdowns } from "@/infrastructure/sync/import-breakdowns";
import { toMetaCampaignDrafts } from "@/utils/to-meta-campaign-drafts";

/**
 * Importa campañas y serie diaria de una cuenta de Meta. Al ser upsert, las
 * campañas ya vinculadas a un trabajo conservan esa asociación.
 *
 * Devuelve el resultado en vez de redirigir: el sync recorre todas las cuentas
 * y una redirección a mitad se llevaría por delante las que faltan.
 */
export async function syncMetaConnection(
  supabase: SupabaseClient,
  connections: ConnectionRepository,
  connection: Connection,
): Promise<SyncOutcome> {
  // El token de Meta es de larga duración: si caducó hay que reautorizar,
  // no hay refresh_token con el que renovarlo por detrás.
  if (connection.tokenExpiresAt && connection.tokenExpiresAt < new Date().toISOString()) {
    await connections.setStatus(connection.id, "expirado");

    return syncFailed(META_ERRORS.tokenExpired);
  }

  let campaigns;
  try {
    campaigns = await fetchCampaigns(
      connection.accessToken,
      connection.externalAccountId,
    );
  } catch (error) {
    // El motivo viene de Meta: sin él, un fallo se confunde con «no hay campañas».
    await connections.setStatus(connection.id, "error");
    const detail = error instanceof MetaApiError ? ` ${error.message}` : "";

    return syncFailed(`${META_ERRORS.syncFailed}${detail}`);
  }

  const campaignRepository = createSupabaseCampaignRepository(supabase);

  const result = await createImportCampaigns(campaignRepository)(
    connection.id,
    toMetaCampaignDrafts(connection.id, campaigns),
  );

  if (!result.success) {
    await connections.setStatus(connection.id, "error");

    return syncFailed(META_ERRORS.syncFailed);
  }

  // El día a día y el reparto van después de las campañas porque cuelgan de
  // ellas. Que fallen no invalida lo ya importado: se avisa y se sigue.
  const warnings = [
    await importDailyMetrics(supabase, campaignRepository, connection),
    await importBreakdowns(
      supabase,
      campaignRepository,
      connection,
      createMetaBreakdownsProvider(),
      META_ERRORS.breakdownsFailed,
    ),
  ].filter((message): message is string => message !== null);

  await connections.markSynced(connection.id);

  return warnings.length > 0 ? syncFailed(warnings.join(" ")) : { ok: true };
}

/**
 * Importa la serie diaria de la conexión. Devuelve `null` si fue bien y el
 * mensaje para el usuario si no, con el motivo que dé Meta: sin él, un fallo de
 * rango, de métrica no soportada o de permisos son indistinguibles entre sí.
 *
 * Nunca lanza: la importación de campañas ya se guardó y no debe caerse con ella.
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
      createMetaDailyInsightsProvider(),
    )(connection);

    if (result.success) return null;

    return `${META_ERRORS.dailyFailed} No se pudo guardar (${result.error.code}).`;
  } catch (error) {
    const detail = error instanceof MetaApiError ? ` ${error.message}` : "";

    return `${META_ERRORS.dailyFailed}${detail}`;
  }
}

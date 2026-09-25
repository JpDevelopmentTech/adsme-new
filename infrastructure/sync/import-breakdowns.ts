import "server-only";

import type { SupabaseClient } from "@supabase/supabase-js";
import type { Connection } from "@/domain/entities/connection";
import type { BreakdownInsightsProvider } from "@/domain/interfaces/breakdown-insights-provider";
import type { CampaignRepository } from "@/domain/interfaces/campaign-repository";
import { createImportCampaignBreakdowns } from "@/domain/use-cases/import-campaign-breakdowns";
import { createSupabaseCampaignBreakdownRepository } from "@/infrastructure/repositories/supabase-campaign-breakdown-repository";

/**
 * Importa el reparto por audiencia y territorio de una conexión. Devuelve
 * `null` si fue bien y el mensaje para el usuario si no, con el motivo que dé
 * la plataforma: sin él, un desglose no soportado y un fallo de permisos se ven
 * igual.
 *
 * Es común a las tres plataformas porque el aviso es el mismo en todas: lo
 * único que cambia es el adaptador y la frase de cabecera.
 *
 * Nunca lanza. Las campañas y su serie diaria ya están guardadas, y el reparto
 * es lo accesorio del reporte: que falle no debe tumbar una sincronización que
 * ya trajo lo importante.
 */
export async function importBreakdowns(
  supabase: SupabaseClient,
  campaignRepository: CampaignRepository,
  connection: Connection,
  provider: BreakdownInsightsProvider,
  failureMessage: string,
): Promise<string | null> {
  try {
    const result = await createImportCampaignBreakdowns(
      campaignRepository,
      createSupabaseCampaignBreakdownRepository(supabase),
      provider,
    )(connection);

    if (result.success) return null;

    return `${failureMessage} No se pudo guardar (${result.error.code}).`;
  } catch (error) {
    const detail = error instanceof Error ? ` ${error.message}` : "";

    return `${failureMessage}${detail}`;
  }
}

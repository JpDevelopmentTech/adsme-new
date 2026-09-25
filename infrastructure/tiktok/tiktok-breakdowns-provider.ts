import "server-only";

import type { CampaignBreakdownInsight } from "@/domain/entities/campaign-breakdown";
import type { Connection } from "@/domain/entities/connection";
import type { BreakdownInsightsProvider } from "@/domain/interfaces/breakdown-insights-provider";
import { fetchTiktokAudience } from "@/infrastructure/tiktok/tiktok-audience-report";

/**
 * Adaptador de TikTok para el port de repartos. Aporta sexo y edad; el
 * territorio no, porque su informe devuelve la provincia como identificador
 * numérico y el catálogo de nombres vive en otro endpoint: una región sin
 * nombre no se puede pintar, así que es mejor no aportarla que aportar un id.
 *
 * Recibe el token ya resuelto porque el guardado puede estar caducado y quien
 * sabe renovarlo es `resolveTiktokAccess`, no este adaptador.
 */
export function createTiktokBreakdownsProvider(
  accessToken: string,
): BreakdownInsightsProvider {
  return {
    async fetchBreakdowns(
      connection: Connection,
    ): Promise<CampaignBreakdownInsight[]> {
      return fetchTiktokAudience(accessToken, connection.externalAccountId);
    },
  };
}

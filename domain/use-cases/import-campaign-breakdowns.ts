import type { CampaignListQuery } from "@/domain/entities/campaign";
import type { ClientResult } from "@/domain/entities/client-error";
import type { Connection } from "@/domain/entities/connection";
import type { BreakdownInsightsProvider } from "@/domain/interfaces/breakdown-insights-provider";
import type { CampaignBreakdownRepository } from "@/domain/interfaces/campaign-breakdown-repository";
import type { CampaignRepository } from "@/domain/interfaces/campaign-repository";
import { toCampaignBreakdownDrafts } from "@/utils/to-campaign-breakdown-drafts";

/**
 * Caso de uso: traer de la plataforma el reparto por audiencia y territorio de
 * las campañas de una conexión y guardarlo.
 *
 * Se ejecuta después de importar las campañas, porque cada tramo cuelga de la
 * campaña ya existente en adsme. Siempre pide el acumulado completo: es una
 * foto del reparto, no una serie a la que se añadan días.
 */
export function createImportCampaignBreakdowns(
  campaignRepository: CampaignRepository,
  breakdownRepository: CampaignBreakdownRepository,
  provider: BreakdownInsightsProvider,
) {
  return async function importCampaignBreakdowns(
    connection: Connection,
  ): Promise<ClientResult<number>> {
    const [insights, campaigns] = await Promise.all([
      provider.fetchBreakdowns(connection),
      campaignRepository.listCampaigns(connectionQuery(connection.id)),
    ]);

    return breakdownRepository.replaceBreakdowns(
      campaigns.map((campaign) => campaign.id),
      toCampaignBreakdownDrafts(insights, campaigns),
    );
  };
}

/** Todas las campañas de la conexión, que es contra lo que se cruzan los tramos. */
function connectionQuery(connectionId: string): CampaignListQuery {
  return { search: "", connectionId, link: "all" };
}

import { DAILY_LOOKBACK_DAYS } from "@/constants/campaign-daily.constants";
import type { CampaignListQuery } from "@/domain/entities/campaign";
import type { ClientResult } from "@/domain/entities/client-error";
import type { Connection } from "@/domain/entities/connection";
import type { CampaignDailyRepository } from "@/domain/interfaces/campaign-daily-repository";
import type { CampaignRepository } from "@/domain/interfaces/campaign-repository";
import type { DailyInsightsProvider } from "@/domain/interfaces/daily-insights-provider";
import { shiftIsoDate } from "@/utils/shift-iso-date";
import { toCampaignDailyDrafts } from "@/utils/to-campaign-daily-drafts";

/**
 * Caso de uso: traer de la plataforma el día a día de las campañas y guardarlo.
 * Se ejecuta después de importar las campañas, porque cada día cuelga de la
 * campaña ya existente en adsme.
 *
 * La primera vez pide el histórico completo; a partir de ahí solo lo nuevo más
 * una ventana de reproceso, para no descargar años de datos en cada sync.
 */
export function createImportCampaignDailyMetrics(
  campaignRepository: CampaignRepository,
  dailyRepository: CampaignDailyRepository,
  provider: DailyInsightsProvider,
) {
  return async function importCampaignDailyMetrics(
    connection: Connection,
  ): Promise<ClientResult<number>> {
    const lastImported = await dailyRepository.findLastImportedDate(
      connection.id,
    );

    const since = lastImported
      ? shiftIsoDate(lastImported, -DAILY_LOOKBACK_DAYS)
      : null;

    const [insights, campaigns] = await Promise.all([
      provider.fetchDailyInsights(connection, since),
      campaignRepository.listCampaigns(connectionQuery(connection.id)),
    ]);

    return dailyRepository.upsertDailyMetrics(
      toCampaignDailyDrafts(insights, campaigns),
    );
  };
}

/** Todas las campañas de la conexión, que es contra lo que se cruzan los días. */
function connectionQuery(connectionId: string): CampaignListQuery {
  return { search: "", connectionId, link: "all" };
}

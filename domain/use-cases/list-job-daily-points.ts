import type {
  CampaignDailyPoint,
  DailyRange,
} from "@/domain/entities/campaign-daily";
import type { CampaignDailyReader } from "@/domain/interfaces/campaign-daily-reader";

/**
 * Caso de uso: la serie diaria de las campañas vinculadas a un trabajo dentro
 * de un rango. Es lo que alimenta la evolución del lanzamiento en su detalle.
 */
export function createListJobDailyPoints(reader: CampaignDailyReader) {
  return async function listJobDailyPoints(
    jobId: string,
    range: DailyRange,
  ): Promise<CampaignDailyPoint[]> {
    return reader.listJobDailyPoints(jobId, range);
  };
}

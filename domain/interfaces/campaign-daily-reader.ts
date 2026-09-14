import type {
  CampaignDailyPoint,
  DailyRange,
} from "@/domain/entities/campaign-daily";

/**
 * Port de solo lectura de la serie diaria. El dashboard únicamente consulta un
 * rango de fechas, así que no depende del port de escritura.
 */
export interface CampaignDailyReader {
  listDailyPoints(range: DailyRange): Promise<CampaignDailyPoint[]>;
}

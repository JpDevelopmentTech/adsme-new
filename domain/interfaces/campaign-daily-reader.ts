import type {
  CampaignDailyPoint,
  DailyRange,
} from "@/domain/entities/campaign-daily";

/**
 * Port de solo lectura de la serie diaria. El dashboard y el detalle del
 * trabajo solo consultan, así que no dependen del port de escritura.
 */
export interface CampaignDailyReader {
  /** Todos los días del rango, de todas las campañas del usuario. */
  listDailyPoints(range: DailyRange): Promise<CampaignDailyPoint[]>;
  /** Los días del rango de las campañas vinculadas a un trabajo concreto. */
  listJobDailyPoints(jobId: string, range: DailyRange): Promise<CampaignDailyPoint[]>;
}

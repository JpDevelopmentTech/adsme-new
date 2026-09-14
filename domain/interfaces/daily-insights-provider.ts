import type { CampaignDayInsight } from "@/domain/entities/campaign-daily";
import type { Connection } from "@/domain/entities/connection";

/**
 * Port de la plataforma publicitaria como fuente de series diarias. Aísla al
 * dominio de la API concreta: hoy solo lo implementa Meta, pero YouTube y
 * TikTok entrarán por aquí sin tocar el caso de uso.
 */
export interface DailyInsightsProvider {
  /**
   * Días de todas las campañas de la cuenta. `since` acota la petición al
   * primer día que interesa; con `null` se pide el histórico completo que la
   * plataforma permita consultar.
   */
  fetchDailyInsights(
    connection: Connection,
    since: string | null,
  ): Promise<CampaignDayInsight[]>;
}

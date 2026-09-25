import type { CampaignBreakdownInsight } from "@/domain/entities/campaign-breakdown";
import type { Connection } from "@/domain/entities/connection";

/**
 * Port de la plataforma publicitaria como fuente de repartos por audiencia y
 * territorio. Aísla al dominio de la API concreta: cada plataforma nombra sus
 * tramos a su manera y es su adaptador quien los normaliza.
 */
export interface BreakdownInsightsProvider {
  /** Reparto acumulado de todas las campañas de la cuenta. */
  fetchBreakdowns(connection: Connection): Promise<CampaignBreakdownInsight[]>;
}

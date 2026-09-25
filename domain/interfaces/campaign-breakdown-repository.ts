import type { CampaignBreakdownDraft } from "@/domain/entities/campaign-breakdown";
import type { ClientResult } from "@/domain/entities/client-error";

/** Port de escritura del reparto por audiencia y territorio. */
export interface CampaignBreakdownRepository {
  /**
   * Sustituye el reparto de esas campañas por el recibido. Es reemplazo y no
   * mezcla porque un tramo que deja de aparecer —una región donde ya no se
   * entrega— tiene que desaparecer del reporte, y un upsert lo dejaría vivo
   * para siempre con su última cifra.
   */
  replaceBreakdowns(
    campaignIds: string[],
    drafts: CampaignBreakdownDraft[],
  ): Promise<ClientResult<number>>;
}

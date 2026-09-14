import type { CampaignDailyDraft } from "@/domain/entities/campaign-daily";
import type { ClientResult } from "@/domain/entities/client-error";
import type { CampaignDailyReader } from "@/domain/interfaces/campaign-daily-reader";

/** Port de escritura de la serie diaria de métricas. */
export interface CampaignDailyRepository extends CampaignDailyReader {
  /**
   * Último día ya importado para las campañas de una conexión, o `null` si
   * nunca se importó nada. Es lo que permite pedir a la plataforma solo lo
   * nuevo en vez de todo el histórico en cada sincronización.
   */
  findLastImportedDate(connectionId: string): Promise<string | null>;

  /**
   * Inserta o actualiza días en bloque. Reimportar un día ya guardado lo
   * sustituye: las plataformas reajustan cifras durante los días siguientes.
   */
  upsertDailyMetrics(
    drafts: CampaignDailyDraft[],
  ): Promise<ClientResult<number>>;
}

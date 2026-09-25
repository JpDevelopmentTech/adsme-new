import type { SupabaseClient } from "@supabase/supabase-js";
import type { CampaignBreakdownDraft } from "@/domain/entities/campaign-breakdown";
import type { ClientResult } from "@/domain/entities/client-error";
import type { CampaignBreakdownRepository } from "@/domain/interfaces/campaign-breakdown-repository";
import { toCampaignBreakdownRow } from "@/infrastructure/repositories/campaign-breakdown-row";
import { toClientError } from "@/infrastructure/repositories/supabase-client-error-mapper";
import { chunk } from "@/utils/chunk";

const BREAKDOWNS_TABLE = "campaign_breakdowns";

/**
 * Filas por escritura. Una cuenta con muchas campañas multiplica tramos —seis
 * franjas de edad, tres sexos y una región por cada una—, y mandarlos en una
 * sola petición desborda el cuerpo admitido.
 */
const INSERT_BATCH_SIZE = 500;

/** Implementación del port de repartos sobre Supabase; RLS aísla por usuario. */
export function createSupabaseCampaignBreakdownRepository(
  supabase: SupabaseClient,
): CampaignBreakdownRepository {
  return {
    async replaceBreakdowns(
      campaignIds: string[],
      drafts: CampaignBreakdownDraft[],
    ): Promise<ClientResult<number>> {
      // Sin tramos no se borra nada. Una plataforma que devuelve vacío suele
      // estar teniendo un mal día o reteniendo el dato por umbral de privacidad,
      // y vaciar el reporte por eso es peor que dejar el reparto anterior.
      if (campaignIds.length === 0 || drafts.length === 0) {
        return { success: true, value: 0 };
      }

      const { error: cleared } = await supabase
        .from(BREAKDOWNS_TABLE)
        .delete()
        .in("campaign_id", campaignIds);

      if (cleared) return { success: false, error: toClientError(cleared) };

      for (const batch of chunk(drafts, INSERT_BATCH_SIZE)) {
        const { error } = await supabase
          .from(BREAKDOWNS_TABLE)
          .insert(batch.map(toCampaignBreakdownRow));

        if (error) return { success: false, error: toClientError(error) };
      }

      return { success: true, value: drafts.length };
    },
  };
}

import type { SupabaseClient } from "@supabase/supabase-js";
import type { NominaCampaignSpendRepository } from "@/domain/interfaces/nomina-campaign-spend-repository";
import { CAMPAIGN_SPEND_COLUMNS, toCampaignSpend, type CampaignSpendRow } from "@/infrastructure/repositories/nomina-campaign-spend-row";

/**
 * Gasto de campañas de los artistas de Nómina sobre la vista
 * `nomina_campaign_spend` (security_invoker: aplica el RLS de quien consulta).
 */
export function createSupabaseNominaCampaignSpendRepository(supabase: SupabaseClient): NominaCampaignSpendRepository {
  return {
    async listCampaignSpend() {
      const { data, error } = await supabase.from("nomina_campaign_spend").select(CAMPAIGN_SPEND_COLUMNS).returns<CampaignSpendRow[]>();
      if (error) throw error;
      return data.map(toCampaignSpend);
    },
  };
}

import type { SupabaseClient } from "@supabase/supabase-js";
import type {
  Campaign,
  CampaignDraft,
  CampaignListQuery,
} from "@/domain/entities/campaign";
import type { ClientResult } from "@/domain/entities/client-error";
import type { CampaignRepository } from "@/domain/interfaces/campaign-repository";
import {
  CAMPAIGN_COLUMNS,
  toCampaign,
  toCampaignRow,
  type CampaignRow,
} from "@/infrastructure/repositories/campaign-row";
import { toClientError } from "@/infrastructure/repositories/supabase-client-error-mapper";
import { isUuid } from "@/utils/is-uuid";

const CAMPAIGNS_TABLE = "campaigns";

/** Implementación del port de campañas sobre Supabase; el aislamiento lo da RLS. */
export function createSupabaseCampaignRepository(
  supabase: SupabaseClient,
): CampaignRepository {
  return {
    async listCampaigns(query: CampaignListQuery): Promise<Campaign[]> {
      let request = supabase.from(CAMPAIGNS_TABLE).select(CAMPAIGN_COLUMNS);

      if (query.connectionId !== "all") {
        request = request.eq("connection_id", query.connectionId);
      }
      if (query.link === "linked") request = request.not("job_id", "is", null);
      if (query.link === "unlinked") request = request.is("job_id", null);
      if (query.search) {
        // `%` y `_` son comodines de LIKE: se escapan para no inyectarlos.
        const pattern = `%${query.search.replace(/[%_\\]/g, "\\$&")}%`;
        request = request.ilike("name", pattern);
      }

      const { data, error } = await request
        .order("spend", { ascending: false })
        .returns<CampaignRow[]>();

      if (error) throw error;

      return data.map(toCampaign);
    },

    async getCampaign(campaignId: string): Promise<Campaign | null> {
      if (!isUuid(campaignId)) return null;

      const { data, error } = await supabase
        .from(CAMPAIGNS_TABLE)
        .select(CAMPAIGN_COLUMNS)
        .eq("id", campaignId)
        .maybeSingle<CampaignRow>();

      if (error) throw error;

      return data ? toCampaign(data) : null;
    },

    async listJobCampaigns(jobId: string): Promise<Campaign[]> {
      if (!isUuid(jobId)) return [];

      const { data, error } = await supabase
        .from(CAMPAIGNS_TABLE)
        .select(CAMPAIGN_COLUMNS)
        .eq("job_id", jobId)
        .order("spend", { ascending: false })
        .returns<CampaignRow[]>();

      if (error) throw error;

      return data.map(toCampaign);
    },

    async createCampaign(draft: CampaignDraft): Promise<ClientResult<Campaign>> {
      const { data, error } = await supabase
        .from(CAMPAIGNS_TABLE)
        .insert(toCampaignRow(draft))
        .select(CAMPAIGN_COLUMNS)
        .single<CampaignRow>();

      if (error || !data) return { success: false, error: toClientError(error) };

      return { success: true, value: toCampaign(data) };
    },

    async updateCampaign(
      campaignId: string,
      draft: Partial<CampaignDraft>,
    ): Promise<ClientResult<Campaign>> {
      const { data, error } = await supabase
        .from(CAMPAIGNS_TABLE)
        .update(toCampaignRow(draft))
        .eq("id", campaignId)
        .select(CAMPAIGN_COLUMNS)
        .maybeSingle<CampaignRow>();

      if (error) return { success: false, error: toClientError(error) };
      if (!data) return { success: false, error: { code: "not_found" } };

      return { success: true, value: toCampaign(data) };
    },

    async deleteCampaign(campaignId: string): Promise<ClientResult<null>> {
      const { error } = await supabase
        .from(CAMPAIGNS_TABLE)
        .delete()
        .eq("id", campaignId);

      if (error) return { success: false, error: toClientError(error) };

      return { success: true, value: null };
    },

    async deleteConnectionCampaigns(
      connectionId: string,
    ): Promise<ClientResult<null>> {
      const { error } = await supabase
        .from(CAMPAIGNS_TABLE)
        .delete()
        .eq("connection_id", connectionId);

      if (error) return { success: false, error: toClientError(error) };

      return { success: true, value: null };
    },

    async upsertCampaigns(
      connectionId: string,
      drafts: CampaignDraft[],
    ): Promise<ClientResult<number>> {
      if (drafts.length === 0) return { success: true, value: 0 };

      // `onConflict` sobre (connection_id, external_campaign_id) actualiza las
      // métricas sin tocar `job_id`, así la vinculación sobrevive a cada sync.
      const { error } = await supabase.from(CAMPAIGNS_TABLE).upsert(
        drafts.map((draft) => ({
          ...toCampaignRow({ ...draft, connectionId }),
          synced_at: new Date().toISOString(),
        })),
        { onConflict: "connection_id,external_campaign_id" },
      );

      if (error) return { success: false, error: toClientError(error) };

      return { success: true, value: drafts.length };
    },

    async linkCampaignsToJob(
      campaignIds: string[],
      jobId: string,
    ): Promise<ClientResult<number>> {
      if (campaignIds.length === 0) return { success: true, value: 0 };

      const { error } = await supabase
        .from(CAMPAIGNS_TABLE)
        .update({ job_id: jobId })
        .in("id", campaignIds);

      if (error) return { success: false, error: toClientError(error) };

      return { success: true, value: campaignIds.length };
    },

    async linkCampaignToJob(
      campaignId: string,
      jobId: string | null,
    ): Promise<ClientResult<Campaign>> {
      const { data, error } = await supabase
        .from(CAMPAIGNS_TABLE)
        .update({ job_id: jobId })
        .eq("id", campaignId)
        .select(CAMPAIGN_COLUMNS)
        .maybeSingle<CampaignRow>();

      if (error) return { success: false, error: toClientError(error) };
      if (!data) return { success: false, error: { code: "not_found" } };

      return { success: true, value: toCampaign(data) };
    },
  };
}

import type { SupabaseClient } from "@supabase/supabase-js";
import type {
  CampaignDailyDraft,
  CampaignDailyPoint,
  DailyRange,
} from "@/domain/entities/campaign-daily";
import type { ClientResult } from "@/domain/entities/client-error";
import type { CampaignDailyRepository } from "@/domain/interfaces/campaign-daily-repository";
import {
  CAMPAIGN_DAILY_POINT_COLUMNS,
  toCampaignDailyPoint,
  toCampaignDailyRow,
  type CampaignDailyPointRow,
} from "@/infrastructure/repositories/campaign-daily-row";
import { toClientError } from "@/infrastructure/repositories/supabase-client-error-mapper";
import { chunk } from "@/utils/chunk";

const DAILY_TABLE = "campaign_daily_metrics";

/**
 * Tamaño de cada escritura. Una primera importación puede traer años de datos
 * por campaña, y mandarlos en una sola petición desborda el cuerpo admitido.
 */
const UPSERT_BATCH_SIZE = 500;

/** Implementación del port de series diarias sobre Supabase; RLS aísla por usuario. */
export function createSupabaseCampaignDailyRepository(
  supabase: SupabaseClient,
): CampaignDailyRepository {
  return {
    async listDailyPoints(range: DailyRange): Promise<CampaignDailyPoint[]> {
      const { data, error } = await supabase
        .from(DAILY_TABLE)
        .select(CAMPAIGN_DAILY_POINT_COLUMNS)
        .gte("metric_date", range.from)
        .lte("metric_date", range.to)
        .order("metric_date")
        .returns<CampaignDailyPointRow[]>();

      if (error) throw error;

      return data.map(toCampaignDailyPoint);
    },

    async findLastImportedDate(connectionId: string): Promise<string | null> {
      const { data, error } = await supabase
        .from(DAILY_TABLE)
        .select("metric_date, campaigns!inner ( connection_id )")
        .eq("campaigns.connection_id", connectionId)
        .order("metric_date", { ascending: false })
        .limit(1)
        .maybeSingle<{ metric_date: string }>();

      if (error) throw error;

      return data?.metric_date ?? null;
    },

    async upsertDailyMetrics(
      drafts: CampaignDailyDraft[],
    ): Promise<ClientResult<number>> {
      const syncedAt = new Date().toISOString();

      for (const batch of chunk(drafts, UPSERT_BATCH_SIZE)) {
        // `onConflict` sobre la clave primaria: reimportar un día lo reemplaza
        // con la última lectura de la plataforma.
        const { error } = await supabase.from(DAILY_TABLE).upsert(
          batch.map((draft) => ({
            ...toCampaignDailyRow(draft),
            synced_at: syncedAt,
          })),
          { onConflict: "campaign_id,metric_date" },
        );

        if (error) return { success: false, error: toClientError(error) };
      }

      return { success: true, value: drafts.length };
    },
  };
}

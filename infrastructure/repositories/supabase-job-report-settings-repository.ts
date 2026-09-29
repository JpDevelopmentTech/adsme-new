import type { SupabaseClient } from "@supabase/supabase-js";
import type { JobReportSettings } from "@/domain/entities/job-report-settings";
import type { JobReportSettingsRepository } from "@/domain/interfaces/job-report-settings-repository";
import { isUuid } from "@/utils/is-uuid";
import { toReportSections } from "@/utils/to-report-sections";

const JOBS_TABLE = "jobs";
const SETTINGS_COLUMNS = "cpv_optimization, charged_cpv, report_hidden_sections";

interface JobReportSettingsRow {
  cpv_optimization: boolean;
  /** PostgREST devuelve `numeric` como número o como texto según su tamaño. */
  charged_cpv: number | string | null;
  report_hidden_sections: string[];
}

/**
 * Implementación del port sobre las columnas de `jobs`. El aislamiento entre
 * usuarios lo da la RLS de la tabla.
 */
export function createSupabaseJobReportSettingsRepository(
  supabase: SupabaseClient,
): JobReportSettingsRepository {
  return {
    async getSettings(jobId: string): Promise<JobReportSettings | null> {
      if (!isUuid(jobId)) return null;

      const { data, error } = await supabase
        .from(JOBS_TABLE)
        .select(SETTINGS_COLUMNS)
        .eq("id", jobId)
        .maybeSingle<JobReportSettingsRow>();

      if (error) throw error;
      if (!data) return null;

      return {
        cpvOptimization: data.cpv_optimization,
        chargedCpv: data.charged_cpv === null ? null : Number(data.charged_cpv),
        hiddenSections: toReportSections(data.report_hidden_sections),
      };
    },

    async saveSettings(
      jobId: string,
      settings: JobReportSettings,
    ): Promise<boolean> {
      if (!isUuid(jobId)) return false;

      const { data, error } = await supabase
        .from(JOBS_TABLE)
        .update({
          cpv_optimization: settings.cpvOptimization,
          charged_cpv: settings.chargedCpv,
          report_hidden_sections: settings.hiddenSections,
        })
        .eq("id", jobId)
        .select("id")
        .maybeSingle();

      return !error && data !== null;
    },
  };
}

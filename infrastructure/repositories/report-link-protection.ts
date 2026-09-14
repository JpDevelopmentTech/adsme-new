import type { SupabaseClient } from "@supabase/supabase-js";
import type { ReportLinkProtection } from "@/domain/entities/report-link-protection";

/**
 * Escribe la protección del enlace. La función de base de datos comprueba la
 * pertenencia y cifra la clave con pgcrypto, de modo que el hash no se calcula
 * ni se transporta desde la aplicación.
 */
export async function saveReportLinkProtection(
  supabase: SupabaseClient,
  jobId: string,
  protection: ReportLinkProtection,
): Promise<boolean> {
  const { data, error } = await supabase.rpc("set_report_link_protection", {
    p_job_id: jobId,
    p_password: protection.password,
    p_expires_at: protection.expiresAt,
  });

  return !error && data === true;
}

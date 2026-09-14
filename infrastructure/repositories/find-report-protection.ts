import type { SupabaseClient } from "@supabase/supabase-js";
import type { ReportProtectionState } from "@/types/job-wizard.types";

interface ProtectionRow {
  expires_at: string | null;
  password_hash: string | null;
}

/**
 * Estado de protección del enlace de un trabajo. Devuelve si hay clave, nunca
 * el hash: el asistente solo necesita saber si ya está puesta.
 */
export async function findReportProtection(
  supabase: SupabaseClient,
  jobId: string,
): Promise<ReportProtectionState> {
  const { data } = await supabase
    .from("report_links")
    .select("expires_at, password_hash")
    .eq("job_id", jobId)
    .maybeSingle<ProtectionRow>();

  return {
    hasPassword: Boolean(data?.password_hash),
    // El campo de fecha del formulario trabaja en `YYYY-MM-DD`.
    expiresOn: data?.expires_at ? data.expires_at.slice(0, 10) : null,
  };
}

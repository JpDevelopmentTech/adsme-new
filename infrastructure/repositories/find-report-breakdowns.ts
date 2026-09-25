import type { SupabaseClient } from "@supabase/supabase-js";
import type {
  BreakdownKind,
  CampaignBreakdownSlice,
} from "@/domain/entities/campaign-breakdown";

/** Fila de `get_report_breakdowns`, ya sumadas las campañas del trabajo. */
interface BreakdownRow {
  kind: string;
  bucket: string;
  label: string;
  impressions: number | string;
}

/**
 * Reparto por audiencia y territorio del trabajo, sumando las tres
 * plataformas. Como el resto del reporte va contra una función acotada que
 * exige la versión vigente del token, así que funciona sin sesión sin exponer
 * nada más que lo que el enlace autoriza.
 *
 * Devuelve una lista vacía tanto si el trabajo aún no tiene reparto importado
 * como si el token quedó revocado.
 */
export async function findReportBreakdowns(
  supabase: SupabaseClient,
  jobId: string,
  tokenVersion: number,
): Promise<CampaignBreakdownSlice[]> {
  const { data, error } = await supabase.rpc("get_report_breakdowns", {
    job_id: jobId,
    token_version: tokenVersion,
  });

  if (error || !Array.isArray(data)) return [];

  return (data as BreakdownRow[]).map((row) => ({
    kind: row.kind as BreakdownKind,
    bucket: row.bucket,
    label: row.label,
    impressions: Number(row.impressions),
  }));
}

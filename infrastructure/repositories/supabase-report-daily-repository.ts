import type { SupabaseClient } from "@supabase/supabase-js";
import type { JobPlatform } from "@/domain/entities/job";
import type { ReportDailyPoint } from "@/domain/entities/report-metrics";
import { toReportSpend } from "@/infrastructure/repositories/to-report-spend";

/** Fila de `get_report_daily_metrics`, con todo agregado por día y plataforma. */
interface DailyMetricsRow {
  platform: string;
  metric_date: string;
  spend_by_currency: unknown;
  usd_cop_rate: unknown;
  impressions: number;
  clicks: number;
  reach: number;
  video_plays: number;
  engagement: number;
  comments: number;
  shares: number;
  reactions: number;
}

/**
 * Serie diaria del trabajo, agregada por plataforma. Como el resto del reporte
 * va contra una función acotada que exige la versión vigente del token, así que
 * funciona sin sesión sin exponer nada más que lo que el enlace autoriza.
 *
 * Devuelve una lista vacía tanto si el trabajo aún no tiene serie importada
 * como si el token quedó revocado.
 */
export async function findReportDailyMetrics(
  supabase: SupabaseClient,
  jobId: string,
  tokenVersion: number,
): Promise<ReportDailyPoint[]> {
  const { data, error } = await supabase.rpc("get_report_daily_metrics", {
    job_id: jobId,
    token_version: tokenVersion,
  });

  if (error || !Array.isArray(data)) return [];

  return (data as DailyMetricsRow[]).map(toDailyPoint);
}

function toDailyPoint(row: DailyMetricsRow): ReportDailyPoint {
  return {
    platform: row.platform as JobPlatform,
    date: row.metric_date,
    spend: toReportSpend(row.spend_by_currency, row.usd_cop_rate),
    impressions: Number(row.impressions),
    clicks: Number(row.clicks),
    reach: Number(row.reach),
    videoPlays: Number(row.video_plays),
    engagement: Number(row.engagement),
    comments: Number(row.comments),
    shares: Number(row.shares),
    reactions: Number(row.reactions),
  };
}

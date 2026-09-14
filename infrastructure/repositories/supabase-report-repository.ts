import type { SupabaseClient } from "@supabase/supabase-js";
import type {
  JobFormat,
  JobPlatform,
  JobStatus,
} from "@/domain/entities/job";
import type { ReportArtist, ReportArtistLaunch } from "@/domain/entities/report-artist";
import type { ReportJob } from "@/domain/entities/report-job";
import type { ReportPlatformMetrics } from "@/domain/entities/report-metrics";

interface ReportJobRow {
  id: string;
  title: string;
  format: string;
  description: string;
  cover_url: string | null;
  platforms: string[];
  status: string;
  investment: number;
  starts_on: string;
  ends_on: string;
  client_name: string;
}

interface MetricsRow {
  platform: string;
  campaigns: number;
  active_campaigns: number;
  spend: number | string;
  impressions: number;
  clicks: number;
  reach: number;
  video_plays: number;
  engagement: number;
  comments: number;
  shares: number;
  reactions: number;
  synced_at: string | null;
}

interface LaunchRow {
  client_name: string;
  client_avatar_url: string | null;
  launch_id: string;
  title: string;
  format: string;
  status: string;
  cover_url: string | null;
  code: string | null;
  starts_on: string;
  investment: number;
  spend: number | string;
  video_plays: number;
  reach: number;
  campaigns: number;
  active_campaigns: number;
}

interface ArtistPlatformRow {
  platform: string;
  campaigns: number;
  active_campaigns: number;
  spend: number | string;
  video_plays: number;
  reach: number;
  impressions: number;
  engagement: number;
}

/**
 * Lee el trabajo de un enlace de reporte. Va contra la función acotada
 * `get_report_job`, que exige la versión vigente del token y no expone columnas
 * privadas; por eso funciona sin sesión sin necesitar la clave de servicio.
 */
export async function findReportJob(
  supabase: SupabaseClient,
  jobId: string,
  tokenVersion: number,
): Promise<ReportJob | null> {
  const { data, error } = await supabase
    .rpc("get_report_job", { job_id: jobId, token_version: tokenVersion })
    .maybeSingle<ReportJobRow>();

  if (error || !data) return null;

  return {
    id: data.id,
    title: data.title,
    format: data.format as JobFormat,
    description: data.description,
    coverUrl: data.cover_url,
    platforms: data.platforms as JobPlatform[],
    status: data.status as JobStatus,
    investment: data.investment,
    startsOn: data.starts_on,
    endsOn: data.ends_on,
    clientName: data.client_name,
  };
}

/**
 * Totales por plataforma del trabajo. Devuelve una lista vacía tanto si el
 * trabajo no tiene campañas vinculadas como si el token quedó revocado.
 */
export async function findReportMetrics(
  supabase: SupabaseClient,
  jobId: string,
  tokenVersion: number,
): Promise<ReportPlatformMetrics[]> {
  const { data, error } = await supabase.rpc("get_report_metrics", {
    job_id: jobId,
    token_version: tokenVersion,
  });

  if (error || !Array.isArray(data)) return [];

  return (data as MetricsRow[]).map(toPlatformMetrics);
}

/**
 * Reporte consolidado del artista: sus lanzamientos y sus totales por
 * plataforma. Ambas consultas parten del mismo trabajo, así que comparten la
 * comprobación de versión del token.
 */
export async function findReportArtist(
  supabase: SupabaseClient,
  jobId: string,
  tokenVersion: number,
): Promise<ReportArtist | null> {
  const params = { job_id: jobId, token_version: tokenVersion };

  const [launches, platforms] = await Promise.all([
    supabase.rpc("get_report_artist_launches", params),
    supabase.rpc("get_report_artist_platforms", params),
  ]);

  if (launches.error || !Array.isArray(launches.data)) return null;

  const rows = launches.data as LaunchRow[];
  if (rows.length === 0) return null;

  const platformRows = Array.isArray(platforms.data)
    ? (platforms.data as ArtistPlatformRow[])
    : [];

  return {
    name: rows[0].client_name,
    avatarUrl: rows[0].client_avatar_url,
    launches: rows.map(toLaunch),
    platforms: platformRows.map(toArtistPlatformMetrics),
  };
}

function toPlatformMetrics(row: MetricsRow): ReportPlatformMetrics {
  return {
    platform: row.platform as JobPlatform,
    campaigns: Number(row.campaigns),
    activeCampaigns: Number(row.active_campaigns),
    // `numeric` llega como cadena para no perder precisión.
    spend: Number(row.spend),
    impressions: Number(row.impressions),
    clicks: Number(row.clicks),
    reach: Number(row.reach),
    videoPlays: Number(row.video_plays),
    engagement: Number(row.engagement),
    comments: Number(row.comments),
    shares: Number(row.shares),
    reactions: Number(row.reactions),
    syncedAt: row.synced_at,
  };
}

/**
 * El consolidado del artista solo agrega las métricas que sus tarjetas usan;
 * el resto se deja en cero en lugar de sumarlas sin necesidad.
 */
function toArtistPlatformMetrics(row: ArtistPlatformRow): ReportPlatformMetrics {
  return {
    platform: row.platform as JobPlatform,
    campaigns: Number(row.campaigns),
    activeCampaigns: Number(row.active_campaigns),
    spend: Number(row.spend),
    impressions: Number(row.impressions),
    clicks: 0,
    reach: Number(row.reach),
    videoPlays: Number(row.video_plays),
    engagement: Number(row.engagement),
    comments: 0,
    shares: 0,
    reactions: 0,
    syncedAt: null,
  };
}

function toLaunch(row: LaunchRow): ReportArtistLaunch {
  return {
    id: row.launch_id,
    title: row.title,
    format: row.format as JobFormat,
    status: row.status as JobStatus,
    coverUrl: row.cover_url,
    code: row.code,
    startsOn: row.starts_on,
    investment: Number(row.investment),
    spend: Number(row.spend),
    videoPlays: Number(row.video_plays),
    reach: Number(row.reach),
    campaigns: Number(row.campaigns),
    activeCampaigns: Number(row.active_campaigns),
  };
}

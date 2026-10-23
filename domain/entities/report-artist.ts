import type { JobFormat, JobStatus } from "@/domain/entities/job";
import type { ReportPlatformMetrics } from "@/domain/entities/report-metrics";
import type { ReportSpend } from "@/domain/entities/report-spend";

/** Un lanzamiento del artista en el reporte consolidado. */
export interface ReportArtistLaunch {
  id: string;
  title: string;
  format: JobFormat;
  status: JobStatus;
  coverUrl: string | null;
  /** Código del enlace público de ese lanzamiento; `null` si no se ha emitido. */
  code: string | null;
  startsOn: string;
  investment: number;
  /** Gasto del lanzamiento, convertido con la TRM de ese trabajo si la tiene. */
  spend: ReportSpend;
  videoPlays: number;
  reach: number;
  campaigns: number;
  activeCampaigns: number;
}

/**
 * Reporte consolidado del artista dueño del enlace. Se deriva siempre del
 * trabajo del token, así que nunca mezcla datos de otro cliente.
 */
export interface ReportArtist {
  name: string;
  avatarUrl: string | null;
  launches: ReportArtistLaunch[];
  platforms: ReportPlatformMetrics[];
}

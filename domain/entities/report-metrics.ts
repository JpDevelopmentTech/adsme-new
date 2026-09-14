import type { CampaignDailyMetrics } from "@/domain/entities/campaign-daily";
import type { JobPlatform } from "@/domain/entities/job";

/**
 * Un día del reporte, ya sumadas todas las campañas que esa plataforma tiene
 * vinculadas al trabajo. Es lo que dibuja la curva de evolución.
 */
export interface ReportDailyPoint extends CampaignDailyMetrics {
  platform: JobPlatform;
  /** Fecha del dato en `YYYY-MM-DD`. */
  date: string;
}

/**
 * Totales de una plataforma dentro de un reporte: la suma de las campañas
 * vinculadas a lo largo de toda su vida. La evolución en el tiempo va aparte,
 * en `ReportDailyPoint`.
 */
export interface ReportPlatformMetrics {
  platform: JobPlatform;
  campaigns: number;
  activeCampaigns: number;
  spend: number;
  impressions: number;
  clicks: number;
  reach: number;
  videoPlays: number;
  engagement: number;
  comments: number;
  shares: number;
  reactions: number;
  /** Última importación de la plataforma; `null` si aún no se sincronizó. */
  syncedAt: string | null;
}

/** Suma de todas las plataformas del reporte, para los KPI transversales. */
export interface ReportTotals {
  campaigns: number;
  activeCampaigns: number;
  spend: number;
  impressions: number;
  clicks: number;
  reach: number;
  videoPlays: number;
  engagement: number;
  comments: number;
  shares: number;
  reactions: number;
  syncedAt: string | null;
}

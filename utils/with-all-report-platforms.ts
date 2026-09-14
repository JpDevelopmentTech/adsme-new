import { PLATFORM_ORDER } from "@/constants/platform-labels.constants";
import { SHOW_ALL_REPORT_PLATFORMS } from "@/constants/report.constants";
import type { JobPlatform } from "@/domain/entities/job";
import type { ReportPlatformMetrics } from "@/domain/entities/report-metrics";

/** Plataforma sin campañas vinculadas: se muestra, pero todo en cero. */
function emptyMetrics(platform: JobPlatform): ReportPlatformMetrics {
  return {
    platform,
    campaigns: 0,
    activeCampaigns: 0,
    spend: 0,
    impressions: 0,
    clicks: 0,
    reach: 0,
    videoPlays: 0,
    engagement: 0,
    comments: 0,
    shares: 0,
    reactions: 0,
    syncedAt: null,
  };
}

/**
 * Completa el reporte con las plataformas que no tienen datos, para que el
 * cliente vea las tres secciones tal como quedarán.
 *
 * Es un comportamiento provisional de presentación: no inventa cifras —lo que
 * no existe va a cero— y se apaga desde `SHOW_ALL_REPORT_PLATFORMS` cuando el
 * reporte deba mostrar solo las plataformas realmente contratadas.
 */
export function withAllReportPlatforms(
  metrics: ReportPlatformMetrics[],
): ReportPlatformMetrics[] {
  if (!SHOW_ALL_REPORT_PLATFORMS) return metrics;

  const byPlatform = new Map(metrics.map((item) => [item.platform, item]));

  return PLATFORM_ORDER.map(
    (platform) => byPlatform.get(platform) ?? emptyMetrics(platform),
  );
}

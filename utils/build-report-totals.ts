import type {
  ReportPlatformMetrics,
  ReportTotals,
} from "@/domain/entities/report-metrics";

/** Suma las plataformas del reporte en un único bloque de totales. */
export function buildReportTotals(
  platforms: ReportPlatformMetrics[],
): ReportTotals {
  const sum = (pick: (metrics: ReportPlatformMetrics) => number) =>
    platforms.reduce((total, metrics) => total + pick(metrics), 0);

  // La sincronización más reciente manda: es la que fecha el reporte entero.
  const syncedAt = platforms
    .map((metrics) => metrics.syncedAt)
    .filter((value): value is string => value !== null)
    .sort()
    .at(-1);

  return {
    campaigns: sum((metrics) => metrics.campaigns),
    activeCampaigns: sum((metrics) => metrics.activeCampaigns),
    spend: sum((metrics) => metrics.spend),
    impressions: sum((metrics) => metrics.impressions),
    clicks: sum((metrics) => metrics.clicks),
    reach: sum((metrics) => metrics.reach),
    videoPlays: sum((metrics) => metrics.videoPlays),
    engagement: sum((metrics) => metrics.engagement),
    comments: sum((metrics) => metrics.comments),
    shares: sum((metrics) => metrics.shares),
    reactions: sum((metrics) => metrics.reactions),
    syncedAt: syncedAt ?? null,
  };
}

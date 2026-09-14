import { PLATFORM_ORDER } from "@/constants/platform-labels.constants";
import type { ReportDailyPoint } from "@/domain/entities/report-metrics";
import type { ReportJob } from "@/domain/entities/report-job";
import type { ReportTrends } from "@/types/report.types";
import { buildReportTrend } from "@/utils/build-report-trend";

/**
 * Curva de cada plataforma del lanzamiento. El rango se corta en hoy: dibujar
 * hasta el final del período dejaría una recta plana en el tramo que todavía no
 * ha ocurrido, como si la pauta se hubiera parado.
 */
export function buildReportTrends(
  points: ReportDailyPoint[],
  job: ReportJob,
  today: string,
): ReportTrends {
  const range = { from: job.startsOn, to: today < job.endsOn ? today : job.endsOn };
  if (range.to < range.from) return {};

  const trends: ReportTrends = {};

  for (const platform of PLATFORM_ORDER) {
    const series = buildReportTrend(points, platform, range);
    if (series) trends[platform] = series;
  }

  return trends;
}

import { REPORT_COPY } from "@/constants/report.constants";
import type { DailyRange } from "@/domain/entities/campaign-daily";
import type { JobPlatform } from "@/domain/entities/job";
import type { ReportDailyPoint } from "@/domain/entities/report-metrics";
import type { ReportSeries } from "@/types/report.types";
import { buildTrendTicks } from "@/utils/build-trend-ticks";
import { isoDateRange } from "@/utils/iso-date-range";

/**
 * Métrica que dibuja la curva. Las reproducciones son lo que el artista busca,
 * pero una campaña sin vídeo no tiene ninguna: ahí manda el volumen entregado.
 */
function pickMetric(days: ReportDailyPoint[]) {
  const plays = days.reduce((total, day) => total + day.videoPlays, 0);

  return plays > 0
    ? { label: REPORT_COPY.trendPlays, of: (day: ReportDailyPoint) => day.videoPlays }
    : { label: REPORT_COPY.trendImpressions, of: (day: ReportDailyPoint) => day.impressions };
}

/**
 * Curva de evolución de una plataforma dentro del período del lanzamiento.
 *
 * Va acumulada y no día a día: al artista le habla del recorrido del
 * lanzamiento, y el detalle diario de una pauta pequeña es puro ruido. Los días
 * sin entrega aportan cero y dejan la curva plana, que es justo lo que pasó.
 *
 * Devuelve `null` cuando no hay nada que dibujar, para que el reporte muestre
 * su estado vacío en vez de una línea a cero.
 */
export function buildReportTrend(
  points: ReportDailyPoint[],
  platform: JobPlatform,
  range: DailyRange,
): ReportSeries | null {
  const days = points.filter((point) => point.platform === platform);
  if (days.length === 0) return null;

  const dates = isoDateRange(range.from, range.to);
  if (dates.length < 2) return null;

  const metric = pickMetric(days);
  const byDate = new Map(days.map((day) => [day.date, metric.of(day)]));

  let accumulated = 0;
  const series = dates.map((date) => {
    accumulated += byDate.get(date) ?? 0;

    return accumulated;
  });

  if (accumulated === 0) return null;

  return { label: metric.label, points: series, ticks: buildTrendTicks(dates) };
}

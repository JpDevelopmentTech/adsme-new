import { PLATFORM_ORDER } from "@/constants/platform-labels.constants";
import type { JobPlatform } from "@/domain/entities/job";
import type { ReportDailyPoint } from "@/domain/entities/report-metrics";
import type { JobPeriod } from "@/types/job-detail.types";
import type { ReportGrowth, ReportGrowthDay } from "@/types/report.types";
import { daysBetween } from "@/utils/month-range";
import { shiftIsoDate } from "@/utils/shift-iso-date";

/** Días máximos que se dibujan; más allá las barras dejan de distinguirse. */
const MAX_DAYS = 120;

function emptyDay(): Record<JobPlatform, number> {
  return { youtube: 0, meta: 0, tiktok: 0 };
}

/**
 * Reproducciones día a día del lanzamiento, desglosadas por plataforma. Cubre
 * el período entero y no solo hasta hoy: los días que aún no han llegado se
 * marcan como pendientes y quedan fuera del trazado, que es lo que dice cuánta
 * pauta queda. Sin ningún día con entrega no hay serie que dibujar.
 *
 * El período es el de la pauta en el reporte y la ventana reciente en el
 * detalle del trabajo; a la serie solo le importan sus dos extremos.
 */
export function buildReportGrowth(
  points: ReportDailyPoint[],
  job: JobPeriod,
  today: string,
): ReportGrowth | null {
  const byDate = new Map<string, Record<JobPlatform, number>>();

  for (const point of points) {
    const row = byDate.get(point.date) ?? emptyDay();
    row[point.platform] += point.videoPlays;
    byDate.set(point.date, row);
  }

  const total = Math.min(daysBetween(job.startsOn, job.endsOn), MAX_DAYS);
  const days: ReportGrowthDay[] = [];
  const totals = emptyDay();
  let platformPeak = 0;

  for (let index = 0; index < total; index += 1) {
    const date = shiftIsoDate(job.startsOn, index);
    const byPlatform = byDate.get(date) ?? emptyDay();
    let sum = 0;

    for (const platform of PLATFORM_ORDER) {
      sum += byPlatform[platform];
      totals[platform] += byPlatform[platform];
      // La escala la fija la curva más alta de una plataforma: las áreas se
      // superponen, así que la suma del día dejaría el dibujo aplastado.
      platformPeak = Math.max(platformPeak, byPlatform[platform]);
    }

    days.push({ date, byPlatform, total: sum, isPending: date > today });
  }

  if (platformPeak === 0) return null;

  const elapsed = days.filter((day) => !day.isPending).length;

  return {
    days,
    platformPeak,
    totals,
    todayPercent: (elapsed / days.length) * 100,
  };
}

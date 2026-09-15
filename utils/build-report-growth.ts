import { PLATFORM_ORDER } from "@/constants/platform-labels.constants";
import type { JobPlatform } from "@/domain/entities/job";
import type { ReportJob } from "@/domain/entities/report-job";
import type { ReportDailyPoint } from "@/domain/entities/report-metrics";
import type { ReportGrowth, ReportGrowthDay } from "@/types/report.types";
import { daysBetween } from "@/utils/month-range";
import { shiftIsoDate } from "@/utils/shift-iso-date";

/** Días máximos que se dibujan; más allá las barras dejan de distinguirse. */
const MAX_DAYS = 120;

function emptyDay(): Record<JobPlatform, number> {
  return { youtube: 0, meta: 0, tiktok: 0 };
}

/**
 * Reproducciones día a día del lanzamiento, apiladas por plataforma. Cubre el
 * período entero y no solo hasta hoy: los días que aún no han llegado se marcan
 * como pendientes y se pintan vacíos, que es lo que dice cuánta pauta queda.
 * Sin ningún día con entrega no hay serie que dibujar.
 */
export function buildReportGrowth(
  points: ReportDailyPoint[],
  job: ReportJob,
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
  let peak = 0;

  for (let index = 0; index < total; index += 1) {
    const date = shiftIsoDate(job.startsOn, index);
    const byPlatform = byDate.get(date) ?? emptyDay();
    const sum = PLATFORM_ORDER.reduce(
      (accumulated, platform) => accumulated + byPlatform[platform],
      0,
    );

    peak = Math.max(peak, sum);
    days.push({ date, byPlatform, total: sum, isPending: date > today });
  }

  if (peak === 0) return null;

  const elapsed = days.filter((day) => !day.isPending).length;

  return { days, peak, todayPercent: (elapsed / days.length) * 100 };
}

import type { ReportJob } from "@/domain/entities/report-job";
import type {
  ReportDailyPoint,
  ReportPlatformMetrics,
} from "@/domain/entities/report-metrics";
import type { ReportCpvComparison, ReportCpvDay } from "@/types/report.types";
import { daysBetween } from "@/utils/month-range";
import { shiftIsoDate } from "@/utils/shift-iso-date";

/**
 * Compara las vistas que el presupuesto de YouTube compromete al CPV cobrado
 * con las que YouTube ha generado de verdad, día a día y en acumulado.
 *
 * La inversión se reparte a partes iguales entre las plataformas con campañas,
 * como en el resto de la app. Devuelve `null` si el trabajo no tiene la
 * optimización activa, no pauta en YouTube o aún no hay vistas importadas:
 * sin datos, la gráfica diría «−100 %» cuando solo falta sincronizar.
 */
export function buildCpvComparison(
  job: ReportJob,
  metrics: ReportPlatformMetrics[],
  daily: ReportDailyPoint[],
  today: string,
): ReportCpvComparison | null {
  const { chargedCpv } = job;
  if (!job.cpvOptimization || chargedCpv === null || chargedCpv <= 0) return null;

  const linked = metrics.filter((item) => item.campaigns > 0);
  if (!linked.some((item) => item.platform === "youtube")) return null;

  const viewsByDate = new Map<string, number>();
  for (const point of daily) {
    if (point.platform !== "youtube") continue;
    viewsByDate.set(point.date, (viewsByDate.get(point.date) ?? 0) + point.videoPlays);
  }

  const budget = job.investment / linked.length;
  const plannedViews = budget / chargedCpv;
  const total = daysBetween(job.startsOn, job.endsOn);
  const days: ReportCpvDay[] = [];
  let cumulative = 0;
  let elapsed = 0;

  for (let index = 0; index < total; index += 1) {
    const date = shiftIsoDate(job.startsOn, index);
    const isPending = date > today;

    if (!isPending) {
      cumulative += viewsByDate.get(date) ?? 0;
      elapsed += 1;
    }

    days.push({
      date,
      planned: (plannedViews * (index + 1)) / total,
      actual: isPending ? null : cumulative,
    });
  }

  if (cumulative === 0) return null;

  const plannedToDate = (plannedViews * elapsed) / total;

  return {
    days,
    budget,
    chargedCpv,
    plannedViews,
    plannedToDate,
    actualToDate: cumulative,
    effectiveCpv: ((budget * elapsed) / total) / cumulative,
    deltaPercent:
      plannedToDate > 0 ? ((cumulative - plannedToDate) / plannedToDate) * 100 : null,
    isFinished: elapsed === total,
  };
}

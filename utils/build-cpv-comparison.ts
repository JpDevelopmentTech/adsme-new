import type { ReportJob } from "@/domain/entities/report-job";
import type {
  ReportDailyPoint,
  ReportPlatformMetrics,
} from "@/domain/entities/report-metrics";
import type { JobPeriod } from "@/types/job-detail.types";
import type { ReportCpvComparison, ReportCpvDay } from "@/types/report.types";
import { daysBetween } from "@/utils/month-range";
import { shiftIsoDate } from "@/utils/shift-iso-date";

/** Vistas de YouTube por fecha, sumando sus campañas. */
function youtubeViewsByDate(daily: ReportDailyPoint[]): Map<string, number> {
  const views = new Map<string, number>();

  for (const point of daily) {
    if (point.platform !== "youtube") continue;
    views.set(point.date, (views.get(point.date) ?? 0) + point.videoPlays);
  }

  return views;
}

/**
 * Compara las vistas que el presupuesto de YouTube compromete al CPV cobrado
 * con las que YouTube ha generado de verdad, día a día y en acumulado, dentro
 * de `window`: el lanzamiento entero o el tramo que eligió el cliente. El
 * presupuesto y las vistas previstas se prorratean a los días de la ventana.
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
  window: JobPeriod,
): ReportCpvComparison | null {
  const { chargedCpv } = job;
  if (!job.cpvOptimization || chargedCpv === null || chargedCpv <= 0) return null;

  const linked = metrics.filter((item) => item.campaigns > 0);
  if (!linked.some((item) => item.platform === "youtube")) return null;

  const viewsByDate = youtubeViewsByDate(daily);
  const jobDays = daysBetween(job.startsOn, job.endsOn);
  const budgetPerDay = job.investment / linked.length / jobDays;
  const viewsPerDay = budgetPerDay / chargedCpv;
  const total = daysBetween(window.startsOn, window.endsOn);
  const days: ReportCpvDay[] = [];
  let cumulative = 0;
  let elapsed = 0;

  for (let index = 0; index < total; index += 1) {
    const date = shiftIsoDate(window.startsOn, index);
    const isPending = date > today;

    if (!isPending) {
      cumulative += viewsByDate.get(date) ?? 0;
      elapsed += 1;
    }

    days.push({
      date,
      planned: viewsPerDay * (index + 1),
      actual: isPending ? null : cumulative,
    });
  }

  if (cumulative === 0) return null;

  const plannedToDate = viewsPerDay * elapsed;

  return {
    days,
    budget: budgetPerDay * total,
    chargedCpv,
    plannedViews: viewsPerDay * total,
    plannedToDate,
    actualToDate: cumulative,
    effectiveCpv: (budgetPerDay * elapsed) / cumulative,
    deltaPercent:
      plannedToDate > 0 ? ((cumulative - plannedToDate) / plannedToDate) * 100 : null,
    isFinished: elapsed === total,
  };
}

import type { ReportJob } from "@/domain/entities/report-job";
import type { ReportHeadline } from "@/types/report.types";
import { formatCompactNumber } from "@/utils/format-compact-number";
import { daysBetween } from "@/utils/month-range";

/**
 * Titular del reporte. La cifra que le importa a quien lo abre no es una
 * métrica de compra de medios sino cuánta gente llegó a ver su lanzamiento, así
 * que ocupa la portada en vez de perderse en una rejilla de tarjetas iguales.
 * Sin alcance medido no hay titular: es preferible callar a inventarlo.
 */
export function buildLaunchHeadline(
  reach: number,
  job: ReportJob,
  today: string,
): ReportHeadline | null {
  if (reach <= 0) return null;

  const until = today < job.endsOn ? today : job.endsOn;
  const days = daysBetween(job.startsOn, until);

  return {
    value: `${formatCompactNumber(reach)} de personas`,
    caption: `han visto tu lanzamiento en ${days} ${days === 1 ? "día" : "días"}`,
  };
}

/** Titular del reporte consolidado: todo lo que el artista ha publicado. */
export function buildArtistHeadline(reach: number): ReportHeadline | null {
  if (reach <= 0) return null;

  return {
    value: `${formatCompactNumber(reach)} de personas`,
    caption: "han conocido tu música con las campañas de adsme",
  };
}

import type { ReportJob } from "@/domain/entities/report-job";
import type { ReportHeadline } from "@/types/report.types";
import { formatExactNumber } from "@/utils/format-exact-number";
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
    value: formatExactNumber(reach),
    caption: `personas han visto ${job.title} en ${days} ${days === 1 ? "día" : "días"}`,
  };
}

/** Titular del reporte consolidado: todo lo que el artista ha publicado. */
export function buildArtistHeadline(reach: number): ReportHeadline | null {
  if (reach <= 0) return null;

  return {
    value: formatExactNumber(reach),
    caption: "personas han conocido tu música con las campañas de adsme",
  };
}

/**
 * Titular de un tramo elegido por el cliente. El alcance no se puede acotar a
 * unos días —son personas únicas de cada día, que no se suman—, así que el
 * titular pasa a las reproducciones de ese tramo, que sí son del período.
 */
export function buildPeriodHeadline(
  plays: number,
  job: ReportJob,
  periodLabel: string,
): ReportHeadline | null {
  if (plays <= 0) return null;

  return {
    value: formatExactNumber(plays),
    caption: `reproducciones de ${job.title} · ${periodLabel}`,
  };
}

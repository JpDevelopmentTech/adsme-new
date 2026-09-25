import { PLATFORM_ORDER } from "@/constants/platform-labels.constants";
import { PLATFORM_META } from "@/constants/platforms.constants";
import type { ReportGrowth, ReportGrowthSeries } from "@/types/report.types";

/**
 * Convierte la serie diaria en una serie por plataforma. Las tres áreas se
 * superponen sobre el mismo eje en vez de apilarse: apiladas dicen cuánto sumó
 * el día, superpuestas dicen qué plataforma tiró del lanzamiento y cuándo, que
 * es lo que pregunta quien lee el reporte.
 */
export function buildGrowthSeries(growth: ReportGrowth): ReportGrowthSeries[] {
  if (growth.days.every((day) => day.isPending)) return [];

  return PLATFORM_ORDER.filter((platform) => growth.totals[platform] > 0).map(
    (platform) => ({
      platform,
      name: PLATFORM_META[platform].label,
      color: PLATFORM_META[platform].chartColor,
      // El eje cubre el período entero, pero los días que aún no han llegado
      // van como hueco y no como cero: la curva termina donde termina la
      // entrega, y el espacio a la derecha dice cuánta pauta queda.
      data: growth.days.map((day) => ({
        x: day.date,
        y: day.isPending ? null : day.byPlatform[platform],
      })),
    }),
  );
}

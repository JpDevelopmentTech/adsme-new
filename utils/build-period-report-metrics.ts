import type {
  ReportDailyPoint,
  ReportPlatformMetrics,
} from "@/domain/entities/report-metrics";
import { mergeReportSpend } from "@/utils/merge-report-spend";

type AdditiveKey =
  | "impressions"
  | "clicks"
  | "videoPlays"
  | "engagement"
  | "comments"
  | "shares"
  | "reactions";

const ADDITIVE_KEYS: AdditiveKey[] = [
  "impressions",
  "clicks",
  "videoPlays",
  "engagement",
  "comments",
  "shares",
  "reactions",
];

/**
 * Totales de cada plataforma recortados a un período: las métricas que se
 * pueden sumar salen de la serie diaria de esos días. Lo que no es del período
 * —cuántas campañas tiene y cuándo se sincronizó— se conserva del acumulado.
 * El gasto va aparte porque se une por moneda, no se suma como un número.
 *
 * El alcance se queda a cero a propósito: son personas únicas de cada día y su
 * suma contaría varias veces a la misma persona. Quien pinta el reporte lo
 * oculta cuando el período es a medida, en lugar de enseñar un cero.
 */
export function buildPeriodReportMetrics(
  lifetime: ReportPlatformMetrics[],
  daily: ReportDailyPoint[],
): ReportPlatformMetrics[] {
  return lifetime.map((metrics) => {
    const days = daily.filter((point) => point.platform === metrics.platform);
    const sums = Object.fromEntries(
      ADDITIVE_KEYS.map((key) => [key, days.reduce((total, day) => total + day[key], 0)]),
    ) as Record<AdditiveKey, number>;

    return {
      ...metrics,
      ...sums,
      spend: mergeReportSpend(days.map((day) => day.spend)),
      reach: 0,
    };
  });
}

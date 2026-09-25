import {
  PLATFORM_SPEND_LABEL,
  PLATFORM_STATS,
} from "@/constants/report.constants";
import type { ReportPlatformMetrics } from "@/domain/entities/report-metrics";
import type { ReportStat } from "@/types/report.types";
import { formatExactCurrency } from "@/utils/format-exact-currency";
import { formatExactNumber } from "@/utils/format-exact-number";

/**
 * Las métricas que esa plataforma sí reporta, en cifras completas.
 *
 * Las que valen cero se dejan fuera porque aquí un cero no significa «no pasó
 * nada», sino que la plataforma no entrega ese dato: Google Ads no informa
 * alcance por campaña, y ni él ni TikTok desglosan comentarios, compartidos y
 * reacciones. Enseñarlos en cero haría creer al artista que su pauta no logró
 * ninguna, que es justo lo contrario de lo que dice el dato que falta.
 */
export function buildPlatformStats(
  metrics: ReportPlatformMetrics,
): ReportStat[] {
  const stats = PLATFORM_STATS.flatMap((stat) => {
    const value = metrics[stat.key];

    if (value <= 0) return [];

    return [{ label: stat.label, value: formatExactNumber(value) }];
  });

  if (metrics.spend <= 0) return stats;

  return [
    ...stats,
    { label: PLATFORM_SPEND_LABEL, value: formatExactCurrency(metrics.spend) },
  ];
}

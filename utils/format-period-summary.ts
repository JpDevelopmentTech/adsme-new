import { formatDuration } from "@/utils/format-duration";
import { formatJobPeriod } from "@/utils/format-job-period";

/**
 * Período del trabajo con su duración («01–30 Sep · 30 días»). La duración es
 * lo que convierte dos fechas en una decisión: dice si la pauta da tiempo.
 */
export function formatPeriodSummary(
  startsOn: string,
  endsOn: string,
): string | null {
  const duration = formatDuration(startsOn, endsOn);

  if (!duration) return null;

  return `${formatJobPeriod(startsOn, endsOn)} · ${duration}`;
}

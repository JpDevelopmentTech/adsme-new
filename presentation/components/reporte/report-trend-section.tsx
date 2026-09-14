import { PLATFORM_META } from "@/constants/platforms.constants";
import {
  REPORT_COPY,
  REPORT_PLATFORM_SECTION,
  SHOW_SAMPLE_REPORT_SECTIONS,
} from "@/constants/report.constants";
import { SAMPLE_TREND_BY_PLATFORM } from "@/constants/report-sample.constants";
import { ReportTrendCard } from "@/presentation/components/reporte/report-trend-card";
import { ReportTrendChart } from "@/presentation/components/reporte/report-trend-chart";
import type { ReportTrendSectionProps } from "@/types/report.types";

/**
 * Evolución de una plataforma. Manda la serie importada; sin ella se cae a la
 * curva de muestra —marcada como tal— y, si tampoco procede, al estado vacío.
 */
export function ReportTrendSection({
  platform,
  series,
  period,
}: ReportTrendSectionProps) {
  const title = REPORT_PLATFORM_SECTION[platform].title;
  const color = PLATFORM_META[platform].chartColor;

  if (series) {
    return (
      <ReportTrendChart
        series={series}
        subtitle={REPORT_COPY.trendPeriod(title, period)}
        color={color}
      />
    );
  }

  if (!SHOW_SAMPLE_REPORT_SECTIONS) return <ReportTrendCard />;

  return (
    <ReportTrendChart
      series={SAMPLE_TREND_BY_PLATFORM[platform]}
      subtitle={REPORT_COPY.trendSubtitle(title)}
      color={color}
      isSample
    />
  );
}

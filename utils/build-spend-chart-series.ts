import { DASHBOARD_COPY } from "@/constants/dashboard.constants";
import { PLATFORM_ORDER } from "@/constants/platform-labels.constants";
import { PLATFORM_META, UNASSIGNED_CHART_COLOR } from "@/constants/platforms.constants";
import type { PeriodSpend } from "@/domain/entities/dashboard";
import type { SpendChartSeries } from "@/types/dashboard-home.types";

/**
 * Series del área apilada, una por plataforma y en el orden de siempre (YouTube
 * en la base). La parte sin plataforma solo entra si existe, arriba del todo.
 */
export function buildSpendChartSeries(spend: PeriodSpend): SpendChartSeries[] {
  const platforms = PLATFORM_ORDER.map((platform) => ({
    name: PLATFORM_META[platform].label,
    color: PLATFORM_META[platform].chartColor,
    data: spend.days.map((day) => day.byPlatform[platform]),
  }));

  if (!spend.hasUnassigned) return platforms;

  return [
    ...platforms,
    {
      name: DASHBOARD_COPY.unassigned,
      color: UNASSIGNED_CHART_COLOR,
      data: spend.days.map((day) => day.unassigned),
    },
  ];
}

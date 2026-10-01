"use client";

import dynamic from "next/dynamic";
import { SPEND_CHART_HEIGHT } from "@/constants/spend-chart.constants";
import type { SpendAreaChartProps } from "@/types/dashboard-home.types";
import { buildSpendChartOptions } from "@/utils/build-spend-chart-options";
import { buildSpendChartSeries } from "@/utils/build-spend-chart-series";

/**
 * ApexCharts toca `window` al montarse, así que no puede renderizarse en el
 * servidor. El hueco reservado evita que el panel salte cuando aparece.
 */
const ApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
  loading: () => <div style={{ height: SPEND_CHART_HEIGHT }} />,
});

/** Inversión de cada día del mes, apilada por plataforma, con lo previsto en discontinuo. */
export function SpendAreaChart({ spend, label }: SpendAreaChartProps) {
  const series = buildSpendChartSeries(spend);

  return (
    <div role="img" aria-label={label} className="-mx-2">
      <ApexChart
        type="area"
        height={SPEND_CHART_HEIGHT}
        options={buildSpendChartOptions(spend, series)}
        series={series.map((item) => ({ name: item.name, data: item.data }))}
      />
    </div>
  );
}

"use client";

import dynamic from "next/dynamic";
import { GROWTH_CHART_HEIGHT } from "@/constants/growth-chart.constants";
import type { ReportGrowthChartProps } from "@/types/report.types";
import { buildGrowthChartOptions } from "@/utils/build-growth-chart-options";
import { buildGrowthSeries } from "@/utils/build-growth-series";

/**
 * ApexCharts toca `window` al montarse, así que no puede renderizarse en el
 * servidor. El hueco reservado evita que el resto del reporte salte cuando la
 * gráfica aparece.
 */
const ApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
  loading: () => <div style={{ height: GROWTH_CHART_HEIGHT }} />,
});

/**
 * Las plataformas en un mismo par de ejes, cada una con su color de siempre:
 * YouTube rojo, Meta azul, TikTok teal. Superpuestas y no apiladas, para que se
 * vea cuál tiró del lanzamiento y en qué días.
 */
export function ReportGrowthChart({ growth, label }: ReportGrowthChartProps) {
  const series = buildGrowthSeries(growth);

  if (series.length === 0) return null;

  return (
    <div role="img" aria-label={label} className="-mx-2">
      <ApexChart
        type="area"
        height={GROWTH_CHART_HEIGHT}
        options={buildGrowthChartOptions(series)}
        series={series.map((item) => ({ name: item.name, data: item.data }))}
      />
    </div>
  );
}

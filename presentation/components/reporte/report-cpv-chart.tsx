"use client";

import dynamic from "next/dynamic";
import {
  CPV_CHART_HEIGHT,
  CPV_COMPARISON_COPY,
} from "@/constants/cpv-comparison.constants";
import type { ReportCpvChartProps } from "@/types/report.types";
import { buildCpvChartOptions } from "@/utils/build-cpv-chart-options";

/** ApexCharts toca `window` al montarse; el hueco reservado evita el salto. */
const ApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
  loading: () => <div style={{ height: CPV_CHART_HEIGHT }} />,
});

/**
 * Vistas acumuladas de YouTube: la meta presupuestada a trazos y lo generado
 * como área. Lo generado se corta en hoy; la meta sigue hasta el fin del
 * período, que es lo que dice cuánto falta por cumplir.
 */
export function ReportCpvChart({ days, label }: ReportCpvChartProps) {
  return (
    <div role="img" aria-label={label} className="-mx-2">
      <ApexChart
        type="line"
        height={CPV_CHART_HEIGHT}
        options={buildCpvChartOptions(days)}
        series={[
          {
            name: CPV_COMPARISON_COPY.plannedSeries,
            type: "line",
            data: days.map((day) => ({ x: day.date, y: Math.round(day.planned) })),
          },
          {
            name: CPV_COMPARISON_COPY.actualSeries,
            type: "area",
            data: days.map((day) => ({ x: day.date, y: day.actual })),
          },
        ]}
      />
    </div>
  );
}

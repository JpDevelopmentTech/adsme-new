"use client";

import dynamic from "next/dynamic";
import type { ApexChartProps } from "@/types/nomina-chart.types";

/**
 * ApexCharts toca `window` al montarse, así que no se renderiza en el servidor.
 * El hueco reservado con el mismo alto evita que el panel salte al aparecer.
 */
const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
  loading: () => <div className="h-full w-full" />,
});

/** Gráfica de ApexCharts con nombre accesible y alto fijo. */
export function ApexChart({ type, height, options, series, label }: ApexChartProps) {
  return (
    <div role="img" aria-label={label} style={{ minHeight: height }} className="w-full">
      <Chart type={type} height={height} width="100%" options={options} series={series} />
    </div>
  );
}

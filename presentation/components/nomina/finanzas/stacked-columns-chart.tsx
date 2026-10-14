"use client";

import { ChartLegend } from "@/presentation/components/nomina/chart-legend";
import { ApexChart } from "@/presentation/components/ui/apex-chart";
import type { StackedColumnsChartProps } from "@/types/nomina-finanzas-props.types";
import { buildStackedChartOptions } from "@/utils/build-stacked-chart-options";

/** Columnas apiladas en pesos con su leyenda: una serie por bolsa o por artista. */
export function StackedColumnsChart({ categories, series, label }: StackedColumnsChartProps) {
  const options = buildStackedChartOptions(
    categories,
    series.map((entry) => entry.color),
    series.map((entry) => entry.data),
  );

  return (
    <div className="flex flex-col gap-4">
      <ChartLegend items={series.map((entry) => ({ label: entry.name, color: entry.color }))} />
      <ApexChart
        type="bar"
        height={260}
        label={label}
        options={options}
        series={series.map((entry) => ({ name: entry.name, data: entry.data }))}
      />
    </div>
  );
}

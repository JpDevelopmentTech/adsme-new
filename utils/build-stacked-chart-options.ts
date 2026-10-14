import type { ApexOptions } from "apexcharts";
import { buildStackedColumnsBase } from "@/utils/build-stacked-columns-base";
import { formatAxisAmount } from "@/utils/format-axis-amount";
import { niceAxisMax } from "@/utils/nice-axis-max";

const TICKS = 3;

/**
 * Columnas apiladas en pesos con el eje de 0 a un tope redondo: suma cada
 * columna para encontrar la más alta.
 */
export function buildStackedChartOptions(categories: string[], colors: string[], series: number[][]): ApexOptions {
  const base = buildStackedColumnsBase(categories, colors);
  const tallest = Math.max(0, ...categories.map((_, index) => series.reduce((sum, data) => sum + (data[index] ?? 0), 0)));

  return {
    ...base,
    yaxis: { min: 0, max: niceAxisMax(tallest, TICKS), tickAmount: TICKS, labels: { formatter: formatAxisAmount } },
  };
}

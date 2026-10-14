import type { ApexOptions } from "apexcharts";
import { buildNominaChartBase } from "@/utils/build-nomina-chart-base";

/**
 * Base de las columnas apiladas de Finanzas: barras de hasta ~52 px con la
 * esquina superior redondeada, sin bordes de eje y con las categorías dadas.
 */
export function buildStackedColumnsBase(categories: string[], colors: string[]): ApexOptions {
  const base = buildNominaChartBase();

  return {
    ...base,
    chart: { ...base.chart, stacked: true, stackOnlyBar: true },
    colors,
    plotOptions: { bar: { columnWidth: "34%", borderRadius: 4, borderRadiusApplication: "end" } },
    xaxis: { categories, axisBorder: { show: false }, axisTicks: { show: false }, labels: { rotate: 0, hideOverlappingLabels: false }, tooltip: { enabled: false } },
    tooltip: { ...base.tooltip, shared: true, intersect: false },
  };
}

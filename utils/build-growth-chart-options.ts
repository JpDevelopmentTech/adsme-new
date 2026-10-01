import type { ApexOptions } from "apexcharts";
import {
  GROWTH_CHART_COLORS,
  GROWTH_CURVE,
  GROWTH_FILL_OPACITY,
  GROWTH_LABEL_SIZE,
  GROWTH_STROKE_WIDTH,
  GROWTH_X_TICKS,
} from "@/constants/growth-chart.constants";
import type { ReportGrowthSeries } from "@/types/report.types";
import { formatCompactNumber } from "@/utils/format-compact-number";
import { findTodayCategory } from "@/utils/find-today-category";
import { formatShortDate } from "@/utils/format-job-period";

/**
 * Configuración del área del reporte. Va aparte del componente porque es una
 * sola expresión larga sin lógica de React, y así el componente se queda en lo
 * que hace: montar el lienzo en cliente.
 *
 * Se apaga todo el cromo que trae ApexCharts de fábrica —barra de
 * herramientas, zoom, leyenda, etiquetas sobre los puntos— porque el panel ya
 * pone su propia cabecera y su leyenda con los totales. Una línea lila marca
 * hoy cuando el período sigue abierto; las curvas terminan ahí.
 */
export function buildGrowthChartOptions(
  series: ReportGrowthSeries[],
): ApexOptions {
  const today = findTodayCategory(series[0]?.data ?? []);

  return {
    chart: {
      type: "area",
      fontFamily: "var(--font-body)",
      toolbar: { show: false },
      zoom: { enabled: false },
      animations: { enabled: false },
      parentHeightOffset: 0,
      background: "transparent",
    },
    colors: series.map((item) => item.color),
    dataLabels: { enabled: false },
    stroke: { curve: GROWTH_CURVE, width: GROWTH_STROKE_WIDTH, lineCap: "round" },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 0,
        opacityFrom: GROWTH_FILL_OPACITY.from,
        opacityTo: GROWTH_FILL_OPACITY.to,
        stops: [0, 100],
      },
    },
    grid: {
      borderColor: GROWTH_CHART_COLORS.grid,
      xaxis: { lines: { show: false } },
      padding: { left: 4, right: 4, top: 0, bottom: 0 },
    },
    annotations: {
      xaxis: today
        ? [{ x: today, borderColor: GROWTH_CHART_COLORS.today, strokeDashArray: 0, borderWidth: 1.5 }]
        : [],
    },
    legend: { show: false },
    markers: { size: 0, hover: { size: 4 } },
    xaxis: {
      type: "category",
      tickAmount: GROWTH_X_TICKS,
      axisBorder: { show: false },
      axisTicks: { show: false },
      tooltip: { enabled: false },
      labels: {
        rotate: 0,
        hideOverlappingLabels: true,
        style: { colors: GROWTH_CHART_COLORS.label, fontSize: GROWTH_LABEL_SIZE },
        formatter: (value: string) => shortDate(value),
      },
    },
    yaxis: {
      min: 0,
      tickAmount: 4,
      labels: {
        style: { colors: GROWTH_CHART_COLORS.label, fontSize: GROWTH_LABEL_SIZE },
        formatter: (value: number) => compact(value),
      },
    },
    tooltip: {
      theme: "dark",
      shared: true,
      intersect: false,
      x: { formatter: (_value, opts) => resolveDate(series, opts) },
      y: { formatter: (value: number) => compact(value) },
    },
  };
}

/** ApexCharts pasa el índice del punto, no su fecha, cuando el eje es categoría. */
function resolveDate(
  series: ReportGrowthSeries[],
  opts?: { dataPointIndex?: number },
): string {
  const point = series[0]?.data[opts?.dataPointIndex ?? 0];

  return point ? shortDate(point.x) : "";
}

/**
 * Los formateadores tienen que aguantar lo que sea. ApexCharts los llama
 * también para ticks que no corresponden a ningún punto, y si uno lanza aborta
 * el render entero y el lienzo se queda en blanco sin decir por qué.
 */
function shortDate(value: unknown): string {
  return typeof value === "string" ? formatShortDate(value) : "";
}

function compact(value: unknown): string {
  return typeof value === "number" && Number.isFinite(value)
    ? formatCompactNumber(value)
    : "";
}

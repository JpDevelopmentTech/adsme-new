import type { ApexOptions } from "apexcharts";
import {
  CPV_CHART_COLORS,
  CPV_CHART_DASH,
  CPV_CHART_STROKE,
} from "@/constants/cpv-comparison.constants";
import {
  GROWTH_CHART_COLORS,
  GROWTH_FILL_OPACITY,
  GROWTH_LABEL_SIZE,
  GROWTH_X_TICKS,
} from "@/constants/growth-chart.constants";
import type { ReportCpvDay } from "@/types/report.types";
import { formatCompactNumber } from "@/utils/format-compact-number";
import { formatExactNumber } from "@/utils/format-exact-number";
import { formatShortDate } from "@/utils/format-job-period";

/**
 * Configuración de la comparación de vistas. Comparte ejes, rejilla y rótulos
 * con la gráfica de crecimiento para que el reporte se lea como una sola pieza;
 * cambia el trazado: la meta es una línea a trazos y lo generado un área, así
 * el hueco entre ambas es lo que se optimizó.
 */
export function buildCpvChartOptions(days: ReportCpvDay[]): ApexOptions {
  return {
    chart: {
      type: "line",
      fontFamily: "var(--font-body)",
      toolbar: { show: false },
      zoom: { enabled: false },
      animations: { enabled: false },
      parentHeightOffset: 0,
      background: "transparent",
    },
    colors: [CPV_CHART_COLORS.planned, CPV_CHART_COLORS.actual],
    dataLabels: { enabled: false },
    stroke: {
      curve: "straight",
      width: CPV_CHART_STROKE,
      dashArray: CPV_CHART_DASH,
      lineCap: "round",
    },
    fill: {
      type: ["solid", "gradient"],
      gradient: {
        shadeIntensity: 0,
        opacityFrom: GROWTH_FILL_OPACITY.from,
        opacityTo: GROWTH_FILL_OPACITY.to,
        stops: [0, 100],
      },
    },
    grid: {
      borderColor: GROWTH_CHART_COLORS.grid,
      strokeDashArray: 4,
      xaxis: { lines: { show: false } },
      padding: { left: 4, right: 4, top: 0, bottom: 0 },
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
      labels: {
        style: { colors: GROWTH_CHART_COLORS.label, fontSize: GROWTH_LABEL_SIZE },
        formatter: (value: number) => (isNumber(value) ? formatCompactNumber(value) : ""),
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
      x: { formatter: (_value, opts) => shortDate(days[opts?.dataPointIndex ?? 0]?.date) },
      y: { formatter: (value: number) => (isNumber(value) ? formatExactNumber(value) : "") },
    },
  };
}

/** ApexCharts llama a los formateadores con cualquier cosa; lanzar deja el lienzo en blanco. */
function shortDate(value: unknown): string {
  return typeof value === "string" ? formatShortDate(value) : "";
}

function isNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

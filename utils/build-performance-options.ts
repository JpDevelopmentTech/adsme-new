import type { ApexOptions } from "apexcharts";
import { BUCKET_META } from "@/constants/nomina-buckets.constants";
import { buildNominaChartBase } from "@/utils/build-nomina-chart-base";
import { formatAxisAmount } from "@/utils/format-axis-amount";
import { formatDayTick, formatLongDate } from "@/utils/format-nomina-dates";

/**
 * «Rendimiento en el tiempo»: Ingresos en área lila con degradado, Utilidad en
 * verde discontinuo y Servicio en gris punteado, con fechas diarias en el eje.
 */
export function buildPerformanceOptions(dates: string[]): ApexOptions {
  const base = buildNominaChartBase();

  return {
    ...base,
    chart: { ...base.chart, type: "area" },
    colors: [BUCKET_META.inversion.color, BUCKET_META.utilidad.color, BUCKET_META.servicio.color],
    stroke: { curve: "smooth", width: [2.5, 2, 2], dashArray: [0, 4, 2] },
    fill: { type: ["gradient", "solid", "solid"], opacity: [1, 0, 0], gradient: { opacityFrom: 0.35, opacityTo: 0, stops: [0, 100] } },
    xaxis: {
      categories: dates,
      tickAmount: 7,
      labels: { rotate: 0, formatter: (value: string) => (value ? formatDayTick(value) : "") },
      axisBorder: { show: false },
      axisTicks: { show: false },
      tooltip: { enabled: false },
    },
    yaxis: { labels: { formatter: (value: number) => formatAxisAmount(value) } },
    tooltip: { ...base.tooltip, shared: true, x: { formatter: (_value: number, options?: { dataPointIndex: number }) => formatLongDate(dates[options?.dataPointIndex ?? 0] ?? "") } },
  };
}

import type { ApexOptions } from "apexcharts";
import { BUCKET_META } from "@/constants/nomina-buckets.constants";
import { NOMINA_CHART_CHROME } from "@/constants/nomina.constants";
import type { NominaBudgetMonth } from "@/domain/entities/nomina-profile";
import { buildMonthsMapTooltip } from "@/utils/build-months-map-tooltip";
import { buildNominaChartBase } from "@/utils/build-nomina-chart-base";
import { formatAxisAmount } from "@/utils/format-axis-amount";
import { formatMonthTick } from "@/utils/format-nomina-dates";

/**
 * «Mapa de meses»: barras apiladas por mes con las cinco bolsas. El mes en
 * curso se distingue con su rótulo en blanco y una banda tenue detrás.
 */
export function buildMonthsMapOptions(months: NominaBudgetMonth[], currentMonth: string): ApexOptions {
  const base = buildNominaChartBase();
  const categories = months.map((month) => formatMonthTick(month.month));
  const currentLabel = formatMonthTick(currentMonth);

  return {
    ...base,
    chart: { ...base.chart, type: "bar", stacked: true },
    colors: [BUCKET_META.servicio.color, BUCKET_META.utilidadNeta.color, BUCKET_META.impuestos.color, BUCKET_META.inversion.color, BUCKET_META.inversionExpress.color],
    plotOptions: { bar: { columnWidth: "34%", borderRadius: 6, borderRadiusApplication: "end" } },
    grid: { ...base.grid, strokeDashArray: 3, xaxis: { lines: { show: false } } },
    xaxis: {
      categories,
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { style: { colors: categories.map((label) => (label === currentLabel ? NOMINA_CHART_CHROME.line : NOMINA_CHART_CHROME.label)) } },
    },
    yaxis: { labels: { formatter: (value: number) => formatAxisAmount(value) } },
    annotations: { xaxis: [{ x: currentLabel, borderColor: "transparent", fillColor: "#ffffff", opacity: 0.05 }] },
    tooltip: {
      ...base.tooltip,
      shared: true,
      intersect: false,
      custom: ({ dataPointIndex }: { dataPointIndex: number }) =>
        buildMonthsMapTooltip(months[dataPointIndex], months[dataPointIndex].month === currentMonth),
    },
  };
}

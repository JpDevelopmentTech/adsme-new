import type { ApexOptions } from "apexcharts";
import { BUCKET_META } from "@/constants/nomina-buckets.constants";
import { NOMINA_CHART_CHROME } from "@/constants/nomina.constants";
import { FINANCE_TAX_COPY } from "@/constants/nomina-finanzas-copy.constants";
import type { MonthlyTaxRow } from "@/types/nomina-finanzas.types";
import { buildStackedColumnsBase } from "@/utils/build-stacked-columns-base";
import { formatAxisAmount } from "@/utils/format-axis-amount";
import { formatMonthTick } from "@/utils/format-nomina-dates";
import { niceAxisMax } from "@/utils/nice-axis-max";

const TICKS = 2;

/** Barras rojas del impuesto de cada mes (eje izquierdo) y la línea del acumulado (eje derecho). */
export function buildTaxesChartOptions(rows: MonthlyTaxRow[]): ApexOptions {
  const base = buildStackedColumnsBase(rows.map((row) => formatMonthTick(row.month)), [BUCKET_META.impuestos.color, NOMINA_CHART_CHROME.line]);

  return {
    ...base,
    chart: { ...base.chart, stacked: false },
    plotOptions: { bar: { columnWidth: "30%", borderRadius: 4, borderRadiusApplication: "end" } },
    stroke: { width: [0, 2], curve: "straight" },
    markers: { size: [0, 4], colors: ["#140b28"], strokeColors: NOMINA_CHART_CHROME.line, strokeWidth: 2, hover: { size: 5 } },
    yaxis: [
      { seriesName: FINANCE_TAX_COPY.monthSeries, min: 0, max: niceAxisMax(Math.max(0, ...rows.map((row) => row.tax)), TICKS), tickAmount: TICKS, labels: { formatter: formatAxisAmount } },
      { seriesName: FINANCE_TAX_COPY.cumulativeSeries, opposite: true, min: 0, max: niceAxisMax(rows.at(-1)?.cumulative ?? 0, TICKS), tickAmount: TICKS, labels: { formatter: formatAxisAmount } },
    ],
  };
}

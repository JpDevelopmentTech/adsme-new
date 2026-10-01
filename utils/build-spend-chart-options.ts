import type { ApexOptions } from "apexcharts";
import {
  SPEND_AXIS_LABELS,
  SPEND_CHART_COLORS,
  SPEND_FILL_OPACITY,
  SPEND_FORECAST,
  SPEND_FORECAST_BAND_OPACITY,
} from "@/constants/spend-chart.constants";
import type { PeriodSpend } from "@/domain/entities/dashboard";
import type { SpendChartSeries } from "@/types/dashboard-home.types";
import { formatCompactCurrency } from "@/utils/format-compact-currency";
import { formatShortDate } from "@/utils/format-job-period";
import { formatTodayLabel } from "@/utils/format-today-label";

type XAxisAnnotations = NonNullable<NonNullable<ApexOptions["annotations"]>["xaxis"]>;

/** Fechas que llevan rótulo: a intervalos iguales desde la primera, y la última. */
function labelledDates(spend: PeriodSpend): Set<string> {
  const step = Math.max(1, Math.ceil(spend.days.length / SPEND_AXIS_LABELS));

  return new Set(
    spend.days
      .filter((_, index) => index % step === 0 || index === spend.days.length - 1)
      .map((day) => day.date),
  );
}

/**
 * Lo que queda del período: una franja tenue desde el primer día pendiente y,
 * si hoy cae dentro, la marca lila de hoy. Un período ya pasado no lleva ninguna.
 */
function buildAnnotations(spend: PeriodSpend): XAxisAnnotations {
  const firstPending = spend.days.find((day) => day.state === "pending");
  const last = spend.days.at(-1);
  const annotations: XAxisAnnotations = [];

  if (firstPending && last) {
    annotations.push({
      x: spend.today ?? firstPending.date,
      x2: last.date,
      fillColor: SPEND_CHART_COLORS.forecastBand,
      opacity: SPEND_FORECAST_BAND_OPACITY,
      borderColor: "transparent",
    });
  }

  if (spend.today) {
    annotations.push({
      x: spend.today,
      borderColor: SPEND_CHART_COLORS.today,
      strokeDashArray: 0,
      label: {
        text: formatTodayLabel(spend.today),
        orientation: "horizontal",
        borderColor: SPEND_CHART_COLORS.today,
        borderRadius: 999,
        style: {
          background: SPEND_CHART_COLORS.today,
          color: SPEND_CHART_COLORS.todayText,
          fontSize: "11px",
          fontWeight: 500,
          padding: { left: 10, right: 10, top: 3, bottom: 3 },
        },
      },
    });
  }

  return annotations;
}

/**
 * Configuración del área apilada de «Inversión por día». Los días que faltan del
 * período van como previsión (`forecastDataPoints`): trazo discontinuo y relleno
 * rebajado. Una anotación lila marca hoy y otra sombrea lo que queda.
 */
export function buildSpendChartOptions(
  spend: PeriodSpend,
  series: SpendChartSeries[],
): ApexOptions {
  const forecastDays = spend.days.filter((day) => day.state === "pending").length;
  const labelled = labelledDates(spend);

  return {
    chart: {
      type: "area",
      stacked: true,
      fontFamily: "var(--font-body)",
      toolbar: { show: false },
      zoom: { enabled: false },
      animations: { enabled: false },
      parentHeightOffset: 0,
      background: "transparent",
    },
    theme: { mode: "dark" },
    colors: series.map((item) => item.color),
    dataLabels: { enabled: false },
    stroke: { curve: "smooth", width: 2, lineCap: "round" },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 0,
        opacityFrom: SPEND_FILL_OPACITY.from,
        opacityTo: SPEND_FILL_OPACITY.to,
        stops: [0, 100],
      },
    },
    forecastDataPoints: forecastDays > 0
      ? {
          count: forecastDays,
          fillOpacity: SPEND_FORECAST.fillOpacity,
          dashArray: SPEND_FORECAST.dashArray,
          strokeWidth: SPEND_FORECAST.strokeWidth,
        }
      : undefined,
    annotations: { xaxis: buildAnnotations(spend) },
    grid: {
      borderColor: SPEND_CHART_COLORS.grid,
      xaxis: { lines: { show: false } },
      padding: { left: 4, right: 8, top: 24, bottom: 0 },
    },
    legend: { show: false },
    markers: { size: 0, hover: { size: 5 } },
    xaxis: {
      type: "category",
      categories: spend.days.map((day) => day.date),
      axisBorder: { show: false },
      axisTicks: { show: false },
      tooltip: { enabled: false },
      labels: {
        rotate: 0,
        hideOverlappingLabels: true,
        style: { colors: SPEND_CHART_COLORS.label, fontSize: "11px" },
        formatter: (value: string) => axisLabel(value, labelled),
      },
    },
    yaxis: {
      tickAmount: 3,
      labels: {
        style: { colors: SPEND_CHART_COLORS.label, fontSize: "11px" },
        formatter: (value: number) => currency(value),
      },
    },
    tooltip: {
      theme: "dark",
      shared: true,
      intersect: false,
      x: { formatter: (_value, opts) => tooltipDate(spend, opts) },
      y: { formatter: (value: number) => currency(value) },
    },
  };
}

/** Solo algunas fechas llevan rótulo, para que el eje no se amontone. */
function axisLabel(value: unknown, labelled: Set<string>): string {
  return typeof value === "string" && labelled.has(value) ? formatShortDate(value) : "";
}

/** ApexCharts pasa el índice del punto, no su fecha, al tooltip de un eje de categorías. */
function tooltipDate(spend: PeriodSpend, opts?: { dataPointIndex?: number }): string {
  const day = spend.days[opts?.dataPointIndex ?? 0];

  return day ? formatShortDate(day.date) : "";
}

/**
 * Los formateadores tienen que aguantar lo que sea: ApexCharts los llama también
 * para ticks que no son ningún punto, y si uno lanza el lienzo queda en blanco.
 */
function currency(value: unknown): string {
  return typeof value === "number" && Number.isFinite(value)
    ? formatCompactCurrency(value)
    : "";
}

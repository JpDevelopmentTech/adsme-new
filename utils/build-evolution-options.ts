import type { ApexOptions } from "apexcharts";
import { FINANCE_SUMMARY_COPY } from "@/constants/nomina-finanzas-copy.constants";
import { BUCKET_META } from "@/constants/nomina-buckets.constants";
import { NOMINA_CHART_CHROME } from "@/constants/nomina.constants";
import type { NominaMonthSplit } from "@/domain/entities/nomina-bucket";
import { buildStackedColumnsBase } from "@/utils/build-stacked-columns-base";
import { formatAxisAmount } from "@/utils/format-axis-amount";
import { formatAxisPercent } from "@/utils/format-axis-percent";
import { formatExactCurrency } from "@/utils/format-exact-currency";
import { formatMonthTick } from "@/utils/format-nomina-dates";
import { formatOptionalPercent } from "@/utils/format-optional-percent";
import { niceAxisMax } from "@/utils/nice-axis-max";
import { shareOf } from "@/utils/share-of";
import { computeNominaTax } from "@/utils/compute-nomina-tax";

const STACK = ["Servicio", "Utilidad neta", "Impuestos", "Inversión"];
const TICKS = 3;
const MIN_MARGIN_AXIS = 20;

/** Columnas apiladas por mes en pesos (eje izquierdo) y el margen neto en % (eje derecho). */
export function buildEvolutionOptions(months: NominaMonthSplit[]): ApexOptions {
  const maxMargin = Math.max(0, ...months.map((month) => shareOf(month.profit - computeNominaTax(month.profit), month.income) ?? 0));
  const base = buildStackedColumnsBase(
    months.map((month) => formatMonthTick(month.month)),
    [BUCKET_META.servicio.color, BUCKET_META.utilidadNeta.color, BUCKET_META.impuestos.color, BUCKET_META.inversion.color, NOMINA_CHART_CHROME.line],
  );
  const money = (value: number | null) => (value === null ? "—" : formatExactCurrency(value));

  return {
    ...base,
    stroke: { width: [0, 0, 0, 0, 2], curve: "straight" },
    markers: { size: [0, 0, 0, 0, 4], colors: ["#140b28"], strokeColors: NOMINA_CHART_CHROME.line, strokeWidth: 2, hover: { size: 5 } },
    yaxis: [
      { seriesName: STACK, min: 0, max: niceAxisMax(Math.max(...months.map((month) => month.income), 0), TICKS), tickAmount: TICKS, labels: { formatter: formatAxisAmount } },
      { seriesName: FINANCE_SUMMARY_COPY.evolutionMargin, opposite: true, min: 0, max: Math.max(MIN_MARGIN_AXIS, niceAxisMax(maxMargin, TICKS)), tickAmount: TICKS, labels: { formatter: formatAxisPercent } },
    ],
    tooltip: { ...base.tooltip, y: [money, money, money, money, (value: number | null) => formatOptionalPercent(value)].map((formatter) => ({ formatter })) },
  };
}

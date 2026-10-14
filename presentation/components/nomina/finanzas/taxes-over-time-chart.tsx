"use client";

import { BUCKET_META } from "@/constants/nomina-buckets.constants";
import { NOMINA_CHART_CHROME } from "@/constants/nomina.constants";
import { FINANCE_TAX_COPY as COPY } from "@/constants/nomina-finanzas-copy.constants";
import { ChartLegend } from "@/presentation/components/nomina/chart-legend";
import { ApexChart } from "@/presentation/components/ui/apex-chart";
import type { TaxesOverTimeChartProps } from "@/types/nomina-finanzas-props.types";
import { buildTaxesChartOptions } from "@/utils/build-taxes-chart-options";

const LEGEND = [
  { label: COPY.monthSeries, color: BUCKET_META.impuestos.color },
  { label: COPY.cumulativeSeries, color: NOMINA_CHART_CHROME.line, swatch: "line" as const },
];

/** Impuesto causado cada mes en barras y el acumulado del periodo en línea. */
export function TaxesOverTimeChart({ rows }: TaxesOverTimeChartProps) {
  return (
    <div className="flex flex-col gap-4">
      <ChartLegend items={LEGEND} />
      <ApexChart
        type="line"
        height={250}
        label="Impuestos causados por mes y acumulado"
        options={buildTaxesChartOptions(rows)}
        series={[
          { name: COPY.monthSeries, type: "column", data: rows.map((row) => row.tax) },
          { name: COPY.cumulativeSeries, type: "line", data: rows.map((row) => row.cumulative) },
        ]}
      />
    </div>
  );
}

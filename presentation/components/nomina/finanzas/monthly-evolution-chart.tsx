"use client";

import { BUCKET_META } from "@/constants/nomina-buckets.constants";
import { NOMINA_CHART_CHROME } from "@/constants/nomina.constants";
import { FINANCE_SUMMARY_COPY } from "@/constants/nomina-finanzas-copy.constants";
import { ChartLegend } from "@/presentation/components/nomina/chart-legend";
import { ApexChart } from "@/presentation/components/ui/apex-chart";
import type { MonthlyEvolutionChartProps } from "@/types/nomina-finanzas-props.types";
import { buildEvolutionOptions } from "@/utils/build-evolution-options";
import { buildEvolutionSeries } from "@/utils/build-evolution-series";

const LEGEND = [
  { label: BUCKET_META.servicio.label, color: BUCKET_META.servicio.color },
  { label: BUCKET_META.utilidadNeta.label, color: BUCKET_META.utilidadNeta.color },
  { label: BUCKET_META.impuestos.label, color: BUCKET_META.impuestos.color },
  { label: BUCKET_META.inversion.label, color: BUCKET_META.inversion.color },
  { label: FINANCE_SUMMARY_COPY.evolutionMargin, color: NOMINA_CHART_CHROME.line, swatch: "line" as const },
];

/** Reparto de los ingresos de cada mes en columnas apiladas, con el margen neto en línea. */
export function MonthlyEvolutionChart({ months }: MonthlyEvolutionChartProps) {
  return (
    <div className="flex flex-col gap-4">
      <ChartLegend items={LEGEND} />
      <ApexChart
        type="line"
        height={290}
        label="Reparto de los ingresos por mes y margen neto"
        options={buildEvolutionOptions(months)}
        series={buildEvolutionSeries(months)}
      />
    </div>
  );
}

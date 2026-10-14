"use client";

import { BUCKET_META } from "@/constants/nomina-buckets.constants";
import { HISTORY_TAB_COPY } from "@/constants/nomina-perfil-tabs-copy.constants";
import { ApexChart } from "@/presentation/components/ui/apex-chart";
import type { MonthsMapChartProps } from "@/types/nomina-perfil.types";
import { buildMonthsMapOptions } from "@/utils/build-months-map-options";
import { splitBudgetMonth } from "@/utils/split-budget-month";

/** Barras apiladas del Mapa de meses; las opciones llevan funciones, así que se arman aquí. */
export function MonthsMapChart({ months, currentMonth }: MonthsMapChartProps) {
  const splits = months.map(splitBudgetMonth);

  return (
    <ApexChart
      type="bar"
      height={290}
      label={HISTORY_TAB_COPY.mapLabel}
      options={buildMonthsMapOptions(months, currentMonth)}
      series={[
        { name: BUCKET_META.servicio.label, data: splits.map((split) => split.service) },
        { name: BUCKET_META.utilidadNeta.label, data: splits.map((split) => split.netProfit) },
        { name: BUCKET_META.impuestos.label, data: splits.map((split) => split.taxes) },
        { name: BUCKET_META.inversion.label, data: splits.map((split) => split.investment) },
        { name: BUCKET_META.inversionExpress.label, data: splits.map((split) => split.expressInvestment) },
      ]}
    />
  );
}

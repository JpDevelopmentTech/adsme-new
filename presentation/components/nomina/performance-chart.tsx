"use client";

import { useState } from "react";
import { BUCKET_META } from "@/constants/nomina-buckets.constants";
import { ChartLegend } from "@/presentation/components/nomina/chart-legend";
import { ApexChart } from "@/presentation/components/ui/apex-chart";
import { SegmentedControl } from "@/presentation/components/ui/segmented-control";
import type { PerformanceRange } from "@/types/nomina-chart.types";
import type { PerformanceChartProps } from "@/types/nomina-ui.types";
import { buildPerformanceOptions } from "@/utils/build-performance-options";
import { slicePerformanceRange } from "@/utils/slice-performance-range";

const RANGES: { value: PerformanceRange; label: string }[] = ["1M", "3M", "6M", "1A", "Todo"].map((value) => ({ value: value as PerformanceRange, label: value }));

const LEGEND = [
  { label: "Ingresos", color: BUCKET_META.inversion.color, swatch: "line" as const },
  { label: "Utilidad", color: BUCKET_META.utilidad.color, swatch: "dash" as const },
  { label: "Servicio", color: BUCKET_META.servicio.color, swatch: "dash" as const },
];

/** Curva diaria de ingresos con su Utilidad y Servicio, con el selector de rango en la cabecera. */
export function PerformanceChart({ title, subtitle, points, currentMonth }: PerformanceChartProps) {
  const [range, setRange] = useState<PerformanceRange>("3M");
  const visible = slicePerformanceRange(points, range, currentMonth);
  const dates = visible.map((point) => point.date);

  return (
    <div className="flex min-w-0 flex-col gap-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex min-w-0 flex-col gap-1">
          <h2 className="text-lg font-light text-text-primary">{title}</h2>
          <p className="text-[13px] leading-[1.4] text-text-muted">{subtitle}</p>
        </div>
        <SegmentedControl label="Rango de la gráfica" value={range} options={RANGES} onChange={setRange} />
      </div>
      <ChartLegend items={LEGEND} />
      <ApexChart
        type="area"
        height={230}
        label="Ingresos, Utilidad y Servicio por día"
        options={buildPerformanceOptions(dates)}
        series={[
          { name: "Ingresos", data: visible.map((point) => point.income) },
          { name: "Utilidad", data: visible.map((point) => point.profit) },
          { name: "Servicio", data: visible.map((point) => point.service) },
        ]}
      />
    </div>
  );
}

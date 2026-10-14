"use client";

import { ChartBarBig, ChartColumnBig, ChartPie } from "lucide-react";
import { useState } from "react";
import { DistributionLegend } from "@/presentation/components/nomina/distribution-legend";
import { NominaPanel } from "@/presentation/components/nomina/nomina-panel";
import { ApexChart } from "@/presentation/components/ui/apex-chart";
import { IconToggleGroup } from "@/presentation/components/ui/icon-toggle-group";
import type { DistributionView } from "@/types/nomina-chart.types";
import type { DistributionCardProps } from "@/types/nomina-ui.types";
import { buildDistributionOptions } from "@/utils/build-distribution-options";

/**
 * Distribución del mes entre las bolsas, como dona o como barras. Se muestra
 * la Utilidad neta y los Impuestos por separado para que el total sume 100 %.
 */
export function DistributionCard({ title, subtitle, parts, hasVerticalBars = false }: DistributionCardProps) {
  const [view, setView] = useState<DistributionView>("dona");
  const options = [
    { value: "dona" as const, label: "Dona", icon: ChartPie },
    ...(hasVerticalBars ? [{ value: "vertical" as const, label: "Barras verticales", icon: ChartColumnBig }] : []),
    { value: "horizontal" as const, label: "Barras horizontales", icon: ChartBarBig },
  ];
  const isEmpty = parts.every((part) => part.amount === 0);
  const series = view === "dona" ? parts.map((part) => part.amount) : [{ name: "Importe", data: parts.map((part) => part.amount) }];

  return (
    <NominaPanel
      title={title}
      subtitle={subtitle}
      className="h-full"
      actions={<IconToggleGroup label="Tipo de gráfica" value={view} options={options} onChange={setView} />}
    >
      {isEmpty ? (
        <p className="grid h-[190px] place-items-center text-[13px] text-text-muted">Sin datos</p>
      ) : (
        <ApexChart type={view === "dona" ? "donut" : "bar"} height={200} options={buildDistributionOptions(parts, view)} series={series} label={`${title}: reparto entre las bolsas`} />
      )}
      <DistributionLegend parts={parts} />
    </NominaPanel>
  );
}

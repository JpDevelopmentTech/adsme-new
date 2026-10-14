"use client";

import { ChartBarBig, ChartColumnBig, ChartPie } from "lucide-react";
import { useState } from "react";
import { FINANCE_TAB_COPY } from "@/constants/nomina-perfil-copy.constants";
import { DistributionLegend } from "@/presentation/components/nomina/distribution-legend";
import { ApexChart } from "@/presentation/components/ui/apex-chart";
import { IconToggleGroup } from "@/presentation/components/ui/icon-toggle-group";
import type { DistributionView } from "@/types/nomina-chart.types";
import type { ProfileDistributionProps } from "@/types/nomina-perfil.types";
import { buildDistributionOptions } from "@/utils/build-distribution-options";

const VIEWS = [
  { value: "dona" as const, label: FINANCE_TAB_COPY.chartViews.donut, icon: ChartPie },
  { value: "vertical" as const, label: FINANCE_TAB_COPY.chartViews.vertical, icon: ChartColumnBig },
  { value: "horizontal" as const, label: FINANCE_TAB_COPY.chartViews.horizontal, icon: ChartBarBig },
];

/**
 * «Distribución del mes» sin tarjeta propia, para la mitad izquierda del panel
 * partido del perfil. Misma gráfica y leyenda que `DistributionCard`.
 */
export function ProfileDistribution({ monthLabel, parts }: ProfileDistributionProps) {
  const [view, setView] = useState<DistributionView>("dona");
  const isEmpty = parts.every((part) => part.amount === 0);
  const series = view === "dona" ? parts.map((part) => part.amount) : [{ name: "Importe", data: parts.map((part) => part.amount) }];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-light text-text-primary">{FINANCE_TAB_COPY.distributionTitle}</h2>
        <p className="text-[13px] text-text-muted">{monthLabel}</p>
      </div>
      <IconToggleGroup label={FINANCE_TAB_COPY.chartTypeLabel} value={view} options={VIEWS} onChange={setView} />
      {isEmpty ? (
        <p className="grid h-[190px] place-items-center text-[13px] text-text-muted">{FINANCE_TAB_COPY.noData}</p>
      ) : (
        <ApexChart
          type={view === "dona" ? "donut" : "bar"}
          height={200}
          options={buildDistributionOptions(parts, view)}
          series={series}
          label={`${FINANCE_TAB_COPY.distributionTitle}: reparto entre las bolsas`}
        />
      )}
      <DistributionLegend parts={parts} />
    </div>
  );
}

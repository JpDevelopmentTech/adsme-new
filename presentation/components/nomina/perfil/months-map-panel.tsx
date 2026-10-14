import { ChartColumnBig } from "lucide-react";
import { BUCKET_META } from "@/constants/nomina-buckets.constants";
import { HISTORY_TAB_COPY } from "@/constants/nomina-perfil-tabs-copy.constants";
import { ChartLegend } from "@/presentation/components/nomina/chart-legend";
import { NominaPanel } from "@/presentation/components/nomina/nomina-panel";
import { MonthsMapChart } from "@/presentation/components/nomina/perfil/months-map-chart";
import { EmptyStatePanel } from "@/presentation/components/ui/empty-state-panel";
import type { MonthsMapChartProps } from "@/types/nomina-perfil.types";

const LEGEND = [
  { label: BUCKET_META.servicio.label, color: BUCKET_META.servicio.color },
  { label: BUCKET_META.utilidadNeta.label, color: BUCKET_META.utilidadNeta.color },
  { label: BUCKET_META.impuestos.label, color: BUCKET_META.impuestos.color },
  { label: HISTORY_TAB_COPY.showsLegend, color: BUCKET_META.inversion.color },
  { label: HISTORY_TAB_COPY.expressLegend, color: BUCKET_META.inversionExpress.color },
];

/** Panel «Mapa de meses»: el reparto de cada mes y el presupuesto que deja. */
export function MonthsMapPanel({ months, currentMonth }: MonthsMapChartProps) {
  const isEmpty = months.every((month) => month.income === 0);

  return (
    <NominaPanel title={HISTORY_TAB_COPY.mapTitle} subtitle={HISTORY_TAB_COPY.mapSubtitle}>
      {isEmpty ? (
        <EmptyStatePanel
          icon={<ChartColumnBig size={22} strokeWidth={1.5} aria-hidden />}
          title={HISTORY_TAB_COPY.mapEmptyTitle}
          description={HISTORY_TAB_COPY.mapEmptyDescription}
        />
      ) : (
        <>
          <ChartLegend items={LEGEND} />
          <MonthsMapChart months={months} currentMonth={currentMonth} />
        </>
      )}
    </NominaPanel>
  );
}

import { FINANCE_COPY } from "@/constants/nomina-finanzas-copy.constants";
import { DeltaBadge } from "@/presentation/components/nomina/delta-badge";
import { NominaKpiCard } from "@/presentation/components/nomina/nomina-kpi-card";
import type { FinanceKpiGridProps } from "@/types/nomina-finanzas-props.types";
import { cn } from "@/utils/cn";

/** Rejilla de cifras de Finanzas; cada una con su variación y su nota si las tiene. */
export function FinanceKpiGrid({ kpis, className }: FinanceKpiGridProps) {
  return (
    <div className={cn("grid gap-4", className)}>
      {kpis.map((kpi) => (
        <NominaKpiCard key={kpi.label} label={kpi.label} value={kpi.value} valueClassName={kpi.valueClassName}>
          {kpi.delta !== null ? <DeltaBadge value={kpi.delta} comparison={FINANCE_COPY.comparison} /> : null}
          {kpi.note ? <p className="-mt-1 text-[11px] leading-[1.35] text-text-muted">{kpi.note}</p> : null}
        </NominaKpiCard>
      ))}
    </div>
  );
}

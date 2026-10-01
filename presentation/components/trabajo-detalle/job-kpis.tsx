import { MousePointerClick, Play, Users, Wallet } from "lucide-react";
import { JOB_KPI_LABELS } from "@/constants/job-detail.constants";
import { KpiCard } from "@/presentation/components/dashboard/kpi-card";
import type { JobKpisProps } from "@/types/job-detail.types";
import { formatCompactCurrency } from "@/utils/format-compact-currency";

const NUMBER_FORMAT = new Intl.NumberFormat("es-CO");

/** Las cuatro cifras clave del trabajo, sumadas de sus campañas vinculadas. */
export function JobKpis({ metrics }: JobKpisProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <KpiCard
        icon={Play}
        label={JOB_KPI_LABELS.views}
        value={NUMBER_FORMAT.format(metrics.views)}
        note="reproducciones iniciadas"
      />
      <KpiCard
        icon={Users}
        label={JOB_KPI_LABELS.reach}
        value={NUMBER_FORMAT.format(metrics.reach)}
        note="personas únicas"
      />
      <KpiCard
        icon={Wallet}
        label={JOB_KPI_LABELS.spend}
        value={formatCompactCurrency(metrics.spend)}
        note="COP · inversión acumulada"
      />
      <KpiCard
        icon={MousePointerClick}
        label={JOB_KPI_LABELS.ctr}
        value={`${metrics.ctr.toFixed(1).replace(".", ",")}%`}
        note="clics sobre impresiones"
      />
    </div>
  );
}

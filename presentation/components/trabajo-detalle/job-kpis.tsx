import { MousePointerClick, Play, Users, Wallet } from "lucide-react";
import { JOB_KPI_LABELS, JOB_SPEND_COPY } from "@/constants/job-detail.constants";
import { KpiCard } from "@/presentation/components/dashboard/kpi-card";
import type { JobKpisProps } from "@/types/job-detail.types";
import { splitSpendDisplay } from "@/utils/split-spend-display";

const NUMBER_FORMAT = new Intl.NumberFormat("es-CO");

/**
 * Las cuatro cifras clave del trabajo, sumadas de sus campañas vinculadas. El
 * gasto en dólares no se suma a los pesos: va en la nota de la inversión.
 */
export function JobKpis({ metrics }: JobKpisProps) {
  const spend = splitSpendDisplay(metrics.spend, { compact: true });

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
        value={spend.primary}
        note={spend.rest ? JOB_SPEND_COPY.withOthers(spend.rest) : JOB_SPEND_COPY.accumulated}
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

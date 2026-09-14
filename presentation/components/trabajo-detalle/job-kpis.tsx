import { Eye, MousePointerClick, Radio, TrendingUp } from "lucide-react";
import { JOB_KPI_LABELS } from "@/constants/job-detail.constants";
import { KpiCard } from "@/presentation/components/dashboard/kpi-card";
import type { JobKpisProps } from "@/types/job-detail.types";
import { formatCompactCurrency } from "@/utils/format-compact-currency";

const NUMBER_FORMAT = new Intl.NumberFormat("es-CO");
const ICON_SIZE = 17;

/** Los cuatro KPI del trabajo, sumados de sus campañas vinculadas. */
export function JobKpis({ metrics }: JobKpisProps) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      <KpiCard
        tone="violet"
        label={JOB_KPI_LABELS.views}
        value={NUMBER_FORMAT.format(metrics.views)}
        icon={<Eye size={ICON_SIZE} aria-hidden />}
        deltaLabel="reproducciones iniciadas"
      />
      <KpiCard
        tone="cyan"
        label={JOB_KPI_LABELS.reach}
        value={NUMBER_FORMAT.format(metrics.reach)}
        icon={<Radio size={ICON_SIZE} aria-hidden />}
        deltaLabel="personas únicas"
      />
      <KpiCard
        tone="lime"
        label={JOB_KPI_LABELS.spend}
        value={formatCompactCurrency(metrics.spend)}
        icon={<TrendingUp size={ICON_SIZE} aria-hidden />}
        deltaLabel="COP · inversión acumulada"
      />
      <KpiCard
        tone="magenta"
        label={JOB_KPI_LABELS.ctr}
        value={`${metrics.ctr.toFixed(1).replace(".", ",")}%`}
        icon={<MousePointerClick size={ICON_SIZE} aria-hidden />}
        deltaLabel="clics sobre impresiones"
      />
    </div>
  );
}

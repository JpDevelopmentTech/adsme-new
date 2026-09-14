import { RefreshCw, TriangleAlert } from "lucide-react";
import { JOB_DETAIL_COPY, PLATFORM_PRIMARY_METRIC } from "@/constants/job-detail.constants";
import { PLATFORM_OF_CONNECTION } from "@/constants/platform-labels.constants";
import { PLATFORM_META } from "@/constants/platforms.constants";
import { StatusBadge } from "@/presentation/components/ui/status-badge";
import type { JobPlatformCardProps } from "@/types/job-detail.types";
import { formatCompactCurrency } from "@/utils/format-compact-currency";
import { formatRelativeTime } from "@/utils/format-relative-time";
import { primaryMetricFor } from "@/utils/build-job-metrics";

const NUMBER_FORMAT = new Intl.NumberFormat("es-CO");

/** Tarjeta por plataforma con el estado de sus campañas y dos métricas. */
export function JobPlatformCard({ platform, campaigns, now }: JobPlatformCardProps) {
  const { Icon, color } = PLATFORM_META[PLATFORM_OF_CONNECTION[platform]];
  const { label, name } = PLATFORM_PRIMARY_METRIC[platform];
  const hasCampaigns = campaigns.length > 0;

  const spend = campaigns.reduce((total, campaign) => total + campaign.spend, 0);
  const lastSync = campaigns
    .map((campaign) => campaign.syncedAt)
    .sort()
    .at(-1);

  return (
    <section className="flex flex-1 flex-col gap-4 rounded-card border border-border bg-card p-5">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-[11px]">
          <span
            className="grid size-[38px] shrink-0 place-items-center rounded-sm bg-card-elevated"
            style={{ color }}
          >
            <Icon />
          </span>
          <span className="text-[15px] font-semibold text-text-primary">{name}</span>
        </div>

        <StatusBadge
          label={hasCampaigns ? "Activa" : "Sin datos"}
          tone={hasCampaigns ? "success" : "muted"}
        />
      </header>

      <p className="flex items-center gap-2 text-xs text-text-muted">
        <RefreshCw size={14} aria-hidden />
        {lastSync
          ? `Actualizado ${formatRelativeTime(lastSync, now)}`
          : JOB_DETAIL_COPY.noCampaigns}
      </p>

      <div className="flex gap-4">
        <div className="flex flex-1 flex-col gap-[3px]">
          <span className="font-display text-xl font-bold text-text-primary">
            {NUMBER_FORMAT.format(primaryMetricFor(platform, campaigns))}
          </span>
          <span className="text-xs text-text-secondary">{label}</span>
        </div>
        <div className="flex flex-1 flex-col gap-[3px]">
          <span className="font-display text-xl font-bold text-text-primary">
            {formatCompactCurrency(spend)}
          </span>
          <span className="text-xs text-text-secondary">Inversión</span>
        </div>
      </div>

      {!hasCampaigns ? (
        <p className="flex items-center gap-2 rounded-sm border border-warning/20 bg-warning/[0.05] px-3 py-2.5 text-xs text-text-secondary">
          <TriangleAlert size={16} className="shrink-0 text-warning" aria-hidden />
          Vincula una campaña de {name} en el paso 2 del asistente.
        </p>
      ) : null}
    </section>
  );
}

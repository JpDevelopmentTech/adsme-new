import { Link2 } from "lucide-react";
import { JOB_DETAIL_COPY, PLATFORM_PRIMARY_METRIC } from "@/constants/job-detail.constants";
import { PLATFORM_OF_CONNECTION } from "@/constants/platform-labels.constants";
import { PLATFORM_META } from "@/constants/platforms.constants";
import { StatusBadge } from "@/presentation/components/ui/status-badge";
import type { JobPlatformCardProps } from "@/types/job-detail.types";
import { formatCompactCurrency } from "@/utils/format-compact-currency";
import { formatRelativeTime } from "@/utils/format-relative-time";
import { primaryMetricFor } from "@/utils/build-job-metrics";

const NUMBER_FORMAT = new Intl.NumberFormat("es-CO");

/**
 * Tarjeta por plataforma: su monograma, si tiene campañas y dos cifras. Cuando
 * tiene campañas se tiñe con el color de la plataforma; sin ellas, explica cómo
 * vincular una.
 */
export function JobPlatformCard({ platform, campaigns, now }: JobPlatformCardProps) {
  const { mono, chartColor } = PLATFORM_META[PLATFORM_OF_CONNECTION[platform]];
  const { label, name } = PLATFORM_PRIMARY_METRIC[platform];
  const hasCampaigns = campaigns.length > 0;

  const spend = campaigns.reduce((total, campaign) => total + campaign.spend, 0);
  const lastSync = campaigns.map((campaign) => campaign.syncedAt).sort().at(-1);

  return (
    <section
      className="glass-panel flex flex-1 flex-col gap-[18px] rounded-card p-[22px]"
      style={hasCampaigns ? { backgroundImage: `linear-gradient(180deg, ${chartColor}29 0%, transparent 60%)` } : undefined}
    >
      <header className="flex items-center gap-3">
        <span
          aria-hidden
          className="grid size-10 shrink-0 place-items-center rounded-[12px] text-[13px] font-medium"
          style={{ color: chartColor, backgroundColor: `${chartColor}29` }}
        >
          {mono}
        </span>
        <span className="flex min-w-0 flex-1 flex-col">
          <span className="text-[15px] font-normal text-text-primary">{name}</span>
          <span className="truncate text-xs font-normal text-text-muted">
            {lastSync ? `Actualizado ${formatRelativeTime(lastSync, now)}` : JOB_DETAIL_COPY.noCampaigns}
          </span>
        </span>
        <StatusBadge label={hasCampaigns ? "Activa" : "Sin datos"} tone={hasCampaigns ? "success" : "muted"} />
      </header>

      {hasCampaigns ? (
        <div className="flex border-t border-border pt-3.5">
          {[
            [NUMBER_FORMAT.format(primaryMetricFor(platform, campaigns)), label],
            [formatCompactCurrency(spend), "Inversión"],
          ].map(([value, caption]) => (
            <div key={caption} className="flex flex-1 flex-col gap-0.5">
              <span className="text-[28px] leading-tight font-extralight text-text-primary tabular-nums">{value}</span>
              <span className="text-xs font-normal text-text-muted">{caption}</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="flex items-center gap-2.5 rounded-[14px] border border-border bg-surface px-3.5 py-3.5 text-xs leading-[1.45] font-normal text-text-secondary">
          <Link2 size={15} strokeWidth={1.5} className="shrink-0" aria-hidden />
          Vincula una campaña de {name} en el paso 2 del asistente.
        </p>
      )}
    </section>
  );
}

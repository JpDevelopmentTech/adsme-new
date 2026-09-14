import Link from "next/link";
import { JOB_STATUS_BADGE } from "@/constants/client-detail.constants";
import {
  DASHBOARD_COPY,
  MAX_DASHBOARD_CAMPAIGNS,
} from "@/constants/dashboard.constants";
import { JOBS_ROUTE, editJobRoute } from "@/constants/routes.constants";
import { JobCover } from "@/presentation/components/cliente-detalle/job-cover";
import { JobPlatforms } from "@/presentation/components/cliente-detalle/job-platforms";
import { PanelCard } from "@/presentation/components/dashboard/panel-card";
import { StatusBadge } from "@/presentation/components/ui/status-badge";
import type { ActiveCampaignsPanelProps } from "@/types/dashboard-home.types";
import { formatCompactCurrency } from "@/utils/format-compact-currency";

/**
 * Los trabajos en curso que más presupuesto concentran, con su pauta por
 * plataforma. El resto del listado vive en `B5`, a un clic de «Ver todas».
 */
export function ActiveCampaignsPanel({ jobs }: ActiveCampaignsPanelProps) {
  const ranked = [...jobs]
    .sort((a, b) => b.investment - a.investment)
    .slice(0, MAX_DASHBOARD_CAMPAIGNS);

  return (
    <PanelCard
      title={DASHBOARD_COPY.activeCampaigns}
      seeAllHref={JOBS_ROUTE}
      isEmpty={ranked.length === 0}
      emptyText={DASHBOARD_COPY.noCampaigns}
    >
      <ul>
        {ranked.map((job) => {
          const status = JOB_STATUS_BADGE[job.status];

          return (
            <li
              key={job.id}
              className="flex items-center gap-4 border-b border-border px-5 py-3.5 last:border-b-0"
            >
              <JobCover cover={job.cover} imageUrl={job.coverUrl} title={job.title} />

              <div className="flex min-w-0 flex-1 flex-col gap-[3px]">
                <Link
                  href={editJobRoute(job.id)}
                  className="truncate text-sm font-semibold text-text-primary transition-colors hover:text-brand-violet"
                >
                  {job.title}
                </Link>
                <span className="truncate text-xs text-text-muted">
                  {job.artistName}
                </span>
              </div>

              {job.platforms.length > 0 ? (
                <JobPlatforms platforms={job.platforms} jobTitle={job.title} />
              ) : null}

              <span className="w-[110px] shrink-0 text-sm font-semibold text-text-primary">
                {formatCompactCurrency(job.investment)}
              </span>

              <StatusBadge label={status.label} tone={status.tone} />
            </li>
          );
        })}
      </ul>
    </PanelCard>
  );
}

import Link from "next/link";
import { JOB_STATUS_BADGE } from "@/constants/client-detail.constants";
import {
  DASHBOARD_COPY,
  JOBS_TABLE_COLUMNS,
  MAX_DASHBOARD_CAMPAIGNS,
} from "@/constants/dashboard.constants";
import { JOBS_ROUTE, editJobRoute } from "@/constants/routes.constants";
import { JobCover } from "@/presentation/components/cliente-detalle/job-cover";
import { JobPlatforms } from "@/presentation/components/cliente-detalle/job-platforms";
import { PanelCard } from "@/presentation/components/dashboard/panel-card";
import { StatusBadge } from "@/presentation/components/ui/status-badge";
import type { ActiveCampaignsPanelProps } from "@/types/dashboard-home.types";
import { formatCompactCurrency } from "@/utils/format-compact-currency";
import { formatJobPeriod } from "@/utils/format-job-period";

/**
 * Los trabajos en curso que más presupuesto concentran, leídos como tabla a
 * ancho completo: con sitio de sobra, el período deja de ser un dato que hay
 * que ir a buscar al detalle de cada trabajo.
 */
export function ActiveCampaignsPanel({ jobs }: ActiveCampaignsPanelProps) {
  const ranked = [...jobs]
    .sort((a, b) => b.investment - a.investment)
    .slice(0, MAX_DASHBOARD_CAMPAIGNS);

  return (
    <PanelCard
      title={DASHBOARD_COPY.activeCampaigns}
      subtitle={DASHBOARD_COPY.activeCampaignsSubtitle}
      seeAllHref={JOBS_ROUTE}
      isEmpty={ranked.length === 0}
      emptyText={DASHBOARD_COPY.noCampaigns}
    >
      <div className="hidden items-center gap-4 bg-g-100 px-5 py-[9px] text-[10px] font-medium tracking-[0.6px] text-text-muted uppercase lg:flex">
        <span className="w-9 shrink-0">{JOBS_TABLE_COLUMNS.job}</span>
        <span className="min-w-0 flex-1" />
        <span className="w-[136px] shrink-0">{JOBS_TABLE_COLUMNS.period}</span>
        <span className="w-24 shrink-0">{JOBS_TABLE_COLUMNS.platforms}</span>
        <span className="w-[100px] shrink-0 text-right">
          {JOBS_TABLE_COLUMNS.investment}
        </span>
        <span className="w-24 shrink-0 text-center">
          {JOBS_TABLE_COLUMNS.status}
        </span>
      </div>

      <ul className="border-t border-border">
        {ranked.map((job) => {
          const status = JOB_STATUS_BADGE[job.status];

          return (
            <li
              key={job.id}
              className="flex items-center gap-4 border-b border-border px-5 py-3 transition-colors duration-150 last:border-b-0 hover:bg-g-100"
            >
              <JobCover cover={job.cover} imageUrl={job.coverUrl} title={job.title} />

              <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <Link
                  href={editJobRoute(job.id)}
                  className="truncate text-[13.5px] font-normal text-text-primary transition-opacity duration-150 hover:opacity-60"
                >
                  {job.title}
                </Link>
                <span className="truncate text-[11.5px] text-text-muted">
                  {job.artistName}
                </span>
              </div>

              <span className="hidden w-[136px] shrink-0 text-[12px] text-text-secondary lg:block">
                {formatJobPeriod(job.startsOn, job.endsOn)}
              </span>

              <div className="hidden w-24 shrink-0 md:block">
                {job.platforms.length > 0 ? (
                  <JobPlatforms platforms={job.platforms} jobTitle={job.title} />
                ) : null}
              </div>

              <span className="w-[100px] shrink-0 text-right text-[13.5px] font-normal text-text-primary">
                {formatCompactCurrency(job.investment)}
              </span>

              <div className="hidden w-24 shrink-0 justify-center sm:flex">
                <StatusBadge label={status.label} tone={status.tone} />
              </div>
            </li>
          );
        })}
      </ul>
    </PanelCard>
  );
}

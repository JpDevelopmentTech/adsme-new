import { Fragment } from "react";
import { KPI_COPY } from "@/constants/dashboard.constants";
import { PortfolioStat } from "@/presentation/components/dashboard/portfolio-stat";
import type { PortfolioStripProps } from "@/types/dashboard-home.types";
import { formatCompactNumber } from "@/utils/format-compact-number";

/**
 * Alcance, campañas y clientes. Son contexto, no titular: van en una tira fina
 * bajo el dinero del mes en vez de robarle una fila entera con su mismo peso.
 */
export function PortfolioStrip({ metrics }: PortfolioStripProps) {
  const pending = metrics.jobsWithoutPlatforms;

  const stats = [
    {
      label: KPI_COPY.reach,
      value: formatCompactNumber(metrics.reachTotal),
      note: KPI_COPY.reachLabel,
    },
    {
      label: KPI_COPY.campaigns,
      value: String(metrics.activeCampaigns),
      note:
        pending > 0
          ? `${pending} ${KPI_COPY.campaignsLabel}`
          : KPI_COPY.campaignsFallback,
      isFlagged: pending > 0,
    },
    {
      label: KPI_COPY.clients,
      value: String(metrics.clientsTotal),
      note: `${metrics.activeJobs} ${KPI_COPY.clientsLabel}`,
    },
  ];

  return (
    <section className="glass-panel flex flex-wrap items-center gap-y-5 rounded-card py-[18px]">
      {stats.map((stat, index) => (
        <Fragment key={stat.label}>
          {index > 0 ? (
            <span aria-hidden className="hidden h-12 w-px bg-border/60 sm:block" />
          ) : null}
          <PortfolioStat {...stat} />
        </Fragment>
      ))}
    </section>
  );
}

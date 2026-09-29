import { KPI_COPY } from "@/constants/dashboard.constants";
import { PortfolioStat } from "@/presentation/components/dashboard/portfolio-stat";
import type { PortfolioStripProps } from "@/types/dashboard-home.types";
import { formatCompactNumber } from "@/utils/format-compact-number";

/**
 * Alcance, campañas y clientes. Son contexto, no titular: tres cifras sueltas
 * bajo el mes, separadas por espacio y un filete, sin tarjetas.
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
    <section className="grid gap-5 border-y border-border py-5 sm:grid-cols-3">
      {stats.map((stat) => (
        <PortfolioStat key={stat.label} {...stat} />
      ))}
    </section>
  );
}

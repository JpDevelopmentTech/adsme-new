import { Eye, Megaphone, Users, Wallet } from "lucide-react";
import { KPI_COPY } from "@/constants/dashboard.constants";
import { KpiCard } from "@/presentation/components/dashboard/kpi-card";
import { PacingRail } from "@/presentation/components/dashboard/pacing-rail";
import type { KpiRowProps } from "@/types/dashboard-home.types";
import { formatCompactCurrency } from "@/utils/format-compact-currency";
import { formatCompactNumber, share } from "@/utils/format-compact-number";

const ICON_SIZE = 17;

/**
 * Los cuatro KPI de `B1`, ordenados de dinero a portafolio. Cada tarjeta lleva
 * dos datos: la cifra y el contexto que dice si esa cifra es buena noticia.
 */
export function KpiRow({ metrics, spend }: KpiRowProps) {
  const pending = metrics.jobsWithoutPlatforms;

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      <KpiCard
        glow
        tone="violet"
        label={KPI_COPY.investment}
        value={formatCompactCurrency(metrics.monthInvestment)}
        icon={<Wallet size={ICON_SIZE} aria-hidden />}
        footer={
          <PacingRail
            spendPercent={share(spend.toDate, spend.planned)}
            calendarPercent={share(spend.today, spend.daysInMonth)}
            caption={`día ${spend.today} de ${spend.daysInMonth}`}
          />
        }
      />
      <KpiCard
        tone="cyan"
        label={KPI_COPY.reach}
        value={formatCompactNumber(metrics.reachTotal)}
        icon={<Eye size={ICON_SIZE} aria-hidden />}
        deltaLabel={KPI_COPY.reachLabel}
      />
      <KpiCard
        tone="lime"
        label={KPI_COPY.campaigns}
        value={String(metrics.activeCampaigns)}
        icon={<Megaphone size={ICON_SIZE} aria-hidden />}
        delta={pending > 0 ? String(pending) : undefined}
        deltaTone="warning"
        deltaLabel={pending > 0 ? KPI_COPY.campaignsLabel : KPI_COPY.campaignsFallback}
      />
      <KpiCard
        tone="magenta"
        label={KPI_COPY.clients}
        value={String(metrics.clientsTotal)}
        icon={<Users size={ICON_SIZE} aria-hidden />}
        delta={String(metrics.activeJobs)}
        deltaTone="neutral"
        deltaLabel={KPI_COPY.clientsLabel}
      />
    </div>
  );
}

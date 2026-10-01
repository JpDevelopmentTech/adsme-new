import { CirclePlay, Megaphone, MicVocal } from "lucide-react";
import { KPI_COPY } from "@/constants/dashboard.constants";
import { KpiTile } from "@/presentation/components/dashboard/kpi-tile";
import { PeriodInvestmentCard } from "@/presentation/components/dashboard/period-investment-card";
import type { DashboardKpiRowProps } from "@/types/dashboard-home.types";
import { formatCompactNumber } from "@/utils/format-compact-number";

/**
 * Fila de tarjetas que abre `B1`: la inversión del período con su ritmo y, al
 * lado, reproducciones, pautas y clientes de ese mismo período como contexto.
 */
export function DashboardKpiRow({ metrics, ...investment }: DashboardKpiRowProps) {
  const pending = metrics.jobsWithoutPlatforms;

  return (
    <div className="flex flex-col gap-4 xl:flex-row">
      <PeriodInvestmentCard {...investment} />

      <div className="flex flex-col gap-4 sm:flex-row xl:flex-1">
        <KpiTile
          icon={CirclePlay}
          label={KPI_COPY.views}
          value={formatCompactNumber(metrics.viewsInPeriod)}
          note={KPI_COPY.viewsLabel}
        />
        <KpiTile
          icon={Megaphone}
          label={KPI_COPY.campaigns}
          value={String(metrics.campaignsInPeriod)}
          note={
            pending > 0 ? `${pending} ${KPI_COPY.campaignsLabel}` : KPI_COPY.campaignsFallback
          }
          isFlagged={pending > 0}
        />
        <KpiTile
          icon={MicVocal}
          label={KPI_COPY.clients}
          value={String(metrics.clientsInPeriod)}
          note={KPI_COPY.clientsLabel(metrics.jobsInPeriod)}
        />
      </div>
    </div>
  );
}

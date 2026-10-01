import { DASHBOARD_COPY } from "@/constants/dashboard.constants";
import { SpendAreaChart } from "@/presentation/components/dashboard/spend-area-chart";
import { SpendLegend } from "@/presentation/components/dashboard/spend-legend";
import type { SpendPanelProps } from "@/types/dashboard-home.types";
import { formatPeriodSpendSubtitle } from "@/utils/format-period-spend-subtitle";

/**
 * Inversión día a día a todo el ancho: lo gastado hasta hoy y, en discontinuo,
 * el reparto planificado de lo que queda del período.
 */
export function SpendPanel({ spend }: SpendPanelProps) {
  const hasSpend = spend.planned > 0;
  const subtitle = formatPeriodSpendSubtitle(spend);

  return (
    <section className="glass-panel flex flex-col gap-[18px] rounded-card p-6">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex min-w-0 flex-col gap-1">
          <h2 className="text-[17px] font-light text-text-primary">{DASHBOARD_COPY.spend}</h2>
          <p className="text-xs font-normal text-text-muted">{subtitle}</p>
        </div>

        {hasSpend ? <SpendLegend hasUnassigned={spend.hasUnassigned} /> : null}
      </header>

      {hasSpend ? (
        <SpendAreaChart spend={spend} label={subtitle} />
      ) : (
        <p className="py-10 text-center text-[13px] text-text-muted">{DASHBOARD_COPY.noSpend}</p>
      )}
    </section>
  );
}

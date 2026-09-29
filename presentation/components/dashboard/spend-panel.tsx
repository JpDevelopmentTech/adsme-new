import { DASHBOARD_COPY } from "@/constants/dashboard.constants";
import { SpendAxis } from "@/presentation/components/dashboard/spend-axis";
import { SpendLegend } from "@/presentation/components/dashboard/spend-legend";
import { SpendPlot } from "@/presentation/components/dashboard/spend-plot";
import type { SpendPanelProps } from "@/types/dashboard-home.types";
import { formatMonthSpendSubtitle } from "@/utils/format-month-spend-subtitle";

/**
 * Inversión día a día, apilada por plataforma. Es donde el color trabaja en el
 * dashboard: cada barra dice qué plataforma se llevó el dinero ese día.
 */
export function SpendPanel({ spend }: SpendPanelProps) {
  const hasSpend = spend.planned > 0;
  const subtitle = formatMonthSpendSubtitle(spend);

  return (
    <section className="glass-panel flex h-full flex-col gap-5 rounded-card p-5">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex min-w-0 flex-col gap-[3px]">
          <h2 className="font-display text-[15px] font-normal tracking-[-0.2px] text-text-primary">
            {DASHBOARD_COPY.spend}
          </h2>
          <p className="text-[12px] text-text-secondary">{subtitle}</p>
        </div>

        {hasSpend ? <SpendLegend hasUnassigned={spend.hasUnassigned} /> : null}
      </header>

      {hasSpend ? (
        <div className="flex flex-col gap-2">
          <SpendPlot spend={spend} max={spend.peakAmount || 1} label={subtitle} />
          <SpendAxis spend={spend} />
        </div>
      ) : (
        <p className="py-8 text-center text-[12px] text-text-muted">
          {DASHBOARD_COPY.noSpend}
        </p>
      )}
    </section>
  );
}

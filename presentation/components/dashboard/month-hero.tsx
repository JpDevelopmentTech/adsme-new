import { DASHBOARD_COPY, KPI_COPY } from "@/constants/dashboard.constants";
import { PacingRail } from "@/presentation/components/dashboard/pacing-rail";
import { SpendAxis } from "@/presentation/components/dashboard/spend-axis";
import { SpendLegend } from "@/presentation/components/dashboard/spend-legend";
import { SpendPlot } from "@/presentation/components/dashboard/spend-plot";
import type { MonthHeroProps } from "@/types/dashboard-home.types";
import { formatCompactCurrency } from "@/utils/format-compact-currency";
import { share } from "@/utils/format-compact-number";
import { formatMonthSpendSubtitle } from "@/utils/format-month-spend-subtitle";

/**
 * Toda la historia del dinero del mes en un solo objeto: cuánto hay puesto, a
 * qué ritmo se está gastando y cómo se reparte día a día. La muesca del riel y
 * la línea de «hoy» de las barras caen en la misma vertical porque son el mismo
 * instante; repartir esto en dos paneles obligaba a reconstruirlo mentalmente.
 */
export function MonthHero({ metrics, spend, status }: MonthHeroProps) {
  const hasSpend = spend.planned > 0;
  const subtitle = formatMonthSpendSubtitle(spend);

  return (
    <section className="flex flex-col gap-[18px] rounded-card bg-ink/94 p-6 shadow-lift backdrop-blur-xl">
      <header className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
        <span className="text-[10px] font-medium tracking-[0.6px] text-g-400 uppercase">
          {KPI_COPY.investment} · {spend.monthLabel}
        </span>
        <span className="text-[10px] font-medium tracking-[0.6px] text-g-500 uppercase">
          {status}
        </span>
      </header>

      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
        <span className="font-display text-[52px] leading-none font-light tracking-[-2.2px] text-g-50">
          {formatCompactCurrency(metrics.monthInvestment)}
        </span>

        {hasSpend ? <SpendLegend hasUnassigned={spend.hasUnassigned} /> : null}
      </div>

      <PacingRail
        spendPercent={share(spend.toDate, spend.planned)}
        calendarPercent={share(spend.today, spend.daysInMonth)}
        caption={`día ${spend.today} de ${spend.daysInMonth}`}
      />

      {hasSpend ? (
        <>
          <SpendPlot spend={spend} max={spend.peakAmount || 1} label={subtitle} />
          <SpendAxis spend={spend} />
        </>
      ) : (
        <p className="py-8 text-center text-[12px] text-g-400">
          {DASHBOARD_COPY.noSpend}
        </p>
      )}
    </section>
  );
}

import { Fragment } from "react";
import { DASHBOARD_COPY } from "@/constants/dashboard.constants";
import { SpendAxis } from "@/presentation/components/dashboard/spend-axis";
import { SpendColumn } from "@/presentation/components/dashboard/spend-column";
import { SpendLegend } from "@/presentation/components/dashboard/spend-legend";
import type { MonthSpendChartProps } from "@/types/dashboard-home.types";
import { formatMonthSpendSubtitle } from "@/utils/format-month-spend-subtitle";

/**
 * Inversión día a día apilada por plataforma: gasto real hasta hoy y reparto de
 * lo comprometido para lo que queda de mes. Los días que aún no han llegado
 * quedan vacíos a propósito: así se ve de golpe cuánto mes queda.
 */
export function MonthSpendChart({ spend }: MonthSpendChartProps) {
  const max = spend.peakAmount || 1;

  const subtitle = formatMonthSpendSubtitle(spend);

  return (
    <section className="flex h-full flex-col gap-4 overflow-hidden rounded-card border border-border bg-card p-5">
      <header className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
        <div className="flex min-w-0 flex-col gap-[3px]">
          <h2 className="font-display text-base font-semibold text-text-primary">
            {DASHBOARD_COPY.spend}
          </h2>
          <p className="text-xs text-text-secondary">
            {spend.planned > 0 ? subtitle : spend.monthLabel}
          </p>
        </div>

        <SpendLegend hasUnassigned={spend.hasUnassigned} />
      </header>

      {spend.planned > 0 ? (
        <>
          <div
            role="img"
            aria-label={subtitle}
            className="flex h-[136px] shrink-0 items-stretch gap-[5px]"
          >
            {spend.days.map((day) => (
              <Fragment key={day.day}>
                <SpendColumn day={day} max={max} />

                {day.day === spend.today ? (
                  <span
                    aria-hidden
                    className="w-px shrink-0 bg-brand-violet/30"
                  />
                ) : null}
              </Fragment>
            ))}
          </div>

          <SpendAxis spend={spend} />
        </>
      ) : (
        <p className="flex flex-1 items-center justify-center py-8 text-center text-[13px] text-text-muted">
          {DASHBOARD_COPY.noSpend}
        </p>
      )}
    </section>
  );
}

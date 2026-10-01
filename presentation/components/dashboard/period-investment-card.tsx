import { KPI_COPY } from "@/constants/dashboard.constants";
import { PacingPill } from "@/presentation/components/dashboard/pacing-pill";
import { PacingRings } from "@/presentation/components/dashboard/pacing-rings";
import type { PeriodInvestmentCardProps } from "@/types/dashboard-home.types";
import { cn } from "@/utils/cn";
import { formatCompactCurrency } from "@/utils/format-compact-currency";
import { share } from "@/utils/format-compact-number";
import { splitCompactAmount } from "@/utils/split-compact-amount";

/**
 * La tarjeta que abre el dashboard: la inversión que cae dentro del período en
 * una cifra grande —la misma suma que dibuja la gráfica diaria— y, a su lado,
 * el ritmo del gasto en dos anillos frente al calendario del período.
 */
export function PeriodInvestmentCard({ spend, status, isSynced }: PeriodInvestmentCardProps) {
  const amount = splitCompactAmount(formatCompactCurrency(spend.planned));
  const spendPercent = share(spend.toDate, spend.planned);
  const calendarPercent = share(spend.elapsedDays, spend.totalDays);

  return (
    <section className="glass-panel flex flex-col gap-5 rounded-card p-6 sm:flex-row sm:items-center xl:w-[500px] xl:shrink-0">
      <div className="flex min-w-0 flex-1 flex-col gap-2.5">
        <h2 className="text-[13px] font-normal text-text-secondary">
          {KPI_COPY.investment} · {spend.label}
        </h2>

        <p className="flex items-end gap-1.5 tabular-nums">
          <span className="text-[64px] leading-none font-extralight tracking-[-2.5px] text-text-primary">
            {amount.value}
          </span>
          {amount.unit ? (
            <span className="pb-[7px] text-[28px] leading-none font-extralight text-text-secondary">
              {amount.unit}
            </span>
          ) : null}
        </p>

        <PacingPill spendPercent={spendPercent} calendarPercent={calendarPercent} />

        <p className="flex items-center gap-2 pt-1.5 text-xs font-normal text-text-muted">
          <span
            aria-hidden
            className={cn("size-1.5 rounded-pill", isSynced ? "bg-success" : "bg-text-muted")}
          />
          {status}
        </p>
      </div>

      <PacingRings
        spendPercent={spendPercent}
        calendarPercent={calendarPercent}
        elapsedDays={spend.elapsedDays}
        totalDays={spend.totalDays}
      />
    </section>
  );
}

import { CLIENT_CARD_COPY } from "@/constants/clients.constants";
import type { ClientCardSpendProps } from "@/types/client.types";
import { cn } from "@/utils/cn";
import { formatCompactCurrency } from "@/utils/format-compact-currency";

/** Dato principal de la tarjeta: cuánto se está invirtiendo este mes y en qué. */
export function ClientCardSpend({
  monthInvestment,
  monthName,
  jobsCount,
  activeJobsCount,
}: ClientCardSpendProps) {
  return (
    <div className="flex items-end justify-between gap-3">
      <div className="flex min-w-0 flex-col gap-[3px]">
        <span
          className={cn(
            "font-display text-[22px] leading-[1.1] font-bold",
            monthInvestment > 0 ? "text-text-primary" : "text-text-muted",
          )}
        >
          {formatCompactCurrency(monthInvestment)}
        </span>
        <span className="truncate text-xs text-text-muted">
          {CLIENT_CARD_COPY.investedIn(monthName)}
        </span>
      </div>

      <div className="flex shrink-0 flex-col items-end gap-[3px]">
        <span className="text-[13px] font-semibold text-text-primary">
          {CLIENT_CARD_COPY.activeJobs(activeJobsCount)}
        </span>
        <span className="text-xs text-text-muted">
          {CLIENT_CARD_COPY.totalJobs(jobsCount)}
        </span>
      </div>
    </div>
  );
}

import { KPI_COPY } from "@/constants/dashboard.constants";
import { PacingRail } from "@/presentation/components/dashboard/pacing-rail";
import type { MonthHeroProps } from "@/types/dashboard-home.types";
import { formatCompactCurrency } from "@/utils/format-compact-currency";
import { share } from "@/utils/format-compact-number";

/**
 * Abre el dashboard con el mes en una cifra y una línea: cuánto hay puesto y a
 * qué ritmo se está gastando. Va sobre el fondo, sin panel, porque es el
 * titular de la pantalla y no una tarjeta más entre otras.
 */
export function MonthHero({ metrics, spend, status }: MonthHeroProps) {
  return (
    <section className="flex flex-col gap-5">
      <header className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
        <span className="text-[11px] font-medium tracking-[0.6px] text-text-muted uppercase">
          {KPI_COPY.investment} · {spend.monthLabel}
        </span>
        <span className="text-[11.5px] text-text-muted">{status}</span>
      </header>

      <p className="font-display text-[clamp(40px,7vw,56px)] leading-none font-light tracking-[-2px] text-text-primary tabular-nums">
        {formatCompactCurrency(metrics.monthInvestment)}
      </p>

      <PacingRail
        spendPercent={share(spend.toDate, spend.planned)}
        calendarPercent={share(spend.today, spend.daysInMonth)}
        caption={`día ${spend.today} de ${spend.daysInMonth}`}
      />
    </section>
  );
}

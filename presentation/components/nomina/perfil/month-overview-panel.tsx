import { FINANCE_TAB_COPY } from "@/constants/nomina-perfil-copy.constants";
import { ProfileDistribution } from "@/presentation/components/nomina/perfil/profile-distribution";
import { PerformanceChart } from "@/presentation/components/nomina/performance-chart";
import type { MonthOverviewPanelProps } from "@/types/nomina-perfil.types";
import { formatMonthLong } from "@/utils/format-nomina-dates";

/** Panel partido: la distribución del mes a la izquierda y el rendimiento a la derecha. */
export function MonthOverviewPanel({ artistName, currentMonth, parts, points }: MonthOverviewPanelProps) {
  return (
    <section className="glass-panel grid gap-6 rounded-card p-6 lg:grid-cols-[280px_1px_minmax(0,1fr)] lg:gap-7 lg:p-8">
      <ProfileDistribution monthLabel={formatMonthLong(currentMonth)} parts={parts} />
      <span aria-hidden className="h-px bg-border lg:h-auto lg:w-px" />
      <PerformanceChart
        title={FINANCE_TAB_COPY.performanceTitle}
        subtitle={`${FINANCE_TAB_COPY.performanceLead} ${artistName} · ${FINANCE_TAB_COPY.performanceSubtitle}`}
        points={points}
        currentMonth={currentMonth}
      />
    </section>
  );
}

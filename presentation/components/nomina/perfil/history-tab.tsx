import { DEFAULT_PERIOD } from "@/constants/nomina-period.constants";
import { HISTORY_TAB_COPY } from "@/constants/nomina-perfil-tabs-copy.constants";
import { BudgetTablePanel } from "@/presentation/components/nomina/perfil/budget-table-panel";
import { HistoryKpis } from "@/presentation/components/nomina/perfil/history-kpis";
import { MonthsMapPanel } from "@/presentation/components/nomina/perfil/months-map-panel";
import { PeriodSelector } from "@/presentation/components/nomina/period-selector";
import type { HistoryTabProps } from "@/types/nomina-perfil.types";
import { formatMonthLong } from "@/utils/format-nomina-dates";
import { profileCurrentMonth } from "@/utils/profile-current-month";

/** Pestaña Histórico: el rango elegido, sus cifras, el mapa de meses y el presupuesto. */
export function HistoryTab({ profile }: HistoryTabProps) {
  const currentMonth = profileCurrentMonth(profile);
  const first = profile.history[0]?.month ?? currentMonth;
  const range = first === currentMonth ? formatMonthLong(currentMonth) : `${formatMonthLong(first)} – ${formatMonthLong(currentMonth)}`;

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-[15px] text-text-secondary">
          {HISTORY_TAB_COPY.titleLead} {profile.name} · <strong className="font-normal text-text-primary">{range}</strong>
        </p>
        <PeriodSelector label={DEFAULT_PERIOD.label} range={DEFAULT_PERIOD.range} />
      </div>
      <HistoryKpis profile={profile} />
      <MonthsMapPanel months={profile.history} currentMonth={currentMonth} />
      <BudgetTablePanel months={profile.history} currentMonth={currentMonth} />
    </>
  );
}

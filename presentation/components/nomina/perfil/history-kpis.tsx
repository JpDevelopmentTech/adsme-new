import { HISTORY_TAB_COPY } from "@/constants/nomina-perfil-tabs-copy.constants";
import { NominaKpiCard } from "@/presentation/components/nomina/nomina-kpi-card";
import type { HistoryTabProps } from "@/types/nomina-perfil.types";
import { formatExactCurrency } from "@/utils/format-exact-currency";
import { formatMonthLong } from "@/utils/format-nomina-dates";
import { profileCurrentMonth } from "@/utils/profile-current-month";

/** Disponible para Ads, lo que se recauda este mes y lo recaudado en el rango. */
export function HistoryKpis({ profile }: HistoryTabProps) {
  const currentMonth = profileCurrentMonth(profile);
  const raising = profile.history.find((month) => month.month === currentMonth)?.investment ?? 0;
  const raised = profile.history.reduce((sum, month) => sum + month.investment + month.expressInvestment, 0);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <NominaKpiCard label={HISTORY_TAB_COPY.available} value={formatExactCurrency(profile.kpis.availableBudget)} note={HISTORY_TAB_COPY.availableNote} />
      <NominaKpiCard label={HISTORY_TAB_COPY.raising} value={formatExactCurrency(raising)} note={`${HISTORY_TAB_COPY.raisingNote} ${formatMonthLong(currentMonth)}`} />
      <NominaKpiCard
        label={`${HISTORY_TAB_COPY.raised} ${profile.history.length} ${HISTORY_TAB_COPY.raisedMonths}`}
        value={formatExactCurrency(raised)}
        note={HISTORY_TAB_COPY.raisedNote}
      />
    </div>
  );
}

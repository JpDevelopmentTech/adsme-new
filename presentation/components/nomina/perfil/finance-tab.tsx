import { ExpensesPanel } from "@/presentation/components/nomina/perfil/expenses-panel";
import { MonthOverviewPanel } from "@/presentation/components/nomina/perfil/month-overview-panel";
import { MovementsPanel } from "@/presentation/components/nomina/perfil/movements-panel";
import type { FinanceTabProps } from "@/types/nomina-perfil.types";
import { profileCurrentMonth } from "@/utils/profile-current-month";
import { toIncomeContext } from "@/utils/to-income-context";
import { toModalArtist } from "@/utils/to-modal-artist";

/** Pestaña Finanzas: desglose de movimientos, gastos y el panel del mes. */
export function FinanceTab({ profile, isReadOnly = false }: FinanceTabProps) {
  const artist = toModalArtist(profile);

  return (
    <>
      <MovementsPanel
        artist={artist}
        movements={profile.movements}
        totals={profile.movementTotals}
        incomeContext={toIncomeContext(profile)}
        isReadOnly={isReadOnly}
      />
      <ExpensesPanel artist={artist} expenses={profile.expenses} isReadOnly={isReadOnly} />
      <MonthOverviewPanel
        artistName={profile.name}
        currentMonth={profileCurrentMonth(profile)}
        parts={profile.monthDistribution}
        points={profile.performance}
      />
    </>
  );
}

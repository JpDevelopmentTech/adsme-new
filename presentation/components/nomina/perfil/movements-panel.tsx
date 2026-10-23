import { CircleDollarSign } from "lucide-react";
import { FINANCE_TAB_COPY } from "@/constants/nomina-perfil-copy.constants";
import { NewExpenseButton } from "@/presentation/components/nomina/modales/new-expense-button";
import { NewIncomeButton } from "@/presentation/components/nomina/modales/new-income-button";
import { NominaPanel } from "@/presentation/components/nomina/nomina-panel";
import { MovementsTable } from "@/presentation/components/nomina/perfil/movements-table";
import { EmptyStatePanel } from "@/presentation/components/ui/empty-state-panel";
import type { MovementsPanelProps } from "@/types/nomina-perfil.types";

/** Panel «Desglose de Movimientos»: los ingresos del artista con su reparto. */
export function MovementsPanel({ artist, movements, totals, isReadOnly = false }: MovementsPanelProps) {
  return (
    <NominaPanel
      isThick
      title={FINANCE_TAB_COPY.movementsTitle}
      subtitle={isReadOnly ? FINANCE_TAB_COPY.movementsSubtitleReadOnly : FINANCE_TAB_COPY.movementsSubtitle}
      actions={
        isReadOnly ? undefined : (
          <>
            <NewExpenseButton artist={artist} />
            <NewIncomeButton artist={artist} variant="primary" />
          </>
        )
      }
    >
      {movements.length === 0 ? (
        <EmptyStatePanel
          icon={<CircleDollarSign size={22} strokeWidth={1.5} aria-hidden />}
          title={FINANCE_TAB_COPY.emptyTitle}
          description={isReadOnly ? FINANCE_TAB_COPY.emptyDescriptionReadOnly : FINANCE_TAB_COPY.emptyDescription}
        />
      ) : (
        <MovementsTable artist={artist} movements={movements} totals={totals} isReadOnly={isReadOnly} />
      )}
    </NominaPanel>
  );
}

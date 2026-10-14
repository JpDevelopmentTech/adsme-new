import { PROFILE_COPY } from "@/constants/nomina-perfil-copy.constants";
import { NominaKpiCard } from "@/presentation/components/nomina/nomina-kpi-card";
import { ProfitGoalMeter } from "@/presentation/components/nomina/perfil/profit-goal-meter";
import { ScalabilityKpiCard } from "@/presentation/components/nomina/perfil/scalability-kpi-card";
import { StatusKpiCard } from "@/presentation/components/nomina/perfil/status-kpi-card";
import type { ProfileKpisProps } from "@/types/nomina-perfil.types";
import { formatExactCurrency } from "@/utils/format-exact-currency";
import { resolveProfitLevel } from "@/utils/resolve-profit-level";

/** Las 8 cifras del perfil en dos filas de cuatro: el mes en curso y lo acumulado. */
export function ProfileKpis({ profile }: ProfileKpisProps) {
  const { kpis, profitability, movementTotals, fixedProfitGoal } = profile;
  const level = resolveProfitLevel(profitability.margin, movementTotals.netProfit);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <NominaKpiCard label={PROFILE_COPY.monthIncome} value={formatExactCurrency(kpis.monthIncome)} />
      <StatusKpiCard scalability={profile.scalability} margin={profitability.margin} level={level} />
      <ScalabilityKpiCard progress={profile.progress} />
      <NominaKpiCard label={PROFILE_COPY.availableBudget} value={formatExactCurrency(kpis.availableBudget)} />
      <NominaKpiCard label={PROFILE_COPY.profit} value={formatExactCurrency(kpis.monthProfit)}>
        {fixedProfitGoal ? <ProfitGoalMeter profit={kpis.monthProfit} goal={fixedProfitGoal} /> : null}
      </NominaKpiCard>
      <NominaKpiCard label={PROFILE_COPY.adsSpent} value={formatExactCurrency(kpis.adsSpent)} />
      <NominaKpiCard
        label={PROFILE_COPY.service}
        value={formatExactCurrency(kpis.monthService)}
        note={kpis.serviceAssumedByAdsme ? PROFILE_COPY.serviceAssumed : undefined}
      />
      <NominaKpiCard label={PROFILE_COPY.taxes} value={formatExactCurrency(kpis.monthTaxes)} />
    </div>
  );
}

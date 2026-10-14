import { PROFIT_LEVEL_META } from "@/constants/nomina-profit.constants";
import { PROFILE_COPY } from "@/constants/nomina-perfil-copy.constants";
import { ProfitLevelBadge } from "@/presentation/components/nomina/profit-level-badge";
import { ProfitBar } from "@/presentation/components/nomina/perfil/profit-bar";
import { ScalabilityBadge } from "@/presentation/components/nomina/scalability-badge";
import type { StatusKpiCardProps } from "@/types/nomina-perfil.types";

/** Tarjeta «Estado»: escalabilidad, veredicto de rentabilidad y su barra acumulada. */
export function StatusKpiCard({ scalability, margin, level }: StatusKpiCardProps) {
  return (
    <section title={PROFILE_COPY.profitTooltip} className="glass-panel flex min-w-0 flex-col gap-3 rounded-card px-5 py-[18px]">
      <h3 className="text-[13px] font-light text-text-secondary">{PROFILE_COPY.status}</h3>
      <div className="flex flex-wrap gap-1.5">
        <ScalabilityBadge value={scalability} />
        {margin === null ? null : <ProfitLevelBadge level={level} />}
      </div>
      {margin === null ? (
        <p className="text-[13px] text-text-muted">{PROFILE_COPY.noIncome}</p>
      ) : (
        <ProfitBar margin={margin} color={PROFIT_LEVEL_META[level].color} />
      )}
      <p className="text-[11px] text-text-muted">{PROFILE_COPY.profitHelp}</p>
    </section>
  );
}

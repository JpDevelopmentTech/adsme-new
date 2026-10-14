import { FINANCE_SUMMARY_COPY as COPY } from "@/constants/nomina-finanzas-copy.constants";
import { PROFIT_LEVEL_META } from "@/constants/nomina-profit.constants";
import { ProfitThresholds } from "@/presentation/components/nomina/finanzas/profit-thresholds";
import { ProfitLevelBadge } from "@/presentation/components/nomina/profit-level-badge";
import type { BusinessHealthCardProps } from "@/types/nomina-finanzas-props.types";
import { formatOptionalPercent } from "@/utils/format-optional-percent";

/**
 * «¿Es rentable el negocio?»: la rentabilidad neta en grande, teñida de su
 * nivel, con el veredicto, los umbrales de referencia y cómo se calcula.
 */
export function BusinessHealthCard({ health }: BusinessHealthCardProps) {
  return (
    <section className="glass-panel flex flex-col gap-4 rounded-card p-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-light text-text-primary">{COPY.healthTitle}</h2>
        <p className="text-[13px] leading-[1.4] text-text-muted">{COPY.healthSubtitle}</p>
      </div>
      <p
        className="pt-2 text-[60px] leading-none font-extralight tracking-[-1.5px] tabular-nums"
        style={{ color: PROFIT_LEVEL_META[health.level].color }}
      >
        {formatOptionalPercent(health.margin)}
      </p>
      <p className="text-[13px] text-text-secondary">{COPY.healthLabel}</p>
      <div>
        <ProfitLevelBadge level={health.level} />
      </div>
      <p className="text-[13px] text-text-secondary">
        {COPY.grossShare}: {formatOptionalPercent(health.grossShare)}
      </p>
      <p className="text-[13px] text-text-secondary">
        {COPY.profitableArtists}: {health.profitableCount} de {health.artistCount}
      </p>
      <hr className="border-border" />
      <ProfitThresholds />
      <p className="text-[11px] leading-[1.55] text-text-muted">{COPY.healthNote}</p>
    </section>
  );
}

import { VIABILITY_COPY } from "@/constants/nomina-modales-reparto-copy.constants";
import { MessageList } from "@/presentation/components/nomina/modales/reparto/message-list";
import { PhaseTable } from "@/presentation/components/nomina/modales/reparto/phase-table";
import { ShowRuler } from "@/presentation/components/nomina/show-ruler";
import type { ViabilityDetailProps } from "@/types/nomina-modales-reparto.types";

/** Detalle desplegado: avisos, confirmaciones, fases y la regla de un mes de ejemplo. */
export function ViabilityDetail({ viability }: ViabilityDetailProps) {
  const hasErrors = viability.errors.length > 0;

  return (
    <div className="flex flex-col gap-4">
      <MessageList items={viability.warnings} prefix="⚠ " className="text-warning" />
      <MessageList items={viability.confirmations} prefix="✓ " className="text-text-primary" />
      {hasErrors ? null : (
        <>
          <PhaseTable phases={viability.phases} />
          <div className="flex flex-col gap-2.5">
            <p className="text-xs font-light text-text-muted">{VIABILITY_COPY.rulerLead}</p>
            <ShowRuler progress={viability.ruler} size="md" />
            <p className="text-xs font-light text-text-muted">{viability.footnote}</p>
          </div>
        </>
      )}
    </div>
  );
}

import { SPLIT_MODEL_COPY } from "@/constants/nomina-modales-reparto-copy.constants";
import { FieldShell } from "@/presentation/components/nomina/modales/campos/field-shell";
import { MoneyInput } from "@/presentation/components/nomina/modales/campos/money-input";
import { PercentInput } from "@/presentation/components/nomina/modales/campos/percent-input";
import type { SplitParamsFieldsProps } from "@/types/nomina-modales-reparto.types";

/** «% de Utilidad» y, con Escalabilidad, «Utilidad por show después del mínimo». */
export function SplitParamsFields({ idPrefix, hasScalability, percent, post, onPercent, onPost, hasHelp = false, nomina }: SplitParamsFieldsProps) {
  return (
    <div className={hasScalability ? "grid gap-4 sm:grid-cols-2" : "grid"}>
      <FieldShell
        htmlFor={`${idPrefix}-percent`}
        label={hasScalability ? SPLIT_MODEL_COPY.percentUntilMin : SPLIT_MODEL_COPY.percentPlain}
        hint={hasHelp ? SPLIT_MODEL_COPY.percentHelp : undefined}
      >
        <PercentInput id={`${idPrefix}-percent`} value={percent} onChange={onPercent} isInvalid={percent < 0 || percent > 100} />
      </FieldShell>
      {hasScalability ? (
        <FieldShell htmlFor={`${idPrefix}-post`} label={SPLIT_MODEL_COPY.postLabel} hint={hasHelp ? SPLIT_MODEL_COPY.postHelp : undefined}>
          <MoneyInput
            id={`${idPrefix}-post`}
            value={post}
            onChange={(value) => onPost(value ?? 0)}
            isInvalid={nomina !== undefined && nomina > 0 && post > nomina}
          />
        </FieldShell>
      ) : null}
    </div>
  );
}

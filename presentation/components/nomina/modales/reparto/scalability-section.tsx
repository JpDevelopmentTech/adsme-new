import { SPLIT_MODEL_COPY } from "@/constants/nomina-modales-reparto-copy.constants";
import { SwitchControl } from "@/presentation/components/nomina/modales/campos/switch-control";
import { SplitParamsFields } from "@/presentation/components/nomina/modales/reparto/split-params-fields";
import type { SplitSectionProps } from "@/types/nomina-modales-reparto.types";

/** «¿Aplica Escalabilidad?» con la caja de % de Utilidad y Utilidad por show. */
export function ScalabilitySection({ idPrefix, settings, model, onChange }: SplitSectionProps) {
  return (
    <div className="flex flex-col gap-4">
      <SwitchControl
        id={`${idPrefix}-scalability-switch`}
        label={SPLIT_MODEL_COPY.scalabilityQuestion}
        isChecked={settings.hasScalability}
        onChange={(hasScalability) => onChange({ hasScalability })}
        onLabel={SPLIT_MODEL_COPY.scalabilityOn}
        offLabel={SPLIT_MODEL_COPY.scalabilityOff}
      />
      <div className="rounded-card border border-border bg-surface p-4">
        <SplitParamsFields
          idPrefix={idPrefix}
          hasScalability={settings.hasScalability}
          percent={settings.profitPercent}
          post={settings.profitPerShowAfterMin}
          onPercent={(profitPercent) => onChange({ profitPercent })}
          onPost={(profitPerShowAfterMin) => onChange({ profitPerShowAfterMin })}
          nomina={model?.nomina}
          hasHelp
        />
      </div>
    </div>
  );
}

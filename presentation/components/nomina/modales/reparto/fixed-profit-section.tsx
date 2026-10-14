import { SPLIT_MODEL_COPY } from "@/constants/nomina-modales-reparto-copy.constants";
import { FieldShell } from "@/presentation/components/nomina/modales/campos/field-shell";
import { MoneyInput } from "@/presentation/components/nomina/modales/campos/money-input";
import { SwitchControl } from "@/presentation/components/nomina/modales/campos/switch-control";
import type { SplitSectionProps } from "@/types/nomina-modales-reparto.types";

/** «¿Aplica Utilidad Fija?»: una meta de Utilidad que solo mide, no cambia el reparto. */
export function FixedProfitSection({ idPrefix, settings, onChange }: SplitSectionProps) {
  return (
    <div className="flex flex-col gap-4">
      <SwitchControl
        id={`${idPrefix}-fixed-switch`}
        label={SPLIT_MODEL_COPY.fixedQuestion}
        isChecked={settings.hasFixedProfit}
        onChange={(hasFixedProfit) => onChange({ hasFixedProfit })}
        onLabel={SPLIT_MODEL_COPY.fixedOn}
        offLabel={SPLIT_MODEL_COPY.fixedOff}
      />
      {settings.hasFixedProfit ? (
        <FieldShell
          htmlFor={`${idPrefix}-fixed`}
          label={SPLIT_MODEL_COPY.fixedAmount}
          labelExtra={SPLIT_MODEL_COPY.fixedAmountExtra}
          hint={SPLIT_MODEL_COPY.fixedHelp}
          className="sm:pl-[54px]"
        >
          <MoneyInput
            id={`${idPrefix}-fixed`}
            value={settings.fixedProfit || null}
            placeholder={SPLIT_MODEL_COPY.servicePlaceholder}
            isInvalid={settings.fixedProfit <= 0}
            onChange={(fixedProfit) => onChange({ fixedProfit: fixedProfit ?? 0 })}
          />
        </FieldShell>
      ) : null}
    </div>
  );
}

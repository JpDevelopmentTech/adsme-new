import { SERVICE_PAYER_OPTIONS } from "@/constants/nomina-modales.constants";
import { SPLIT_MODEL_COPY } from "@/constants/nomina-modales-reparto-copy.constants";
import { FieldShell } from "@/presentation/components/nomina/modales/campos/field-shell";
import { MoneyInput } from "@/presentation/components/nomina/modales/campos/money-input";
import { SwitchControl } from "@/presentation/components/nomina/modales/campos/switch-control";
import { SegmentedControl } from "@/presentation/components/ui/segmented-control";
import type { SplitSectionProps } from "@/types/nomina-modales-reparto.types";

/** «¿Aplica Servicio?»: monto (sugerido 2/7 del punto de equilibrio) y quién lo asume. */
export function ServiceSection({ idPrefix, settings, model, onChange }: SplitSectionProps) {
  const isSuggested = settings.service === null;
  const value = isSuggested ? (model?.service ?? null) : settings.service || null;

  return (
    <div className="flex flex-col gap-4">
      <SwitchControl
        id={`${idPrefix}-service-switch`}
        label={SPLIT_MODEL_COPY.serviceQuestion}
        isChecked={settings.hasService}
        onChange={(hasService) => onChange({ hasService })}
        onLabel={SPLIT_MODEL_COPY.serviceOn}
        offLabel={SPLIT_MODEL_COPY.serviceOff}
      />
      {settings.hasService ? (
        <div className="flex flex-col gap-4 sm:pl-[54px]">
          <FieldShell
            htmlFor={`${idPrefix}-service`}
            label={SPLIT_MODEL_COPY.serviceAmount}
            labelExtra={SPLIT_MODEL_COPY.serviceAmountExtra}
            hint={isSuggested && model ? SPLIT_MODEL_COPY.serviceSuggested : undefined}
          >
            <MoneyInput
              id={`${idPrefix}-service`}
              value={value}
              placeholder={SPLIT_MODEL_COPY.servicePlaceholder}
              isInvalid={!isSuggested && !settings.service}
              onChange={(service) => onChange({ service: service ?? 0 })}
            />
          </FieldShell>
          <FieldShell label={SPLIT_MODEL_COPY.payerQuestion} hint={SPLIT_MODEL_COPY.payerHelp[settings.servicePayer]}>
            <div className="w-fit">
              <SegmentedControl
                label={SPLIT_MODEL_COPY.payerQuestion}
                value={settings.servicePayer}
                options={SERVICE_PAYER_OPTIONS}
                onChange={(servicePayer) => onChange({ servicePayer })}
              />
            </div>
          </FieldShell>
        </div>
      ) : null}
    </div>
  );
}

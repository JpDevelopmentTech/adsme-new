"use client";

import { useState } from "react";
import {
  REPORT_SETTINGS_FIELDS,
  STEP_THREE_COPY,
} from "@/constants/report-config.constants";
import { CpvChargeField } from "@/presentation/components/trabajos/wizard/cpv-charge-field";
import { WizardSection } from "@/presentation/components/trabajos/wizard/wizard-section";
import { ToggleSwitch } from "@/presentation/components/ui/toggle-switch";
import type { CpvOptimizationSectionProps } from "@/types/job-wizard.types";
import { formatCpvInput } from "@/utils/format-cpv-input";

/** Interruptor de la optimización de CPV; el importe solo aparece encendido. */
export function CpvOptimizationSection({
  cpvOptimization,
  chargedCpv,
  investment,
  error,
}: CpvOptimizationSectionProps) {
  const [isOn, setIsOn] = useState(cpvOptimization);

  return (
    <WizardSection label={STEP_THREE_COPY.cpvSection}>
      <div className="overflow-hidden rounded-md border border-border bg-card-elevated">
        <ToggleSwitch
          id={REPORT_SETTINGS_FIELDS.cpvOptimization}
          name={REPORT_SETTINGS_FIELDS.cpvOptimization}
          label={STEP_THREE_COPY.cpvToggle}
          description={STEP_THREE_COPY.cpvToggleHint}
          defaultChecked={cpvOptimization}
          onChange={(event) => setIsOn(event.target.checked)}
        />

        {isOn ? (
          <div className="px-[18px] pt-3 pb-4">
            <CpvChargeField
              defaultValue={formatCpvInput(chargedCpv)}
              investment={investment}
              error={error}
            />
          </div>
        ) : null}
      </div>
    </WizardSection>
  );
}

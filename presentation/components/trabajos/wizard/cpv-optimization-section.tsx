"use client";

import { useState } from "react";
import {
  REPORT_SETTINGS_FIELDS,
  STEP_THREE_COPY,
} from "@/constants/report-config.constants";
import { CpvChargeField } from "@/presentation/components/trabajos/wizard/cpv-charge-field";
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
    <section className="flex flex-col gap-1.5 rounded-[18px] border border-border bg-surface px-[22px] py-5">
      <h3 className="text-[11px] font-medium tracking-[1.4px] text-text-muted uppercase">
        {STEP_THREE_COPY.cpvSection}
      </h3>
      <div className="flex flex-col">
        <ToggleSwitch
          id={REPORT_SETTINGS_FIELDS.cpvOptimization}
          name={REPORT_SETTINGS_FIELDS.cpvOptimization}
          label={STEP_THREE_COPY.cpvToggle}
          description={STEP_THREE_COPY.cpvToggleHint}
          defaultChecked={cpvOptimization}
          onChange={(event) => setIsOn(event.target.checked)}
        />

        {isOn ? (
          <div className="pt-2">
            <CpvChargeField
              defaultValue={formatCpvInput(chargedCpv)}
              investment={investment}
              error={error}
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}

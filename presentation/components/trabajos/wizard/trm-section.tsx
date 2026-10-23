"use client";

import { useState } from "react";
import {
  REPORT_SETTINGS_FIELDS,
  STEP_THREE_COPY,
} from "@/constants/report-config.constants";
import { TrmRateField } from "@/presentation/components/trabajos/wizard/trm-rate-field";
import { ToggleSwitch } from "@/presentation/components/ui/toggle-switch";
import type { TrmSectionProps } from "@/types/job-wizard.types";
import { formatTrmInput } from "@/utils/format-trm-input";

/**
 * Interruptor «Agregar TRM». Encendido, el reporte suma a los pesos el gasto
 * en dólares convertido con la tasa de este campo; apagado, los dólares se
 * enseñan aparte. La tasa solo aparece encendido, como el CPV.
 */
export function TrmSection({ usdCopRate, jobSpend, error }: TrmSectionProps) {
  const [isOn, setIsOn] = useState(usdCopRate !== null);

  return (
    <section className="flex flex-col gap-1.5 rounded-[18px] border border-border bg-surface px-[22px] py-5">
      <h3 className="text-[11px] font-medium tracking-[1.4px] text-text-muted uppercase">
        {STEP_THREE_COPY.trmSection}
      </h3>
      <div className="flex flex-col">
        <ToggleSwitch
          id={REPORT_SETTINGS_FIELDS.trmEnabled}
          name={REPORT_SETTINGS_FIELDS.trmEnabled}
          label={STEP_THREE_COPY.trmToggle}
          description={STEP_THREE_COPY.trmToggleHint}
          checked={isOn}
          onChange={(event) => setIsOn(event.target.checked)}
        />

        {isOn ? (
          <div className="pt-2">
            <TrmRateField
              defaultValue={formatTrmInput(usdCopRate)}
              jobSpend={jobSpend}
              error={error}
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}

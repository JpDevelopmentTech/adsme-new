"use client";

import { DEFAULT_PERIOD, PERIOD_COPY, PERIOD_PRESETS } from "@/constants/nomina-period.constants";
import { PeriodPopover } from "@/presentation/components/nomina/period-popover";
import { PeriodTrigger } from "@/presentation/components/nomina/period-trigger";
import { usePopoverDismiss } from "@/presentation/hooks/use-popover-dismiss";
import type { PeriodSelectorProps } from "@/types/nomina-period.types";
import { buildPeriodChips } from "@/utils/build-period-chips";
import { buildPeriodMonthCells } from "@/utils/build-period-month-cells";
import { buildPeriodShortcuts } from "@/utils/build-period-shortcuts";

const ACTIVE = PERIOD_PRESETS.find((item) => item.label === DEFAULT_PERIOD.label)?.preset ?? "";

/**
 * Selector de periodo solo visual (Histórico del perfil): enseña el periodo por
 * defecto, sin filtrar. El de Finanzas es `FinancePeriodSelector`.
 */
export function PeriodSelector({ label, range }: PeriodSelectorProps) {
  const { isOpen, toggle, containerRef } = usePopoverDismiss();

  return (
    <div ref={containerRef} className="relative">
      <PeriodTrigger label={label} range={range} isOpen={isOpen} onClick={toggle} />
      {isOpen ? (
        <div className="absolute top-full right-0 z-30 mt-2">
          <PeriodPopover
            year={DEFAULT_PERIOD.year}
            shortcuts={buildPeriodShortcuts(ACTIVE)}
            chips={buildPeriodChips(DEFAULT_PERIOD.year, "")}
            months={buildPeriodMonthCells(DEFAULT_PERIOD.year, DEFAULT_PERIOD.from, DEFAULT_PERIOD.to, DEFAULT_PERIOD.to)}
            help={PERIOD_COPY.help}
          />
        </div>
      ) : null}
    </div>
  );
}

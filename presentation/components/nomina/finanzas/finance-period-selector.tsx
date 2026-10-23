"use client";

import { FinancePeriodPopover } from "@/presentation/components/nomina/finanzas/finance-period-popover";
import { PeriodTrigger } from "@/presentation/components/nomina/period-trigger";
import { usePopoverDismiss } from "@/presentation/hooks/use-popover-dismiss";
import type { FinancePeriodSelectorProps } from "@/types/nomina-period.types";
import { formatMonthSpan } from "@/utils/format-month-span";
import { formatPeriodSelection } from "@/utils/format-period-selection";

/** Periodo de Finanzas: el botón con lo elegido y el selector que cambia `?periodo=`. */
export function FinancePeriodSelector(props: FinancePeriodSelectorProps) {
  const { isOpen, setIsOpen, toggle, containerRef } = usePopoverDismiss();
  const { selection, fromMonth, toMonth } = props;

  return (
    <div ref={containerRef} className="relative">
      <PeriodTrigger label={formatPeriodSelection(selection, fromMonth, toMonth)} range={formatMonthSpan(fromMonth, toMonth)} isOpen={isOpen} onClick={toggle} />
      {isOpen ? (
        <div className="absolute top-full right-0 z-30 mt-2">
          <FinancePeriodPopover {...props} onPicked={() => setIsOpen(false)} />
        </div>
      ) : null}
    </div>
  );
}

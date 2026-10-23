"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { PERIOD_COPY } from "@/constants/nomina-period.constants";
import type { FinancePeriodPickerInput, PeriodPopoverProps } from "@/types/nomina-period.types";
import { buildPeriodChips } from "@/utils/build-period-chips";
import { buildPeriodMonthCells } from "@/utils/build-period-month-cells";
import { buildPeriodShortcuts } from "@/utils/build-period-shortcuts";
import { financeHref } from "@/utils/finance-href";
import { formatMonthLong } from "@/utils/format-nomina-dates";
import { serializeFinancePeriod } from "@/utils/serialize-finance-period";

/**
 * Estado del selector de periodo de Finanzas, como el original: atajos,
 * trimestres y año del año visible, y un rango propio con dos clics (el
 * primero fija el ancla y el cursor previsualiza el resto). Elegir navega.
 */
export function useFinancePeriodPicker({ selection, tab, fromMonth, toMonth, currentMonth, onPicked }: FinancePeriodPickerInput): PeriodPopoverProps {
  const router = useRouter();
  const [year, setYear] = useState(() => Number(currentMonth.slice(0, 4)));
  const [anchor, setAnchor] = useState<string | null>(null);
  const [hover, setHover] = useState<string | null>(null);
  const active = serializeFinancePeriod(selection);

  const pick = (period: string) => {
    setAnchor(null);
    setHover(null);
    onPicked();
    router.push(financeHref(tab, period), { scroll: false });
  };

  const pickMonth = (month: string) => {
    if (!anchor) {
      setAnchor(month);
      return;
    }
    const [from, to] = [anchor, month].sort();
    pick(`${from}_${to}`);
  };

  const preview = anchor ? [anchor, hover ?? anchor].sort() : [fromMonth, toMonth];

  return {
    year,
    shortcuts: buildPeriodShortcuts(active),
    chips: buildPeriodChips(year, active),
    months: buildPeriodMonthCells(year, preview[0], preview[1], currentMonth),
    help: anchor ? PERIOD_COPY.anchorHelp(formatMonthLong(anchor)) : PERIOD_COPY.help,
    onShortcut: pick,
    onChip: pick,
    onMonth: pickMonth,
    onMonthHover: (month) => setHover(anchor ? month : null),
    onYearChange: (delta) => setYear((current) => current + delta),
  };
}

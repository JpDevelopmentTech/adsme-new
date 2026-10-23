import { PERIOD_PRESETS } from "@/constants/nomina-period.constants";
import type { PeriodChoice } from "@/types/nomina-period.types";

/** Atajos del selector con el elegido marcado (`active` es el valor de `?periodo=`). */
export function buildPeriodShortcuts(active: string): PeriodChoice[] {
  return PERIOD_PRESETS.map((item) => ({ id: item.preset, label: item.label, isActive: item.preset === active }));
}

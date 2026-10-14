import { PROFIT_LEVEL_META } from "@/constants/nomina-profit.constants";
import type { ProfitLevelBadgeProps } from "@/types/nomina-ui.types";

/** Veredicto de rentabilidad en una píldora tintada de su color. */
export function ProfitLevelBadge({ level }: ProfitLevelBadgeProps) {
  const meta = PROFIT_LEVEL_META[level];

  return (
    <span
      className="inline-flex rounded-pill px-2.5 py-1 text-xs font-normal whitespace-nowrap"
      style={{ color: meta.color, backgroundColor: `${meta.color}24` }}
    >
      {meta.label}
    </span>
  );
}

import { PROFIT_BAR_MAX } from "@/constants/nomina.constants";
import { PROFIT_LEVEL_META } from "@/constants/nomina-profit.constants";
import type { ProfitMarginBarProps } from "@/types/nomina-finanzas-props.types";
import { formatOptionalPercent } from "@/utils/format-optional-percent";

/** Mini barra de la rentabilidad neta en la escala de 0 a 30 %, con la cifra al lado. */
export function ProfitMarginBar({ margin, level }: ProfitMarginBarProps) {
  const color = PROFIT_LEVEL_META[level].color;
  const width = Math.min(Math.max(margin ?? 0, 0), PROFIT_BAR_MAX) / PROFIT_BAR_MAX;

  return (
    <span className="flex items-center gap-2.5">
      <span aria-hidden className="h-1.5 w-[54px] overflow-hidden rounded-pill bg-surface">
        <span className="block h-full rounded-pill" style={{ width: `${width * 100}%`, backgroundColor: color }} />
      </span>
      <span className="font-normal" style={{ color }}>
        {formatOptionalPercent(margin)}
      </span>
    </span>
  );
}

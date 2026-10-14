import { PROFIT_BAR_MAX } from "@/constants/nomina.constants";
import { PROFIT_BAR_ZONES } from "@/constants/nomina-profit.constants";
import type { ProfitBarProps } from "@/types/nomina-perfil.types";
import { formatPercent } from "@/utils/format-percent";

/**
 * Barra de rentabilidad de 0 a 30 %: cuatro zonas de color y un marcador en el
 * margen del artista, con la cifra al lado en el color de su nivel.
 */
export function ProfitBar({ margin, color }: ProfitBarProps) {
  const position = (Math.min(Math.max(margin, 0), PROFIT_BAR_MAX) / PROFIT_BAR_MAX) * 100;

  return (
    <div className="flex items-center gap-2.5">
      <div className="relative flex h-1.5 flex-1 gap-0.5">
        {PROFIT_BAR_ZONES.map((zone) => (
          <span key={zone.from} className="h-full rounded-pill" style={{ flexGrow: zone.to - zone.from, backgroundColor: zone.color }} />
        ))}
        <span
          aria-hidden
          className="absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-pill border-2 border-[#140b28] bg-white"
          style={{ left: `${position}%` }}
        />
      </div>
      <span className="text-[13px] font-normal tabular-nums" style={{ color }}>
        {formatPercent(margin)}
      </span>
    </div>
  );
}

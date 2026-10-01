import { PLATFORM_ORDER } from "@/constants/platform-labels.constants";
import { PLATFORM_META } from "@/constants/platforms.constants";
import type { GrowthLegendProps } from "@/types/report.types";
import { formatCompactNumber } from "@/utils/format-compact-number";

/**
 * La leyenda lleva el total de cada plataforma: el color dice cuál es la curva
 * y la cifra dice cuánto puso, sin tener que medirla a ojo.
 */
export function GrowthLegend({ totals }: GrowthLegendProps) {
  return (
    <ul className="flex flex-wrap items-center gap-4 pt-1.5">
      {PLATFORM_ORDER.filter((platform) => totals[platform] > 0).map((platform) => (
        <li key={platform} className="flex items-center gap-[7px] text-[13px] text-text-secondary">
          <span
            aria-hidden
            className="size-2 rounded-pill"
            style={{ backgroundColor: PLATFORM_META[platform].chartColor }}
          />
          {PLATFORM_META[platform].label} · {formatCompactNumber(totals[platform])}
        </li>
      ))}
    </ul>
  );
}

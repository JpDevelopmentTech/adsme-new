import { DASHBOARD_COPY } from "@/constants/dashboard.constants";
import { PLATFORM_ORDER } from "@/constants/platform-labels.constants";
import {
  PLATFORM_META,
  UNASSIGNED_CHART_COLOR,
} from "@/constants/platforms.constants";
import type { SpendLegendProps } from "@/types/dashboard-home.types";

/** Leyenda de la gráfica: el color de cada plataforma y el trazo de lo previsto. */
export function SpendLegend({ hasUnassigned }: SpendLegendProps) {
  const entries = [
    ...PLATFORM_ORDER.map((platform) => ({
      key: platform as string,
      label: PLATFORM_META[platform].label,
      color: PLATFORM_META[platform].chartColor,
    })),
    ...(hasUnassigned
      ? [{ key: "unassigned", label: DASHBOARD_COPY.unassigned, color: UNASSIGNED_CHART_COLOR }]
      : []),
  ];

  return (
    <ul className="flex flex-wrap items-center gap-3.5 text-xs font-normal text-text-secondary">
      {entries.map((entry) => (
        <li key={entry.key} className="flex items-center gap-1.5">
          <span
            aria-hidden
            className="size-2 shrink-0 rounded-pill"
            style={{ backgroundColor: entry.color }}
          />
          {entry.label}
        </li>
      ))}
      <li className="flex items-center gap-1.5">
        <span aria-hidden className="flex gap-[3px]">
          {[0, 1, 2].map((dash) => (
            <span key={dash} className="h-0.5 w-[5px] rounded-[1px] bg-text-secondary" />
          ))}
        </span>
        {DASHBOARD_COPY.forecast}
      </li>
    </ul>
  );
}

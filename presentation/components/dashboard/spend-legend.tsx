import { DASHBOARD_COPY } from "@/constants/dashboard.constants";
import { PLATFORM_ORDER } from "@/constants/platform-labels.constants";
import {
  PLATFORM_META,
  UNASSIGNED_CHART_COLOR,
} from "@/constants/platforms.constants";
import type { SpendLegendProps } from "@/types/dashboard-home.types";

/** Leyenda de la gráfica, con el color de las barras. */
export function SpendLegend({ hasUnassigned }: SpendLegendProps) {
  const entries = [
    ...PLATFORM_ORDER.map((platform) => ({
      key: platform as string,
      label: PLATFORM_META[platform].label,
      color: PLATFORM_META[platform].chartColor,
    })),
    ...(hasUnassigned
      ? [
          {
            key: "unassigned",
            label: DASHBOARD_COPY.unassigned,
            color: UNASSIGNED_CHART_COLOR,
          },
        ]
      : []),
  ];

  return (
    <ul className="flex flex-wrap items-center gap-3.5">
      {entries.map((entry) => (
        <li
          key={entry.key}
          className="flex items-center gap-[6px] text-[11px] text-text-secondary"
        >
          <span
            aria-hidden
            className="size-[7px] shrink-0 rounded-pill"
            style={{ backgroundColor: entry.color }}
          />
          {entry.label}
        </li>
      ))}
    </ul>
  );
}

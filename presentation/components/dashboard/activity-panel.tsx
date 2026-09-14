import { CircleCheck, Disc3, UserPlus } from "lucide-react";
import { DASHBOARD_COPY } from "@/constants/dashboard.constants";
import { PanelCard } from "@/presentation/components/dashboard/panel-card";
import type { ActivityKind } from "@/domain/entities/dashboard";
import type { ActivityPanelProps } from "@/types/dashboard-home.types";
import { formatRelativeTime } from "@/utils/format-relative-time";

const ICONS: Record<ActivityKind, typeof UserPlus> = {
  "client-created": UserPlus,
  "job-created": Disc3,
  "job-updated": CircleCheck,
};

/** Actividad derivada de las altas y modificaciones reales. */
export function ActivityPanel({ items, now }: ActivityPanelProps) {
  return (
    <PanelCard
      title={DASHBOARD_COPY.activity}
      isEmpty={items.length === 0}
      emptyText={DASHBOARD_COPY.noActivity}
    >
      <ul>
        {items.map((item) => {
          const Icon = ICONS[item.kind];

          return (
            <li
              key={item.id}
              className="flex items-center gap-3.5 border-b border-border px-5 py-3.5 last:border-b-0"
            >
              <span className="grid size-8 shrink-0 place-items-center rounded-pill bg-card-elevated">
                <Icon size={16} className="text-brand-violet" aria-hidden />
              </span>
              <p className="min-w-0 flex-1 truncate text-[13px] text-text-secondary">
                {item.text}
              </p>
              <span className="shrink-0 text-xs whitespace-nowrap text-text-muted">
                {formatRelativeTime(item.at, now)}
              </span>
            </li>
          );
        })}
      </ul>
    </PanelCard>
  );
}

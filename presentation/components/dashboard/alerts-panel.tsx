import type { LucideIcon } from "lucide-react";
import {
  BellRing,
  CalendarClock,
  ChevronRight,
  KeyRound,
  Link2Off,
  Unlink,
  Unplug,
} from "lucide-react";
import Link from "next/link";
import { DASHBOARD_COPY } from "@/constants/dashboard.constants";
import type { AlertKind } from "@/domain/entities/dashboard";
import { PanelCard } from "@/presentation/components/dashboard/panel-card";
import type { AlertsPanelProps } from "@/types/dashboard-home.types";

const ALERT_STYLES: Record<
  AlertKind,
  { Icon: LucideIcon; chip: string; icon: string }
> = {
  overdue: { Icon: CalendarClock, chip: "bg-warning/10", icon: "text-warning" },
  "no-platforms": { Icon: Unlink, chip: "bg-danger/10", icon: "text-danger" },
  disconnected: { Icon: Unplug, chip: "bg-danger/10", icon: "text-danger" },
  "token-expiring": { Icon: KeyRound, chip: "bg-warning/10", icon: "text-warning" },
  "no-report-link": {
    Icon: Link2Off,
    chip: "bg-brand-violet/10",
    icon: "text-brand-violet",
  },
};

/**
 * Todo lo que exige una decisión hoy: trabajos vencidos o sin pauta, conexiones
 * caídas o a punto de caducar, y reportes que el cliente todavía no puede ver.
 */
export function AlertsPanel({ alerts }: AlertsPanelProps) {
  return (
    <PanelCard
      title={DASHBOARD_COPY.alerts}
      icon={<BellRing size={17} className="text-warning" aria-hidden />}
      count={alerts.length}
      isEmpty={alerts.length === 0}
      emptyText={DASHBOARD_COPY.noAlerts}
    >
      <ul>
        {alerts.map((alert) => {
          const { Icon, chip, icon } = ALERT_STYLES[alert.kind];

          return (
            <li key={alert.id} className="border-b border-border last:border-b-0">
              <Link
                href={alert.href}
                className="flex items-center gap-3.5 px-5 py-3 transition-colors hover:bg-card-elevated"
              >
                <span
                  className={`grid size-[34px] shrink-0 place-items-center rounded-sm ${chip}`}
                >
                  <Icon size={17} className={icon} aria-hidden />
                </span>

                <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <span className="truncate text-[13px] font-semibold text-text-primary">
                    {alert.title}
                  </span>
                  <span className="truncate text-xs text-text-secondary">
                    {alert.detail}
                  </span>
                </span>

                <ChevronRight size={16} className="shrink-0 text-text-muted" aria-hidden />
              </Link>
            </li>
          );
        })}
      </ul>
    </PanelCard>
  );
}

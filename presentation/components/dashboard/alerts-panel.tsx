import type { LucideIcon } from "lucide-react";
import {
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

/** Cada tipo de alerta con su icono; el tono lo da la estructura, no el color. */
const ALERT_ICONS: Record<AlertKind, LucideIcon> = {
  overdue: CalendarClock,
  "no-platforms": Unlink,
  disconnected: Unplug,
  "token-expiring": KeyRound,
  "no-report-link": Link2Off,
};

/**
 * Todo lo que exige una decisión hoy: trabajos vencidos o sin pauta, conexiones
 * caídas o a punto de caducar, y reportes que el cliente todavía no puede ver.
 */
export function AlertsPanel({ alerts }: AlertsPanelProps) {
  return (
    <PanelCard
      title={DASHBOARD_COPY.alerts}
      subtitle={DASHBOARD_COPY.alertsSubtitle}
      count={alerts.length}
      isEmpty={alerts.length === 0}
      emptyText={DASHBOARD_COPY.noAlerts}
    >
      <ul>
        {alerts.map((alert) => {
          const Icon = ALERT_ICONS[alert.kind];

          return (
            <li key={alert.id} className="border-b border-border last:border-b-0">
              <Link
                href={alert.href}
                className="flex items-center gap-3 px-5 py-[13px] transition-colors duration-100 hover:bg-g-100"
              >
                <span className="glass-field grid size-[30px] shrink-0 place-items-center rounded-md">
                  <Icon size={15} strokeWidth={1.5} className="text-text-secondary" aria-hidden />
                </span>

                <span className="flex min-w-0 flex-1 flex-col gap-px">
                  <span className="truncate text-[12.5px] font-normal text-text-primary">
                    {alert.title}
                  </span>
                  <span className="truncate text-[11px] text-text-muted">
                    {alert.detail}
                  </span>
                </span>

                <ChevronRight
                  size={14}
                  strokeWidth={1.5}
                  className="shrink-0 text-g-500"
                  aria-hidden
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </PanelCard>
  );
}

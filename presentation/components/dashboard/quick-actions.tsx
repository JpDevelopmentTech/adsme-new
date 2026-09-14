import { Disc3, Plus, UserPlus, Users } from "lucide-react";
import Link from "next/link";
import {
  DASHBOARD_COPY,
  KPI_TONES,
  QUICK_ACTIONS,
} from "@/constants/dashboard.constants";
import { cn } from "@/utils/cn";

const ICONS = [Plus, UserPlus, Disc3, Users];

/** Cuadrícula de accesos directos a las acciones más frecuentes. */
export function QuickActions() {
  return (
    <section className="flex flex-col gap-3.5 rounded-card border border-border bg-card p-5">
      <h2 className="font-display text-base font-semibold text-text-primary">
        {DASHBOARD_COPY.quickActions}
      </h2>

      <div className="grid grid-cols-2 gap-3.5">
        {QUICK_ACTIONS.map((action, index) => {
          const Icon = ICONS[index];
          const palette = KPI_TONES[action.tone];

          return (
            <Link
              key={action.href}
              href={action.href}
              className="flex flex-col gap-3 rounded-md border border-border bg-card-elevated p-4 transition-colors hover:border-brand-violet/60"
            >
              <span
                className={cn(
                  "grid size-[38px] place-items-center rounded-sm",
                  palette.chip,
                  palette.icon,
                )}
              >
                <Icon size={19} aria-hidden />
              </span>
              <span className="text-[13px] font-semibold text-text-primary">
                {action.label}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

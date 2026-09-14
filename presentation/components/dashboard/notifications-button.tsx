import { Bell } from "lucide-react";
import { TOPBAR_COPY } from "@/constants/dashboard-copy.constants";

/** Acceso a notificaciones con el indicador de pendientes del diseño. */
export function NotificationsButton() {
  return (
    <button
      type="button"
      aria-label={TOPBAR_COPY.notifications}
      className="relative grid size-[42px] shrink-0 cursor-pointer place-items-center rounded-md border border-border bg-card transition-colors hover:border-border-strong"
    >
      <Bell size={19} strokeWidth={1.75} className="text-text-secondary" aria-hidden />
      <span
        aria-hidden
        className="absolute top-[9px] right-[9px] size-[9px] rounded-full border-2 border-canvas bg-brand-magenta"
      />
    </button>
  );
}

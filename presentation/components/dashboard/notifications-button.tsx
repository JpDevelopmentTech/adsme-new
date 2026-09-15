import { Bell } from "lucide-react";
import { TOPBAR_COPY } from "@/constants/dashboard-copy.constants";

/** Acceso a notificaciones con el indicador de pendientes del diseño. */
export function NotificationsButton() {
  return (
    <button
      type="button"
      aria-label={TOPBAR_COPY.notifications}
      className="glass-field relative grid size-[38px] shrink-0 cursor-pointer place-items-center rounded-md transition-colors duration-150 hover:border-border-strong focus-visible:ring-2 focus-visible:ring-ink/40 focus-visible:outline-none"
    >
      <Bell size={17} strokeWidth={1.5} className="text-text-secondary" aria-hidden />
      <span
        aria-hidden
        className="absolute top-[6px] right-[6px] size-[7px] rounded-pill bg-accent"
      />
    </button>
  );
}

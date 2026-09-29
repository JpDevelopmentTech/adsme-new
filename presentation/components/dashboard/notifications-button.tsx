import { Bell } from "lucide-react";
import { TOPBAR_COPY } from "@/constants/dashboard-copy.constants";

/** Acceso a notificaciones con el indicador de pendientes del diseño. */
export function NotificationsButton() {
  return (
    <button
      type="button"
      aria-label={TOPBAR_COPY.notifications}
      className="relative grid size-[38px] border border-border bg-card shrink-0 cursor-pointer place-items-center rounded-md transition-colors duration-150 hover:bg-g-100 focus-visible:ring-2 focus-visible:ring-ink/30 focus-visible:outline-none"
    >
      <Bell size={17} strokeWidth={1.5} className="text-text-secondary" aria-hidden />
      <span
        aria-hidden
        className="absolute top-[7px] right-[7px] size-[6px] rounded-pill bg-ink"
      />
    </button>
  );
}

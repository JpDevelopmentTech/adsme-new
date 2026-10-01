import { Bell } from "lucide-react";
import { TOPBAR_COPY } from "@/constants/dashboard-copy.constants";

/** Acceso a notificaciones con el indicador lila de pendientes del diseño. */
export function NotificationsButton() {
  return (
    <button
      type="button"
      aria-label={TOPBAR_COPY.notifications}
      className="relative grid size-[42px] shrink-0 cursor-pointer place-items-center rounded-pill border border-border bg-surface transition-colors duration-150 hover:bg-g-100 focus-visible:ring-2 focus-visible:ring-lilac focus-visible:outline-none"
    >
      <Bell size={18} strokeWidth={1.5} className="text-text-primary" aria-hidden />
      <span
        aria-hidden
        className="absolute top-[9px] right-[7px] size-2 rounded-pill border-2 border-[#1a1030] bg-lilac"
      />
    </button>
  );
}

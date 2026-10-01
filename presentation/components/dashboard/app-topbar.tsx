import { Plus } from "lucide-react";
import { TOPBAR_COPY } from "@/constants/dashboard-copy.constants";
import { NEW_JOB_ROUTE } from "@/constants/routes.constants";
import { NotificationsButton } from "@/presentation/components/dashboard/notifications-button";
import { TopbarSearch } from "@/presentation/components/dashboard/topbar-search";
import { TopbarTitle } from "@/presentation/components/dashboard/topbar-title";
import { PrimaryLink } from "@/presentation/components/ui/primary-link";

/**
 * Cabecera del panel: el título de la sección a la izquierda y, a la derecha,
 * el buscador, las notificaciones y la acción principal en píldora blanca.
 */
export function AppTopbar() {
  return (
    <header className="flex shrink-0 items-center gap-3">
      <TopbarTitle />

      <div className="flex-1" />

      <div className="hidden md:flex">
        <TopbarSearch />
      </div>

      <NotificationsButton />

      <PrimaryLink href={NEW_JOB_ROUTE} className="hidden sm:flex">
        <Plus size={16} strokeWidth={1.75} aria-hidden />
        {TOPBAR_COPY.newJob}
      </PrimaryLink>
    </header>
  );
}

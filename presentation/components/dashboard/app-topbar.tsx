import { Plus } from "lucide-react";
import { TOPBAR_COPY } from "@/constants/dashboard-copy.constants";
import { NEW_JOB_ROUTE } from "@/constants/routes.constants";
import { NotificationsButton } from "@/presentation/components/dashboard/notifications-button";
import { TopbarSearch } from "@/presentation/components/dashboard/topbar-search";
import { TopbarTitle } from "@/presentation/components/dashboard/topbar-title";
import { PrimaryLink } from "@/presentation/components/ui/primary-link";

/**
 * Cabecera del panel. Ya no es una franja: es la primera línea del contenido,
 * con el título de la pantalla a la izquierda y las acciones a la derecha.
 */
export function AppTopbar() {
  return (
    <header className="flex shrink-0 items-center gap-3 pt-7 pb-6">
      <TopbarTitle />

      <div className="flex-1" />

      <div className="hidden items-center gap-4 md:flex">
        <TopbarSearch />
      </div>

      <PrimaryLink href={NEW_JOB_ROUTE} className="hidden sm:flex">
        <Plus size={15} strokeWidth={1.75} aria-hidden />
        {TOPBAR_COPY.newJob}
      </PrimaryLink>

      <NotificationsButton />
    </header>
  );
}

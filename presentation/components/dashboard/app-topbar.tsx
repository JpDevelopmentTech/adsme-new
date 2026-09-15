import { Plus } from "lucide-react";
import { TOPBAR_COPY } from "@/constants/dashboard-copy.constants";
import { NEW_JOB_ROUTE } from "@/constants/routes.constants";
import { NotificationsButton } from "@/presentation/components/dashboard/notifications-button";
import { TopbarSearch } from "@/presentation/components/dashboard/topbar-search";
import { TopbarTitle } from "@/presentation/components/dashboard/topbar-title";
import { PrimaryLink } from "@/presentation/components/ui/primary-link";

/**
 * Barra superior del panel. Absorbe el título de la pantalla, de modo que el
 * contenido empieza en el primer dato y no en una segunda cabecera repetida.
 */
export function AppTopbar() {
  return (
    <header className="glass-panel flex h-16 shrink-0 items-center gap-4 rounded-card px-[18px]">
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

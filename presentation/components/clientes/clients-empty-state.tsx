import { UserPlus, Users } from "lucide-react";
import { CLIENTS_EMPTY_COPY } from "@/constants/clients.constants";
import { NEW_CLIENT_ROUTE } from "@/constants/routes.constants";
import { EmptyStatePanel } from "@/presentation/components/ui/empty-state-panel";
import { PrimaryLink } from "@/presentation/components/ui/primary-link";

/** Estado vacío del listado: todavía no hay ningún cliente. */
export function ClientsEmptyState() {
  return (
    <EmptyStatePanel
      isStandalone
      icon={<Users size={24} strokeWidth={1.5} aria-hidden />}
      title={CLIENTS_EMPTY_COPY.title}
      description={CLIENTS_EMPTY_COPY.subtitle}
      action={
        <PrimaryLink href={NEW_CLIENT_ROUTE}>
          <UserPlus size={16} strokeWidth={1.75} aria-hidden />
          {CLIENTS_EMPTY_COPY.action}
        </PrimaryLink>
      }
    />
  );
}

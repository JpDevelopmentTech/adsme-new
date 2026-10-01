import { ArrowLeft, UserX } from "lucide-react";
import { CLIENT_DETAIL_COPY } from "@/constants/client-detail.constants";
import { CLIENTS_ROUTE } from "@/constants/routes.constants";
import { EmptyStatePanel } from "@/presentation/components/ui/empty-state-panel";
import { SecondaryLink } from "@/presentation/components/ui/secondary-link";

/** Pantalla mostrada cuando la ruta apunta a un cliente que no existe. */
export function ClientNotFound() {
  return (
    <EmptyStatePanel
      isStandalone
      icon={<UserX size={24} strokeWidth={1.5} aria-hidden />}
      title={CLIENT_DETAIL_COPY.notFoundTitle}
      description={CLIENT_DETAIL_COPY.notFoundHint}
      action={
        <SecondaryLink href={CLIENTS_ROUTE}>
          <ArrowLeft size={16} strokeWidth={1.5} aria-hidden />
          {CLIENT_DETAIL_COPY.backToClientsAction}
        </SecondaryLink>
      }
    />
  );
}

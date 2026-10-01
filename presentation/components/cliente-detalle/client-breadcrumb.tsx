import { CLIENT_DETAIL_COPY } from "@/constants/client-detail.constants";
import { CLIENTS_ROUTE } from "@/constants/routes.constants";
import { Breadcrumb } from "@/presentation/components/ui/breadcrumb";
import type { ClientBreadcrumbProps } from "@/types/client-detail.types";

/** Migas de la ficha: vuelta a Clientes y el nombre del cliente actual. */
export function ClientBreadcrumb({ clientName }: ClientBreadcrumbProps) {
  return (
    <Breadcrumb backHref={CLIENTS_ROUTE} backLabel={CLIENT_DETAIL_COPY.backToClients} current={clientName} />
  );
}

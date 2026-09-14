import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { CLIENT_DETAIL_COPY } from "@/constants/client-detail.constants";
import { CLIENTS_ROUTE } from "@/constants/routes.constants";
import type { ClientBreadcrumbProps } from "@/types/client-detail.types";

/** Enlace de vuelta al listado con la ruta actual, como en la cabecera de `B3`. */
export function ClientBreadcrumb({ clientName }: ClientBreadcrumbProps) {
  return (
    <Link
      href={CLIENTS_ROUTE}
      className="flex w-fit items-center gap-[7px] text-[13px] font-medium text-text-secondary transition-colors hover:text-text-primary focus-visible:ring-2 focus-visible:ring-brand-violet/60 focus-visible:outline-none"
    >
      <ArrowLeft size={16} aria-hidden />
      {CLIENT_DETAIL_COPY.backToClients} / {clientName}
    </Link>
  );
}

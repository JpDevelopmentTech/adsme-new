import { UserX } from "lucide-react";
import Link from "next/link";
import { CLIENT_DETAIL_COPY } from "@/constants/client-detail.constants";
import { CLIENTS_ROUTE } from "@/constants/routes.constants";

/** Pantalla mostrada cuando la ruta apunta a un cliente que no existe. */
export function ClientNotFound() {
  return (
    <div className="flex flex-col items-center gap-3 rounded-card border border-dashed border-border bg-surface px-8 py-16 text-center">
      <UserX size={22} className="text-text-muted" aria-hidden />

      <p className="font-display text-base font-semibold text-text-primary">
        {CLIENT_DETAIL_COPY.notFoundTitle}
      </p>
      <p className="text-[13px] text-text-muted">
        {CLIENT_DETAIL_COPY.notFoundHint}
      </p>

      <Link
        href={CLIENTS_ROUTE}
        className="mt-1 rounded-sm text-[13px] font-semibold text-brand-violet transition-colors hover:text-brand-magenta focus-visible:ring-2 focus-visible:ring-brand-violet/60 focus-visible:outline-none"
      >
        {CLIENT_DETAIL_COPY.backToClientsAction}
      </Link>
    </div>
  );
}

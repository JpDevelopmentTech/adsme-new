import { Pencil, Plus } from "lucide-react";
import { CLIENT_DETAIL_COPY } from "@/constants/client-detail.constants";
import { CLIENT_STATUS_BADGE } from "@/constants/clients.constants";
import { editClientRoute, NEW_JOB_ROUTE } from "@/constants/routes.constants";
import { ClientContactList } from "@/presentation/components/cliente-detalle/client-contact-list";
import { Avatar } from "@/presentation/components/ui/avatar";
import { PrimaryLink } from "@/presentation/components/ui/primary-link";
import { SecondaryLink } from "@/presentation/components/ui/secondary-link";
import { StatusBadge } from "@/presentation/components/ui/status-badge";
import type { ClientHeroProps } from "@/types/client-detail.types";

/** Cabecera de la ficha: foto grande, nombre, estado, contacto y acciones. */
export function ClientHero({ client }: ClientHeroProps) {
  const status = CLIENT_STATUS_BADGE[client.status];

  return (
    <section className="flex flex-col gap-7 sm:flex-row sm:items-center">
      <div className="shrink-0 overflow-hidden rounded-[36px] border border-white/20 shadow-[0_20px_50px_#05010f99]">
        <Avatar
          initials={client.initials}
          size={148}
          fontSize={44}
          shape="rounded"
          gradient={client.gradient}
          imageUrl={client.avatarUrl}
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="text-[11px] font-medium tracking-[1.4px] text-lilac uppercase">
            {client.kind} · {client.genre}
          </span>
          <StatusBadge label={status.label} tone={status.tone} />

          <div className="ml-auto flex items-center gap-2.5">
            <SecondaryLink href={editClientRoute(client.id)}>
              <Pencil size={16} strokeWidth={1.5} aria-hidden />
              {CLIENT_DETAIL_COPY.edit}
            </SecondaryLink>
            <PrimaryLink href={NEW_JOB_ROUTE}>
              <Plus size={16} strokeWidth={1.75} aria-hidden />
              {CLIENT_DETAIL_COPY.newJob}
            </PrimaryLink>
          </div>
        </div>

        <h1 className="text-[52px] leading-none font-extralight tracking-[-1.5px] text-text-primary">
          {client.name}
        </h1>

        <ClientContactList client={client} />
      </div>
    </section>
  );
}

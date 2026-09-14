import { Pencil, Plus } from "lucide-react";
import { CLIENT_DETAIL_COPY } from "@/constants/client-detail.constants";
import { CLIENT_STATUS_BADGE } from "@/constants/clients.constants";
import { editClientRoute, NEW_JOB_ROUTE } from "@/constants/routes.constants";
import { ClientContactList } from "@/presentation/components/cliente-detalle/client-contact-list";
import { Avatar } from "@/presentation/components/ui/avatar";
import { PrimaryLink } from "@/presentation/components/ui/primary-link";
import { SecondaryLink } from "@/presentation/components/ui/secondary-link";
import { StatusBadge } from "@/presentation/components/ui/status-badge";
import { TagPill } from "@/presentation/components/ui/tag-pill";
import type { ClientHeroProps } from "@/types/client-detail.types";

/** Cabecera del detalle: identidad, estado, contacto y acciones sobre el cliente. */
export function ClientHero({ client }: ClientHeroProps) {
  const status = CLIENT_STATUS_BADGE[client.status];

  return (
    <section className="flex flex-wrap items-center gap-[22px] rounded-card border border-border bg-card p-6">
      <Avatar
        initials={client.initials}
        size={92}
        fontSize={30}
        shape="rounded"
        gradient={client.gradient}
        imageUrl={client.avatarUrl}
      />

      <div className="flex min-w-0 flex-1 flex-col gap-2.5">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="font-display text-[26px] font-bold text-text-primary">
            {client.name}
          </h1>
          <StatusBadge label={status.label} tone={status.tone} />
          <TagPill label={`${client.kind} · ${client.genre}`} />
        </div>

        <ClientContactList client={client} />
      </div>

      <div className="flex items-center gap-2.5">
        <SecondaryLink href={editClientRoute(client.id)}>
          <Pencil size={18} strokeWidth={2} aria-hidden />
          {CLIENT_DETAIL_COPY.edit}
        </SecondaryLink>

        <PrimaryLink href={NEW_JOB_ROUTE}>
          <Plus size={18} strokeWidth={2} aria-hidden />
          {CLIENT_DETAIL_COPY.newJob}
        </PrimaryLink>
      </div>
    </section>
  );
}

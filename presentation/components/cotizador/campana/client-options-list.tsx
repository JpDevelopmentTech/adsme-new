"use client";

import { CAMPAIGN_COPY } from "@/constants/quote-campaign-copy.constants";
import { ClientOption } from "@/presentation/components/cotizador/campana/client-option";
import { FloatingPanel } from "@/presentation/components/ui/floating-panel";
import type { ClientOptionsListProps } from "@/types/quote-campaign.types";

/** Desplegable «Clientes guardados» del artista. No roba el foco al input. */
export function ClientOptionsList({ listId, clients, activeIndex, optionId, onHover, onPick, onLoad }: ClientOptionsListProps) {
  return (
    <FloatingPanel className="left-0 max-h-80 overflow-y-auto">
      <div onMouseDown={(event) => event.preventDefault()}>
        <p id={`${listId}-title`} className="px-3 pt-1 pb-2 text-[11px] tracking-[1.4px] text-text-muted uppercase">
          {CAMPAIGN_COPY.artist.listTitle}
        </p>
        <ul id={listId} role="listbox" aria-labelledby={`${listId}-title`} className="flex flex-col gap-0.5">
          {clients.map((client, index) => (
            <ClientOption
              key={client.slug}
              id={optionId(index)}
              client={client}
              isActive={index === activeIndex}
              onHover={() => onHover(index)}
              onPick={() => onPick(client)}
              onLoad={() => onLoad(client)}
            />
          ))}
        </ul>
      </div>
    </FloatingPanel>
  );
}

"use client";

import { useId } from "react";
import { QUOTE_DOM_IDS } from "@/constants/quote-dom.constants";
import { CAMPAIGN_COPY } from "@/constants/quote-campaign-copy.constants";
import { CampaignFieldGroup } from "@/presentation/components/cotizador/campana/campaign-field-group";
import { ClientOptionsList } from "@/presentation/components/cotizador/campana/client-options-list";
import { ClientStatePill } from "@/presentation/components/cotizador/campana/client-state-pill";
import { useQuote } from "@/presentation/hooks/use-quote";
import { useQuoteCombobox } from "@/presentation/hooks/use-quote-combobox";
import type { QuoteStoredClient } from "@/types/quote-store.types";
import { filterQuoteClients } from "@/utils/filter-quote-clients";

/**
 * «Artista / Cliente»: input grande que también busca entre los clientes
 * guardados. Elegir una fila pone el nombre; «Cargar» trae su cotización.
 */
export function ArtistField() {
  const { state, dispatch } = useQuote();
  const inputId = QUOTE_DOM_IDS.artistInput;
  const listId = useId();
  const clients = filterQuoteClients(state.clients, state.draft.artist);

  const pick = (client: QuoteStoredClient) => {
    dispatch({ type: "set", patch: { artist: client.name } });
    combobox.setIsOpen(false);
  };
  const load = (client: QuoteStoredClient) => {
    dispatch({ type: "loadClient", slug: client.slug });
    combobox.setIsOpen(false);
  };
  const combobox = useQuoteCombobox(clients, { onPick: pick });
  const isExpanded = combobox.isOpen && clients.length > 0;
  const optionId = (index: number) => `${listId}-${index}`;

  return (
    <CampaignFieldGroup label={CAMPAIGN_COPY.artist.label} labelFor={inputId} aside={<ClientStatePill />}>
      <div className="relative">
        <input
          id={inputId}
          type="text"
          role="combobox"
          autoComplete="off"
          aria-autocomplete="list"
          aria-expanded={isExpanded}
          aria-controls={listId}
          aria-activedescendant={isExpanded && combobox.activeIndex >= 0 ? optionId(combobox.activeIndex) : undefined}
          placeholder={CAMPAIGN_COPY.artist.placeholder}
          value={state.draft.artist}
          onChange={(event) => {
            dispatch({ type: "set", patch: { artist: event.target.value } });
            combobox.setIsOpen(true);
            combobox.setActiveIndex(-1);
          }}
          onFocus={() => combobox.setIsOpen(true)}
          onBlur={() => combobox.setIsOpen(false)}
          onKeyDown={combobox.onKeyDown}
          className="glass-field h-14 w-full rounded-md px-4 text-xl font-extralight text-text-primary outline-none transition-colors placeholder:text-text-muted focus:border-white/40 focus-visible:ring-2 focus-visible:ring-lilac"
        />
        {isExpanded ? (
          <ClientOptionsList
            listId={listId}
            clients={clients}
            activeIndex={combobox.activeIndex}
            optionId={optionId}
            onHover={combobox.setActiveIndex}
            onPick={pick}
            onLoad={load}
          />
        ) : null}
      </div>
    </CampaignFieldGroup>
  );
}

"use client";

import { useId } from "react";
import { CAMPAIGN_COPY } from "@/constants/quote-campaign-copy.constants";
import { CampaignFieldGroup } from "@/presentation/components/cotizador/campana/campaign-field-group";
import { useQuote } from "@/presentation/hooks/use-quote";

/** «Descripción / Comentarios»: texto libre; también recibe las zonas agrupadas con sus ciudades. */
export function NotesField() {
  const { state, dispatch } = useQuote();
  const id = useId();

  return (
    <CampaignFieldGroup label={CAMPAIGN_COPY.notes.label} hint={CAMPAIGN_COPY.optional} labelFor={id}>
      <textarea
        id={id}
        rows={3}
        value={state.draft.notes}
        placeholder={CAMPAIGN_COPY.notes.placeholder}
        onChange={(event) => dispatch({ type: "set", patch: { notes: event.target.value } })}
        className="glass-field min-h-[88px] w-full resize-y rounded-md px-3.5 py-3 text-sm leading-[1.5] text-text-primary outline-none transition-colors placeholder:text-text-muted focus:border-white/40 focus-visible:ring-2 focus-visible:ring-lilac"
      />
    </CampaignFieldGroup>
  );
}

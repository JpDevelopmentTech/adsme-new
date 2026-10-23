"use client";

import { CAMPAIGN_COPY } from "@/constants/quote-campaign-copy.constants";
import { RemovableChip } from "@/presentation/components/cotizador/campana/removable-chip";
import { useQuote } from "@/presentation/hooks/use-quote";

/** Intereses elegidos, siempre a la vista aunque el bloque esté recogido. */
export function SelectedInterests() {
  const { state, dispatch } = useQuote();
  const { interests } = state.draft;

  if (!interests.length) return <p className="text-[13px] text-text-muted">{CAMPAIGN_COPY.interests.none}</p>;
  return (
    <div className="flex flex-wrap gap-2">
      {interests.map((name) => (
        <RemovableChip key={name} label={name} onRemove={() => dispatch({ type: "toggleInterest", name })} />
      ))}
    </div>
  );
}

"use client";

import { CAMPAIGN_COPY } from "@/constants/quote-campaign-copy.constants";
import { ChoiceChip } from "@/presentation/components/cotizador/campana/choice-chip";
import type { InterestOptionsProps } from "@/types/quote-campaign.types";

/** Intereses del filtro actual en píldoras, con las letras de las plataformas que los ofrecen. */
export function InterestOptions({ interests, selected, query, onToggle }: InterestOptionsProps) {
  const text = query.trim();

  if (!interests.length) {
    return <p className="text-[13px] text-text-muted">{text ? CAMPAIGN_COPY.interests.noResults(text) : CAMPAIGN_COPY.interests.noResultsPlain}</p>;
  }
  return (
    <div className="flex flex-wrap gap-2">
      {interests.map((interest) => (
        <ChoiceChip
          key={interest.name}
          label={interest.name}
          detail={interest.platforms.join(" ")}
          isSelected={selected.includes(interest.name)}
          onToggle={() => onToggle(interest.name)}
        />
      ))}
    </div>
  );
}

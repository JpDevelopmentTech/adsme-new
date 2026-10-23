"use client";

import { CAMPAIGN_COPY } from "@/constants/quote-campaign-copy.constants";
import { CampaignFieldGroup } from "@/presentation/components/cotizador/campana/campaign-field-group";
import { ChoiceChip } from "@/presentation/components/cotizador/campana/choice-chip";
import { CustomGenreInput } from "@/presentation/components/cotizador/campana/custom-genre-input";
import { useQuote } from "@/presentation/hooks/use-quote";

/** «Género musical»: los géneros del catálogo y los propios, en píldoras que se activan. */
export function GenreField() {
  const { state, dispatch, reference } = useQuote();
  const { genres, customGenres, sections } = state.draft;
  const options = [...reference.catalog.genres, ...customGenres.filter((genre) => !reference.catalog.genres.includes(genre))];

  return (
    <CampaignFieldGroup
      label={CAMPAIGN_COPY.genre.label}
      hint={CAMPAIGN_COPY.optional}
      fold={{ isCollapsed: sections.genre, onToggle: () => dispatch({ type: "toggleSection", section: "genre" }) }}
      collapsedSummary={genres.length ? genres.join(", ") : <span className="text-text-muted">{CAMPAIGN_COPY.genre.empty}</span>}
    >
      <div className="flex flex-wrap gap-2">
        {options.map((genre) => (
          <ChoiceChip
            key={genre}
            label={genre}
            isSelected={genres.includes(genre)}
            onToggle={() => dispatch({ type: "toggleGenre", name: genre })}
          />
        ))}
        <CustomGenreInput />
      </div>
    </CampaignFieldGroup>
  );
}

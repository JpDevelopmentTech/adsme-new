"use client";

import { useState } from "react";
import { CAMPAIGN_COPY } from "@/constants/quote-campaign-copy.constants";
import { DEFAULT_INTEREST_CATEGORY, INTEREST_PLATFORM_OPTIONS } from "@/constants/quote-campaign.constants";
import { CampaignFieldGroup } from "@/presentation/components/cotizador/campana/campaign-field-group";
import { InterestCategoryTabs } from "@/presentation/components/cotizador/campana/interest-category-tabs";
import { InterestOptions } from "@/presentation/components/cotizador/campana/interest-options";
import { InterestSearch } from "@/presentation/components/cotizador/campana/interest-search";
import { SelectedInterests } from "@/presentation/components/cotizador/campana/selected-interests";
import { SegmentedControl } from "@/presentation/components/ui/segmented-control";
import { useQuote } from "@/presentation/hooks/use-quote";
import type { InterestPlatformFilter } from "@/types/quote-campaign.types";
import { filterQuoteInterests } from "@/utils/filter-quote-interests";

const COPY = CAMPAIGN_COPY.interests;

/**
 * «Intereses»: los elegidos siempre visibles y, desplegado, el catálogo con
 * buscador, filtro de plataforma y pestañas de categoría.
 */
export function InterestsField() {
  const { state, dispatch, reference } = useQuote();
  const [query, setQuery] = useState("");
  const [platform, setPlatform] = useState<InterestPlatformFilter>("all");
  const [category, setCategory] = useState<string>(DEFAULT_INTEREST_CATEGORY);
  const { interests, sections } = state.draft;
  const options = filterQuoteInterests(reference.catalog.interests, { query, platform, category });

  function addOwn() {
    const name = query.trim();
    if (!name) return;
    if (!interests.includes(name)) dispatch({ type: "toggleInterest", name });
    setQuery("");
  }

  return (
    <CampaignFieldGroup
      label={COPY.label}
      hint={COPY.hint}
      fold={{ isCollapsed: sections.interests, onToggle: () => dispatch({ type: "toggleSection", section: "interests" }) }}
      persistent={<SelectedInterests />}
    >
      <div className="flex flex-col gap-3 pt-1">
        <div className="flex flex-wrap items-center gap-2">
          <InterestSearch value={query} onChange={setQuery} onSubmit={addOwn} />
          <SegmentedControl label={COPY.platformLabel} value={platform} options={INTEREST_PLATFORM_OPTIONS} onChange={setPlatform} />
        </div>
        <InterestCategoryTabs
          categories={reference.catalog.interestCategories}
          active={query.trim() ? null : category}
          onSelect={(next) => {
            setCategory(next);
            setQuery("");
          }}
        />
        <InterestOptions interests={options} selected={interests} query={query} onToggle={(name) => dispatch({ type: "toggleInterest", name })} />
        <p className="text-[11px] leading-relaxed text-text-muted">{COPY.legend}</p>
      </div>
    </CampaignFieldGroup>
  );
}

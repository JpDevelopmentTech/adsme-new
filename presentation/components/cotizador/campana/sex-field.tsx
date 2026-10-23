"use client";

import { CAMPAIGN_COPY } from "@/constants/quote-campaign-copy.constants";
import { SEX_OPTIONS } from "@/constants/quote-campaign.constants";
import { CampaignFieldGroup } from "@/presentation/components/cotizador/campana/campaign-field-group";
import { SegmentedControl } from "@/presentation/components/ui/segmented-control";
import { useQuote } from "@/presentation/hooks/use-quote";

/** «Sexo» del público: Todos, Mujeres u Hombres. */
export function SexField() {
  const { state, dispatch } = useQuote();

  return (
    <CampaignFieldGroup
      label={CAMPAIGN_COPY.sex.label}
      hint={CAMPAIGN_COPY.optional}
      fold={{ isCollapsed: state.draft.sections.sex, onToggle: () => dispatch({ type: "toggleSection", section: "sex" }) }}
      collapsedSummary={state.draft.sex}
    >
      <SegmentedControl
        label={CAMPAIGN_COPY.sex.groupLabel}
        value={state.draft.sex}
        options={SEX_OPTIONS}
        onChange={(sex) => dispatch({ type: "set", patch: { sex } })}
      />
    </CampaignFieldGroup>
  );
}

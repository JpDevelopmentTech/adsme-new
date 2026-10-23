"use client";

import { CAMPAIGN_COPY } from "@/constants/quote-campaign-copy.constants";
import { AgeSelect } from "@/presentation/components/cotizador/campana/age-select";
import { CampaignFieldGroup } from "@/presentation/components/cotizador/campana/campaign-field-group";
import { useQuote } from "@/presentation/hooks/use-quote";

/** «Edades»: rango del público con dos selectores, desde y hasta. */
export function AgesField() {
  const { state, dispatch, reference } = useQuote();
  const { ages } = reference.catalog;
  const COPY = CAMPAIGN_COPY.ages;

  return (
    <CampaignFieldGroup label={COPY.label} hint={CAMPAIGN_COPY.optional}>
      <div className="flex items-center gap-2">
        <AgeSelect label={COPY.from} value={state.draft.ageFrom} ages={ages} onChange={(ageFrom) => dispatch({ type: "set", patch: { ageFrom } })} />
        <span aria-hidden className="text-text-muted">–</span>
        <AgeSelect label={COPY.to} value={state.draft.ageTo} ages={ages} onChange={(ageTo) => dispatch({ type: "set", patch: { ageTo } })} />
      </div>
    </CampaignFieldGroup>
  );
}

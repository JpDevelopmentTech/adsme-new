"use client";

import { useId } from "react";
import { CAMPAIGN_COPY } from "@/constants/quote-campaign-copy.constants";
import { CampaignFieldGroup } from "@/presentation/components/cotizador/campana/campaign-field-group";
import { useQuote } from "@/presentation/hooks/use-quote";

/** «Proyecto»: la canción, álbum o gira que se pauta; plegable a una línea. */
export function ProjectField() {
  const { state, dispatch } = useQuote();
  const inputId = useId();
  const project = state.draft.project.trim();

  return (
    <CampaignFieldGroup
      label={CAMPAIGN_COPY.project.label}
      hint={CAMPAIGN_COPY.project.hint}
      labelFor={inputId}
      fold={{ isCollapsed: state.draft.sections.project, onToggle: () => dispatch({ type: "toggleSection", section: "project" }) }}
      collapsedSummary={project || <span className="text-text-muted">{CAMPAIGN_COPY.project.empty}</span>}
    >
      <input
        id={inputId}
        type="text"
        value={state.draft.project}
        placeholder={CAMPAIGN_COPY.project.placeholder}
        onChange={(event) => dispatch({ type: "set", patch: { project: event.target.value } })}
        className="glass-field h-11 w-full rounded-md px-3.5 text-sm text-text-primary outline-none transition-colors placeholder:text-text-muted focus:border-white/40 focus-visible:ring-2 focus-visible:ring-lilac"
      />
    </CampaignFieldGroup>
  );
}

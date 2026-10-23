"use client";

import { useId } from "react";
import { CampaignFields } from "@/presentation/components/cotizador/campana/campaign-fields";
import { CampaignHeader } from "@/presentation/components/cotizador/campana/campaign-header";
import { CampaignSummary } from "@/presentation/components/cotizador/campana/campaign-summary";
import { NotesField } from "@/presentation/components/cotizador/campana/notes-field";
import { useQuote } from "@/presentation/hooks/use-quote";

/**
 * Sección «Campaña»: artista, proyecto, género, público, intereses y
 * descripción. Recogida, deja un resumen de lo lleno y la descripción a mano.
 */
export function CampaignSection() {
  const { state, dispatch } = useQuote();
  const titleId = useId();
  const bodyId = useId();
  const isCollapsed = state.draft.campaignCollapsed;

  return (
    <section aria-labelledby={titleId} className="glass-thick flex flex-col gap-5 rounded-card p-5 sm:p-6">
      <CampaignHeader
        titleId={titleId}
        bodyId={bodyId}
        isCollapsed={isCollapsed}
        onToggle={() => dispatch({ type: "set", patch: { campaignCollapsed: !isCollapsed } })}
      />
      {isCollapsed ? <CampaignSummary id={bodyId} /> : <CampaignFields id={bodyId} />}
      <div className="border-t border-border pt-5">
        <NotesField />
      </div>
    </section>
  );
}

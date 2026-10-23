"use client";

import { CAMPAIGN_COPY } from "@/constants/quote-campaign-copy.constants";
import { FoldButton } from "@/presentation/components/cotizador/campana/fold-button";
import type { CampaignHeaderProps } from "@/types/quote-campaign.types";

/** Título «Campaña» con su explicación y el botón para recoger toda la sección. */
export function CampaignHeader({ titleId, bodyId, isCollapsed, onToggle }: CampaignHeaderProps) {
  return (
    <header className="flex items-start justify-between gap-3">
      <div className="flex min-w-0 flex-col gap-1">
        <h2 id={titleId} className="text-xl font-light text-text-primary">
          {CAMPAIGN_COPY.title}
        </h2>
        {isCollapsed ? null : <p className="text-[13px] text-text-secondary">{CAMPAIGN_COPY.subtitle}</p>}
      </div>
      <FoldButton isCollapsed={isCollapsed} controlsId={bodyId} onToggle={onToggle} />
    </header>
  );
}

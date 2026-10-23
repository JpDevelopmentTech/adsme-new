"use client";

import { useId } from "react";
import { FoldButton } from "@/presentation/components/cotizador/campana/fold-button";
import type { CampaignFieldGroupProps } from "@/types/quote-campaign.types";

/**
 * Bloque de un campo de la campaña: título con su nota opcional, algo a la
 * derecha (estado o «Recoger») y el contenido. Recogido, enseña su resumen en
 * lugar del contenido; lo `persistent` se ve siempre.
 */
export function CampaignFieldGroup({ label, hint, labelFor, aside, fold, collapsedSummary, persistent, children }: CampaignFieldGroupProps) {
  const titleId = useId();
  const bodyId = useId();
  const isCollapsed = fold?.isCollapsed ?? false;
  const titleClasses = "text-xs font-normal text-text-secondary";

  return (
    <div role={labelFor ? undefined : "group"} aria-labelledby={labelFor ? undefined : titleId} className="flex min-w-0 flex-col gap-2.5">
      <div className="flex min-h-10 flex-wrap items-center justify-between gap-x-3 gap-y-1">
        <div className="flex min-w-0 flex-wrap items-baseline gap-x-2">
          {labelFor ? (
            <label id={titleId} htmlFor={labelFor} className={titleClasses}>{label}</label>
          ) : (
            <h3 id={titleId} className={titleClasses}>{label}</h3>
          )}
          {hint ? <span className="text-[11px] text-text-muted">{hint}</span> : null}
        </div>
        <div className="flex items-center gap-2">
          {aside}
          {fold ? <FoldButton isCollapsed={isCollapsed} controlsId={bodyId} onToggle={fold.onToggle} /> : null}
        </div>
      </div>
      {persistent}
      <div id={bodyId} className="min-w-0 empty:hidden">
        {isCollapsed ? (collapsedSummary ? <div className="text-sm text-text-secondary">{collapsedSummary}</div> : null) : children}
      </div>
    </div>
  );
}

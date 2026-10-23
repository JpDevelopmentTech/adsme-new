"use client";

import { CAMPAIGN_COPY } from "@/constants/quote-campaign-copy.constants";
import { CampaignFieldGroup } from "@/presentation/components/cotizador/campana/campaign-field-group";
import { TargetSegment } from "@/presentation/components/cotizador/campana/target-segment";
import { TargetSumPill } from "@/presentation/components/cotizador/campana/target-sum-pill";
import { TargetSummary } from "@/presentation/components/cotizador/campana/target-summary";
import { useQuote } from "@/presentation/hooks/use-quote";

/** «Target / Público»: segmentos con su % del presupuesto, lugares y zonas; la suma debe dar 100 %. */
export function TargetField() {
  const { state, dispatch } = useQuote();
  const { targets, sections } = state.draft;

  return (
    <CampaignFieldGroup
      label={CAMPAIGN_COPY.target.label}
      fold={{ isCollapsed: sections.target, onToggle: () => dispatch({ type: "toggleSection", section: "target" }) }}
      collapsedSummary={<TargetSummary />}
    >
      <div className="flex flex-col gap-2.5">
        {targets.map((target, index) => (
          <TargetSegment key={target.id} target={target} index={index} isRemovable={targets.length > 1} />
        ))}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => dispatch({ type: "addTarget" })}
            className="h-10 cursor-pointer rounded-pill border border-dashed border-border-strong px-3.5 text-[13px] text-text-secondary transition-colors hover:border-white/40 hover:text-text-primary focus-visible:ring-2 focus-visible:ring-lilac focus-visible:outline-none"
          >
            {CAMPAIGN_COPY.target.addSegment}
          </button>
          <TargetSumPill />
        </div>
      </div>
    </CampaignFieldGroup>
  );
}

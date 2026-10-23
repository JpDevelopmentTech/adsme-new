"use client";

import { ChevronDown } from "lucide-react";
import { CAMPAIGN_COPY } from "@/constants/quote-campaign-copy.constants";
import type { FoldButtonProps } from "@/types/quote-campaign.types";
import { cn } from "@/utils/cn";

/** Botón «Recoger»/«Expandir» de un bloque plegable; anuncia el estado con `aria-expanded`. */
export function FoldButton({ isCollapsed, controlsId, onToggle }: FoldButtonProps) {
  return (
    <button
      type="button"
      aria-expanded={!isCollapsed}
      aria-controls={controlsId}
      onClick={onToggle}
      className="inline-flex h-10 shrink-0 cursor-pointer items-center gap-1.5 rounded-pill px-3 text-xs text-text-secondary transition-colors hover:bg-surface hover:text-text-primary focus-visible:ring-2 focus-visible:ring-lilac focus-visible:outline-none"
    >
      {isCollapsed ? CAMPAIGN_COPY.expand : CAMPAIGN_COPY.collapse}
      <ChevronDown
        size={14}
        aria-hidden
        className={cn("transition-transform duration-200 motion-reduce:transition-none", !isCollapsed && "rotate-180")}
      />
    </button>
  );
}

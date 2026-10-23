"use client";

import { X } from "lucide-react";
import { CAMPAIGN_COPY } from "@/constants/quote-campaign-copy.constants";
import type { RemovableChipProps } from "@/types/quote-campaign.types";

/** Elemento elegido en píldora lila suave con su «×» para quitarlo. */
export function RemovableChip({ label, title, onRemove }: RemovableChipProps) {
  return (
    <span
      title={title}
      className="inline-flex h-10 max-w-full items-center gap-1 rounded-pill border border-lilac/30 bg-lilac/12 pr-1 pl-3.5 text-[13px] text-text-primary"
    >
      <span className="truncate">{label}</span>
      <button
        type="button"
        aria-label={CAMPAIGN_COPY.target.remove(label)}
        onClick={onRemove}
        className="grid size-8 shrink-0 cursor-pointer place-items-center rounded-pill text-text-secondary transition-colors hover:bg-white/10 hover:text-text-primary focus-visible:ring-2 focus-visible:ring-lilac focus-visible:outline-none"
      >
        <X size={14} aria-hidden />
      </button>
    </span>
  );
}

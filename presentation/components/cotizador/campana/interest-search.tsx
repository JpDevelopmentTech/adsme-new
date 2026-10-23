"use client";

import { Search } from "lucide-react";
import { CAMPAIGN_COPY } from "@/constants/quote-campaign-copy.constants";
import type { InterestSearchProps } from "@/types/quote-campaign.types";

/** Buscador de intereses; Enter agrega lo escrito como interés propio. */
export function InterestSearch({ value, onChange, onSubmit }: InterestSearchProps) {
  return (
    <label className="glass-field flex h-10 min-w-0 flex-1 basis-60 items-center gap-2 rounded-pill px-3.5 transition-colors focus-within:border-white/40 focus-within:ring-2 focus-within:ring-lilac">
      <Search size={15} strokeWidth={1.5} aria-hidden className="shrink-0 text-text-muted" />
      <span className="sr-only">{CAMPAIGN_COPY.interests.searchLabel}</span>
      <input
        type="search"
        value={value}
        placeholder={CAMPAIGN_COPY.interests.search}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={(event) => {
          if (event.key !== "Enter") return;
          event.preventDefault();
          onSubmit();
        }}
        className="min-w-0 flex-1 bg-transparent text-[13px] text-text-primary outline-none placeholder:text-text-muted [&::-webkit-search-cancel-button]:hidden"
      />
    </label>
  );
}

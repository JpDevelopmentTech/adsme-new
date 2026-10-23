"use client";

import { CAMPAIGN_COPY } from "@/constants/quote-campaign-copy.constants";
import type { InterestCategoryTabsProps } from "@/types/quote-campaign.types";
import { cn } from "@/utils/cn";

/** Pestañas de categoría de intereses: «Todas» y las del catálogo. Con búsqueda ninguna está activa. */
export function InterestCategoryTabs({ categories, active, onSelect }: InterestCategoryTabsProps) {
  const tabs = [{ value: "", label: CAMPAIGN_COPY.interests.all }, ...categories.map((name) => ({ value: name, label: name }))];

  return (
    <div role="group" aria-label={CAMPAIGN_COPY.interests.categoriesLabel} className="flex flex-wrap gap-x-1 gap-y-1 border-b border-border pb-2">
      {tabs.map((tab) => {
        const isActive = tab.value === active;
        return (
          <button
            key={tab.value || "all"}
            type="button"
            aria-pressed={isActive}
            onClick={() => onSelect(tab.value)}
            className={cn(
              "h-9 cursor-pointer rounded-pill px-3 text-xs transition-colors focus-visible:ring-2 focus-visible:ring-lilac focus-visible:outline-none",
              isActive ? "bg-lilac/15 text-lilac" : "text-text-muted hover:text-text-primary",
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

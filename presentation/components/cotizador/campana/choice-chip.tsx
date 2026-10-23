"use client";

import { CHIP_BASE_CLASSES } from "@/constants/quote-campaign.constants";
import type { ChoiceChipProps } from "@/types/quote-campaign.types";
import { cn } from "@/utils/cn";

/** Píldora que se activa y desactiva; activa va en blanco con texto tinta. */
export function ChoiceChip({ label, isSelected, onToggle, detail }: ChoiceChipProps) {
  return (
    <button
      type="button"
      aria-pressed={isSelected}
      onClick={onToggle}
      className={cn(
        CHIP_BASE_CLASSES,
        isSelected
          ? "border-transparent bg-ink text-g-50"
          : "border-border bg-surface text-text-secondary hover:border-border-strong hover:text-text-primary",
      )}
    >
      {label}
      {detail ? (
        <span aria-hidden className={cn("text-[10px] tracking-[1px]", isSelected ? "text-g-50/60" : "text-text-muted")}>
          {detail}
        </span>
      ) : null}
    </button>
  );
}

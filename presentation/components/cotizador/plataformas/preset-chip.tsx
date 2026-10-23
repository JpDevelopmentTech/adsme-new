"use client";

import { Plus } from "lucide-react";
import type { PresetChipProps } from "@/types/quote-platforms.types";

/** Chip para agregar una plataforma: su punto de color y su nombre. */
export function PresetChip({ preset, onAdd }: PresetChipProps) {
  return (
    <button
      type="button"
      onClick={() => onAdd(preset)}
      className="flex h-10 cursor-pointer items-center gap-2 rounded-pill border border-border bg-surface pr-3.5 pl-3 text-[13px] text-text-primary transition-colors hover:border-border-strong hover:bg-g-100 focus-visible:ring-2 focus-visible:ring-lilac focus-visible:outline-none"
    >
      <span aria-hidden className="size-2.5 shrink-0 rounded-full" style={{ backgroundColor: preset.color }} />
      {preset.name}
      <Plus size={14} strokeWidth={1.75} className="text-text-muted" aria-hidden />
    </button>
  );
}

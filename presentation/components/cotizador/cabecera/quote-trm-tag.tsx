"use client";

import type { QuoteTrmTagButtonProps } from "@/types/quote-summary.types";
import { cn } from "@/utils/cn";

const PILL = "inline-flex h-7 items-center rounded-pill px-2.5 text-xs whitespace-nowrap";

/**
 * Etiqueta de la TRM: «Oficial» en verde, solo informativa; «Personalizada» en
 * ámbar, que al tocarla vuelve a la oficial cuando la hay.
 */
export function QuoteTrmTag({ tag, onApplyOfficial }: QuoteTrmTagButtonProps) {
  const tone = tag.kind === "official" ? "bg-success/12 text-success" : "bg-warning/12 text-warning";
  if (tag.kind === "official" || !onApplyOfficial) return <span title={tag.hint} className={cn(PILL, tone)}>{tag.label}</span>;

  return (
    <button
      type="button"
      title={tag.hint}
      aria-label={`${tag.label}. ${tag.hint}`}
      onClick={onApplyOfficial}
      className="grid h-10 cursor-pointer place-items-center rounded-pill focus-visible:ring-2 focus-visible:ring-lilac focus-visible:outline-none"
    >
      <span className={cn(PILL, tone, "transition-colors hover:bg-warning/20")}>{tag.label}</span>
    </button>
  );
}

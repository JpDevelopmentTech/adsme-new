"use client";

import { QUOTE_GRAND_COPY } from "@/constants/quote-summary-copy.constants";
import type { QuoteGrandHeadingProps } from "@/types/quote-summary.types";

/** Rótulo «Total general» y, si está fijo, el chip «Fijo» con «Soltar». */
export function QuoteGrandHeading({ titleId, isFixed, onRelease }: QuoteGrandHeadingProps) {
  return (
    <div className="flex min-h-10 items-center justify-between gap-3">
      <h2 id={titleId} className="text-[13px] tracking-[0.4px] text-text-secondary">{QUOTE_GRAND_COPY.title}</h2>
      {isFixed ? (
        <span className="flex items-center gap-1 rounded-pill bg-lilac/12 py-0.5 pr-0.5 pl-2.5 text-xs text-lilac">
          {QUOTE_GRAND_COPY.fixed}
          <button
            type="button"
            title={QUOTE_GRAND_COPY.releaseHint}
            aria-label={QUOTE_GRAND_COPY.releaseHint}
            onClick={onRelease}
            className="h-8 cursor-pointer rounded-pill px-2.5 text-xs text-text-primary transition-colors hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-lilac focus-visible:outline-none"
          >
            {QUOTE_GRAND_COPY.release}
          </button>
        </span>
      ) : null}
    </div>
  );
}

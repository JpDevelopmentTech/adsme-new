"use client";

import { useEffect, useRef } from "react";
import { QUOTE_DOCUMENT_COPY } from "@/constants/quote-summary-copy.constants";
import type { QuoteFallbackTextProps } from "@/types/quote-summary.types";

/** Respaldo cuando el portapapeles falla: el texto ya seleccionado para copiarlo a mano. */
export function QuoteFallbackText({ text }: QuoteFallbackTextProps) {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    ref.current?.focus();
    ref.current?.select();
  }, [text]);

  return (
    <textarea
      ref={ref}
      readOnly
      value={text}
      rows={8}
      aria-label={QUOTE_DOCUMENT_COPY.fallbackLabel}
      className="glass-field w-full resize-y rounded-md p-3 text-xs leading-relaxed text-text-primary outline-none focus-visible:ring-2 focus-visible:ring-lilac"
    />
  );
}

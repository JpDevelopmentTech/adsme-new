"use client";

import { useState } from "react";
import { CAMPAIGN_COPY } from "@/constants/quote-campaign-copy.constants";
import type { TargetPctFieldProps } from "@/types/quote-campaign.types";
import { formatQuoteNumber } from "@/utils/format-quote-number";
import { parseQuoteNumber } from "@/utils/parse-quote-number";

/** Caja «%» de un segmento. Admite quedar vacía (sin %) y al salir se limpia con coma decimal. */
export function TargetPctField({ value, onChange }: TargetPctFieldProps) {
  const [draft, setDraft] = useState<string | null>(null);
  const shown = draft ?? (value === null ? "" : formatQuoteNumber(value, "pct"));

  return (
    <span
      title={CAMPAIGN_COPY.target.pctTitle}
      className="glass-field flex h-10 w-[88px] shrink-0 items-center gap-1 rounded-pill px-3 transition-colors focus-within:border-white/40 focus-within:ring-2 focus-within:ring-lilac"
    >
      <input
        type="text"
        inputMode="decimal"
        aria-label={CAMPAIGN_COPY.target.pctLabel}
        value={shown}
        onFocus={(event) => event.currentTarget.select()}
        onBlur={() => setDraft(null)}
        onChange={(event) => {
          const raw = event.target.value;
          setDraft(raw);
          onChange(raw.trim() === "" ? null : parseQuoteNumber(raw, "pct"));
        }}
        className="w-full min-w-0 bg-transparent text-right text-sm text-text-primary tabular-nums outline-none"
      />
      <span aria-hidden className="text-sm text-text-muted">%</span>
    </span>
  );
}

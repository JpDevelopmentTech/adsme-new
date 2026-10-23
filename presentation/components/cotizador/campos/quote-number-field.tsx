"use client";

import { useState } from "react";
import type { QuoteNumberFieldProps } from "@/types/quote-fields.types";
import { cn } from "@/utils/cn";
import { formatQuoteNumber } from "@/utils/format-quote-number";
import { parseQuoteNumber } from "@/utils/parse-quote-number";

const PREFIX = { COP: "$", USD: "US$", pct: "", trm: "$" } as const;
const SIZES = { sm: "h-9 text-[13px] px-2.5", md: "h-11 text-sm px-3.5", lg: "h-14 text-2xl font-extralight px-4" } as const;

/**
 * Campo de cifra del cotizador: formatea los miles mientras se escribe, avisa
 * de cada cambio y, al salir, muestra la cifra limpia. Prefijo de moneda o
 * sufijo «%» según el tipo.
 */
export function QuoteNumberField({ value, kind, label, isLabelVisible = false, onValueChange, onFocus, onBlur, isReadOnly = false, isDisabled = false, size = "md", placeholder, className }: QuoteNumberFieldProps) {
  const [draft, setDraft] = useState<string | null>(null);
  const shown = draft ?? (value === null ? "" : formatQuoteNumber(value, kind));

  return (
    <label className={cn("flex min-w-0 flex-col gap-1.5", className)}>
      <span className={isLabelVisible ? "text-xs text-text-secondary" : "sr-only"}>{label}</span>
      <span className={cn("glass-field flex items-center gap-1.5 rounded-md transition-colors focus-within:border-white/40", SIZES[size], (isReadOnly || isDisabled) && "opacity-70", isReadOnly && "bg-lilac/10")}>
        {PREFIX[kind] ? <span className="shrink-0 text-text-muted">{PREFIX[kind]}</span> : null}
        <input
          type="text"
          inputMode="decimal"
          value={shown}
          placeholder={placeholder}
          readOnly={isReadOnly}
          disabled={isDisabled}
          onFocus={(event) => { event.currentTarget.select(); onFocus?.(); }}
          onBlur={() => { setDraft(null); onBlur?.(); }}
          onChange={(event) => {
            const parsed = parseQuoteNumber(event.target.value, kind);
            setDraft(event.target.value.trim() === "" || event.target.value.endsWith(",") || event.target.value.endsWith(".") ? event.target.value : formatQuoteNumber(parsed, kind));
            onValueChange(parsed);
          }}
          className="w-full min-w-0 bg-transparent text-right text-text-primary tabular-nums outline-none placeholder:text-text-muted disabled:cursor-not-allowed"
        />
        {kind === "pct" ? <span className="shrink-0 text-text-muted">%</span> : null}
      </span>
    </label>
  );
}

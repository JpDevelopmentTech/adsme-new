"use client";

import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { PLATFORM_FEES_COPY as COPY } from "@/constants/quote-platforms-copy.constants";
import { IconButton } from "@/presentation/components/ui/icon-button";
import { useQuote } from "@/presentation/hooks/use-quote";
import { useQuoteSnapshot } from "@/presentation/hooks/use-quote-snapshot";
import type { MonthsStepperProps } from "@/types/quote-platforms.types";

/** «Meses de servicio»: − / número / +, de 1 a 36. Deja el campo vacío mientras se escribe. */
export function MonthsStepper({ platformId, months }: MonthsStepperProps) {
  const { dispatch } = useQuote();
  const snapshot = useQuoteSnapshot();
  const [draft, setDraft] = useState<string | null>(null);
  const inputId = `meses-${platformId}`;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={inputId} className="text-xs text-text-secondary">{COPY.months}</label>
      <div className="flex items-center gap-2">
        <IconButton icon={<Minus size={16} aria-hidden />} label={COPY.monthLess} disabled={months <= 1} onClick={() => dispatch({ type: "stepMonths", platformId, delta: -1 })} />
        <input
          id={inputId}
          type="text"
          inputMode="numeric"
          value={draft ?? String(months)}
          onFocus={(event) => { event.currentTarget.select(); snapshot.onFocus(); }}
          onBlur={() => { setDraft(null); snapshot.onBlur(); }}
          onChange={(event) => {
            const digits = event.target.value.replace(/\D/g, "").slice(0, 2);
            setDraft(digits);
            if (digits) dispatch({ type: "setPlatformField", platformId, field: "months", value: Number(digits) });
          }}
          className="glass-field h-11 w-16 min-w-0 rounded-md text-center text-sm text-text-primary tabular-nums outline-none focus:border-white/40 focus-visible:ring-2 focus-visible:ring-lilac"
        />
        <IconButton icon={<Plus size={16} aria-hidden />} label={COPY.monthMore} disabled={months >= 36} onClick={() => dispatch({ type: "stepMonths", platformId, delta: 1 })} />
      </div>
    </div>
  );
}

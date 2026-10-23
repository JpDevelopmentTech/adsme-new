"use client";

import { QUOTE_HEADER_COPY, QUOTE_OUTPUT_TOASTS } from "@/constants/quote-summary-copy.constants";
import { QuoteNumberField } from "@/presentation/components/cotizador/campos/quote-number-field";
import { QuoteTrmTag } from "@/presentation/components/cotizador/cabecera/quote-trm-tag";
import { useQuote } from "@/presentation/hooks/use-quote";
import type { QuoteTrmFieldProps } from "@/types/quote-summary.types";
import { cn } from "@/utils/cn";
import { describeTrmTag } from "@/utils/describe-trm-tag";
import { formatTrmFixed } from "@/utils/format-trm-fixed";

/**
 * TRM compacta de la cabecera: escribirla la marca como manual; la etiqueta
 * dice si es la oficial del Banco de la República o una personalizada.
 */
export function QuoteTrmField({ isNeeded, onEdit, fieldRef }: QuoteTrmFieldProps) {
  const { state, dispatch, reference } = useQuote();
  const { settings, trmManual } = state.draft;
  const official = reference.officialTrm;
  const tag = describeTrmTag(settings.trm, trmManual, official);

  const applyOfficial = () => {
    if (!official) return;
    dispatch({ type: "setTrm", value: official.value, isManual: false });
    dispatch({ type: "toast", message: `${QUOTE_OUTPUT_TOASTS.trmApplied} $${formatTrmFixed(official.value)}` });
    onEdit();
  };

  return (
    <div ref={fieldRef} title={QUOTE_HEADER_COPY.trmHint} className="flex items-center gap-2">
      <span aria-hidden className="text-xs tracking-[0.6px] text-text-muted">{QUOTE_HEADER_COPY.trmLabel}</span>
      <QuoteNumberField
        value={settings.trm || null}
        kind="trm"
        label={QUOTE_HEADER_COPY.trmLabel}
        size="sm"
        placeholder={QUOTE_HEADER_COPY.trmPlaceholder}
        onValueChange={(value) => { dispatch({ type: "setTrm", value, isManual: true }); onEdit(); }}
        className={cn("w-[124px] rounded-md", isNeeded && "bg-warning/10 ring-1 ring-warning")}
      />
      {tag ? <QuoteTrmTag tag={tag} onApplyOfficial={official ? applyOfficial : undefined} /> : null}
    </div>
  );
}

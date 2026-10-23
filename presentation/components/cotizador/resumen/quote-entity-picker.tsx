"use client";

import { QUOTE_DOCUMENT_COPY } from "@/constants/quote-summary-copy.constants";
import type { QuoteCurrency } from "@/domain/entities/quote";
import { SegmentedControl } from "@/presentation/components/ui/segmented-control";
import { useQuote } from "@/presentation/hooks/use-quote";

/** «Retirar de»: la entidad que recibe el pago. Sin elegirla, sigue a la moneda. */
export function QuoteEntityPicker() {
  const { state, dispatch, reference } = useQuote();
  const { entity, currency } = state.draft;
  const { entities } = reference.catalog;
  const options: { value: QuoteCurrency; label: string }[] = [
    { value: "COP", label: entities.COP },
    { value: "USD", label: entities.USD },
  ];

  return (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <span aria-hidden className="text-xs text-text-secondary">{QUOTE_DOCUMENT_COPY.entityLabel}</span>
      <SegmentedControl label={QUOTE_DOCUMENT_COPY.entityLabel} value={entity ?? currency} options={options} onChange={(next) => dispatch({ type: "set", patch: { entity: next } })} />
    </div>
  );
}

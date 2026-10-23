"use client";

import { QUOTE_HEADER_COPY } from "@/constants/quote-summary-copy.constants";
import type { QuoteCurrency } from "@/domain/entities/quote";
import { SegmentedControl } from "@/presentation/components/ui/segmented-control";
import { useQuote } from "@/presentation/hooks/use-quote";
import type { QuoteCurrencySwitchProps } from "@/types/quote-summary.types";

const OPTIONS: { value: QuoteCurrency; label: string }[] = [
  { value: "COP", label: "COP" },
  { value: "USD", label: "USD" },
];

/** Moneda de la cotización. Sin TRM no deja pasar a dólares y señala el campo. */
export function QuoteCurrencySwitch({ onMissingTrm }: QuoteCurrencySwitchProps) {
  const { state, dispatch } = useQuote();
  const { currency, settings } = state.draft;

  const change = (next: QuoteCurrency) => {
    if (next === currency) return;
    if (next === "USD" && !settings.trm) onMissingTrm();
    dispatch({ type: "setCurrency", currency: next });
  };

  return <SegmentedControl label={QUOTE_HEADER_COPY.currencyLabel} value={currency} options={OPTIONS} onChange={change} />;
}

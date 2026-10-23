"use client";

import { QUOTE_SETTINGS_COPY } from "@/constants/quote-summary-copy.constants";
import { QuoteNumberField } from "@/presentation/components/cotizador/campos/quote-number-field";
import { useQuote } from "@/presentation/hooks/use-quote";
import type { QuoteSettingsPanelProps } from "@/types/quote-summary.types";

/**
 * Tarifas base: % AdsME estándar y Servicio Marker por moneda. El servicio es
 * fijo por moneda: no se convierte con la TRM.
 */
export function QuoteSettingsPanel({ id }: QuoteSettingsPanelProps) {
  const { state, dispatch } = useQuote();
  const { fee, service } = state.draft.settings;

  return (
    <section id={id} aria-label={QUOTE_SETTINGS_COPY.panelLabel} className="glass-panel grid gap-4 rounded-card p-5 sm:grid-cols-2 lg:grid-cols-4">
      <QuoteNumberField value={fee} kind="pct" label={QUOTE_SETTINGS_COPY.fee} isLabelVisible onValueChange={(value) => dispatch({ type: "setSettings", fee: value })} />
      <QuoteNumberField value={service.COP} kind="COP" label={QUOTE_SETTINGS_COPY.serviceCop} isLabelVisible onValueChange={(value) => dispatch({ type: "setSettings", serviceCop: value })} />
      <QuoteNumberField value={service.USD} kind="USD" label={QUOTE_SETTINGS_COPY.serviceUsd} isLabelVisible onValueChange={(value) => dispatch({ type: "setSettings", serviceUsd: value })} />
      <div className="flex flex-col gap-1.5">
        <span className="text-xs text-text-secondary">{QUOTE_SETTINGS_COPY.howTitle}</span>
        <p className="text-xs leading-relaxed text-text-muted">{QUOTE_SETTINGS_COPY.howText}</p>
      </div>
    </section>
  );
}

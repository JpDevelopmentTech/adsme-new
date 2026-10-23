"use client";

import { PLATFORMS_EXTRA_COPY as COPY } from "@/constants/quote-platforms-copy.constants";
import { FormBlockHeading } from "@/presentation/components/cotizador/plataformas/form-block-heading";
import { PaymentsCheckbox } from "@/presentation/components/cotizador/plataformas/payments-checkbox";
import { QuoteTextarea } from "@/presentation/components/cotizador/plataformas/quote-textarea";
import { useQuote } from "@/presentation/hooks/use-quote";

/** «Condiciones y notas generales»: lo que sale al final de la cotización y los métodos de pago del PDF. */
export function TermsPanel() {
  const { state, dispatch } = useQuote();

  return (
    <section aria-labelledby="cotizador-condiciones" className="glass-thick flex flex-col gap-4 rounded-card p-5 sm:p-6">
      <FormBlockHeading id="cotizador-condiciones" title={COPY.termsTitle} subtitle={COPY.termsSubtitle} />
      <QuoteTextarea
        id="cotizador-condiciones-texto"
        label={<span className="sr-only">{COPY.termsLabel}</span>}
        value={state.draft.terms}
        rows={4}
        placeholder={COPY.termsPlaceholder}
        onChange={(terms) => dispatch({ type: "set", patch: { terms } })}
      />
      <PaymentsCheckbox />
    </section>
  );
}

"use client";

import { PLATFORM_BODY_COPY as COPY, PLATFORM_BUDGET_ATTR } from "@/constants/quote-platforms-copy.constants";
import { QuoteNumberField } from "@/presentation/components/cotizador/campos/quote-number-field";
import { FieldHeading } from "@/presentation/components/cotizador/plataformas/field-heading";
import { FixedTag } from "@/presentation/components/cotizador/plataformas/fixed-tag";
import { useQuote } from "@/presentation/hooks/use-quote";
import { useQuoteSnapshot } from "@/presentation/hooks/use-quote-snapshot";
import type { PlatformFiguresProps } from "@/types/quote-platforms.types";

/**
 * Presupuesto del cliente: al escribirlo pasa a mandar el total («Fijo») y la
 * pauta se recalcula. Vacío mientras mande la pauta y aún no haya montos.
 */
export function PlatformBudgetField({ platform, figures }: PlatformFiguresProps) {
  const { state, dispatch } = useQuote();
  const snapshot = useQuoteSnapshot();
  const isEmpty = platform.anchor === "pauta" && platform.lines.every((line) => !line.amount);

  return (
    <div className="flex flex-col gap-2" {...{ [PLATFORM_BUDGET_ATTR]: platform.id }}>
      <FieldHeading label={COPY.budget} tag={platform.anchor === "total" ? <FixedTag label={COPY.fixedTotal} /> : null} />
      <QuoteNumberField
        value={isEmpty ? null : figures.total}
        kind={state.draft.currency}
        label={COPY.budgetLabel}
        size="lg"
        isReadOnly={platform.locked}
        onValueChange={(value) => dispatch({ type: "setPlatformField", platformId: platform.id, field: "total", value })}
        {...snapshot}
      />
    </div>
  );
}

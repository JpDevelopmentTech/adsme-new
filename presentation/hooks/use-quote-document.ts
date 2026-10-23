"use client";

import { useMemo } from "react";
import type { QuoteDocument } from "@/domain/entities/quote-document";
import { buildQuoteDocument } from "@/domain/use-cases/quote/build-quote-document";
import { useQuote } from "@/presentation/hooks/use-quote";
import { createQuotePlaceName } from "@/utils/create-quote-place-name";

/** La cotización tal como la recibe el cliente, recalculada al cambiar el borrador. */
export function useQuoteDocument(): QuoteDocument {
  const { state, reference } = useQuote();
  const { catalog } = reference;
  const placeName = useMemo(() => createQuotePlaceName(catalog), [catalog]);
  return useMemo(() => buildQuoteDocument(state.draft, placeName, catalog.entities), [state.draft, placeName, catalog.entities]);
}

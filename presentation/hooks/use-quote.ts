"use client";

import { useContext } from "react";
import { QuoteContext } from "@/presentation/store/quote-store";
import type { QuoteContextValue } from "@/types/quote-store.types";

/** Estado, acciones y datos de referencia del cotizador. Solo dentro de `QuoteProvider`. */
export function useQuote(): QuoteContextValue {
  const value = useContext(QuoteContext);
  if (!value) throw new Error("useQuote debe usarse dentro de QuoteProvider");
  return value;
}

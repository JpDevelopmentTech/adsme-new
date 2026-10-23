import type { QuoteNumberKind } from "@/utils/parse-quote-number";

/** Cifra para mostrar dentro de un campo: miles con punto (COP) o coma (USD), sin símbolo. */
export function formatQuoteNumber(value: number, kind: QuoteNumberKind): string {
  if (kind === "COP") return Math.round(value).toLocaleString("es-CO");
  if (kind === "USD") return value.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 2 });
  return value.toLocaleString("es-CO", { maximumFractionDigits: 2 });
}

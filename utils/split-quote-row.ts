import type { QuoteRowParts } from "@/types/quote-summary.types";

/** Parte una fila «Concepto: $valor» en el último «: » para alinear el valor a la derecha. */
export function splitQuoteRow(text: string): QuoteRowParts {
  const index = text.lastIndexOf(": ");
  if (index < 0) return { concept: text, value: "" };
  return { concept: text.slice(0, index), value: text.slice(index + 2) };
}

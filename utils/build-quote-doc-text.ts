import type { QuoteDocument } from "@/domain/entities/quote-document";
import { composeQuoteText } from "@/utils/compose-quote-text";

/**
 * Cotización en texto plano para Word o Google Docs: sin asteriscos ni
 * cursivas de línea completa, cada línea recortada y sin líneas vacías.
 */
export function buildQuoteDocText(document: QuoteDocument): string {
  return composeQuoteText(document, false)
    .replace(/\*/g, "")
    .replace(/(^|\n)_([^\n]*)_(?=\n|$)/g, "$1$2")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .join("\n");
}

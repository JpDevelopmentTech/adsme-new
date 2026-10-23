import type { QuoteDocument } from "@/domain/entities/quote-document";
import { composeQuoteText } from "@/utils/compose-quote-text";

/** Cotización para el cliente con el formato de WhatsApp. */
export function buildQuoteWhatsappText(document: QuoteDocument): string {
  return composeQuoteText(document, true);
}

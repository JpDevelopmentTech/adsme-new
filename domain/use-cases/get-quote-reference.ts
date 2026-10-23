import type { QuoteReference } from "@/domain/entities/quote-catalog";
import type { QuoteReferenceRepository } from "@/domain/interfaces/quote-reference-repository";

/**
 * Caso de uso: todo lo que el cotizador necesita al abrir (catálogo, TRM
 * oficial, métodos de pago y clientes guardados).
 */
export function createGetQuoteReference(repository: QuoteReferenceRepository) {
  return async function getQuoteReference(): Promise<QuoteReference> {
    return repository.getReference();
  };
}

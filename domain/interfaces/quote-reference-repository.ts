import type { QuoteReference } from "@/domain/entities/quote-catalog";

/**
 * Port de lectura del cotizador: listas de referencia, TRM oficial, métodos de
 * pago y clientes guardados. Hoy lo cubre un adaptador de muestra.
 */
export interface QuoteReferenceRepository {
  getReference(): Promise<QuoteReference>;
}

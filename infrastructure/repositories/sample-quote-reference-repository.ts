import type { QuoteReferenceRepository } from "@/domain/interfaces/quote-reference-repository";
import { QUOTE_GENRES } from "@/infrastructure/sample-data/cotizador/quote-genres";
import { QUOTE_INTEREST_CATEGORIES, QUOTE_INTERESTS } from "@/infrastructure/sample-data/cotizador/quote-interests";
import { QUOTE_COUNTRIES, QUOTE_REGIONS } from "@/infrastructure/sample-data/cotizador/quote-places";
import { QUOTE_AGES, QUOTE_ENTITIES, QUOTE_PRESETS } from "@/infrastructure/sample-data/cotizador/quote-presets";
import { SAMPLE_SAVED_CLIENTS } from "@/infrastructure/sample-data/cotizador/quote-saved-clients";
import { QUOTE_ZONES } from "@/infrastructure/sample-data/cotizador/quote-zones";

/**
 * Referencia del cotizador con datos de muestra: el catálogo del cotizador
 * original, la TRM del 20 oct 2026 y tres clientes de ejemplo. Los métodos de
 * pago no existen todavía, así que no se inventan.
 */
export function createSampleQuoteReferenceRepository(): QuoteReferenceRepository {
  return {
    async getReference() {
      return {
        catalog: {
          genres: QUOTE_GENRES,
          interestCategories: QUOTE_INTEREST_CATEGORIES,
          interests: QUOTE_INTERESTS,
          countries: QUOTE_COUNTRIES,
          regions: QUOTE_REGIONS,
          zones: QUOTE_ZONES,
          ages: QUOTE_AGES,
          presets: QUOTE_PRESETS,
          entities: { ...QUOTE_ENTITIES },
        },
        officialTrm: { value: 3156.32, date: "2026-10-20", source: "Banco de la República" },
        paymentColumns: [],
        savedClients: SAMPLE_SAVED_CLIENTS,
      };
    },
  };
}

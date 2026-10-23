import type { QuoteInterest } from "@/domain/entities/quote-catalog";
import type { InterestFilter } from "@/types/quote-campaign.types";
import { foldSearchText } from "@/utils/fold-search-text";

/**
 * Intereses visibles: con búsqueda, los que la contienen en el nombre o la
 * categoría (sin tildes) sin importar la pestaña; sin búsqueda, los de la
 * categoría activa. Siempre respeta el filtro de plataforma.
 */
export function filterQuoteInterests(interests: QuoteInterest[], { query, platform, category }: InterestFilter): QuoteInterest[] {
  const needle = foldSearchText(query);
  return interests.filter((interest) => {
    if (platform !== "all" && !interest.platforms.includes(platform)) return false;
    if (needle) return foldSearchText(interest.name).includes(needle) || foldSearchText(interest.category).includes(needle);
    return !category || interest.category === category;
  });
}

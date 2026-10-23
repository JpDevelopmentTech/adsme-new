import type { QuoteCatalog } from "@/domain/entities/quote-catalog";

/** Traductor de código a nombre de país o región; si no lo conoce, devuelve el código. */
export function createQuotePlaceName(catalog: Pick<QuoteCatalog, "countries" | "regions">): (code: string) => string {
  const names = new Map([...catalog.countries, ...catalog.regions].map((place) => [place.code, place.name]));
  return (code) => names.get(code) ?? code;
}

import type { QuoteCatalog } from "@/domain/entities/quote-catalog";

/** Traduce el código de un país o región a su nombre; si no lo conoce, deja el código. */
export function quotePlaceNamer(catalog: QuoteCatalog): (code: string) => string {
  const names = new Map([...catalog.countries, ...catalog.regions].map((place) => [place.code, place.name]));
  return (code) => names.get(code) ?? code;
}

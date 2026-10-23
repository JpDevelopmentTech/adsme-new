import type { QuoteCountryZones } from "@/domain/entities/quote-catalog";

/** Ciudades que incluye una zona agrupada, o `undefined` si no es agrupada. */
export function findZoneComposition(zones: Record<string, QuoteCountryZones>, name: string): string | undefined {
  for (const country of Object.values(zones)) {
    const group = country.groups.find((item) => item.name === name);
    if (group) return group.composition;
  }
  return undefined;
}

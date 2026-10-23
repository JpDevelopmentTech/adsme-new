import { CAMPAIGN_COPY } from "@/constants/quote-campaign-copy.constants";
import { DEFAULT_ZONE_COUNTRY, MAX_ZONE_OPTIONS, MAX_ZONES_PER_GROUP } from "@/constants/quote-campaign.constants";
import type { QuoteCountryZones } from "@/domain/entities/quote-catalog";
import type { ZoneOption, ZoneOptionGroup, ZoneSearchInput } from "@/types/quote-campaign.types";
import { foldSearchText } from "@/utils/fold-search-text";

/** Países cuyas zonas se ofrecen: los del segmento que tienen; si ninguno, todos (o solo Colombia sin búsqueda). */
function sourceCountries({ catalog, target, query }: ZoneSearchInput): string[] {
  const own = target.places.filter((code) => catalog.zones[code]);
  if (own.length) return own;
  const all = catalog.countries.map((country) => country.code).filter((code) => catalog.zones[code]);
  return query.trim() ? all : all.filter((code) => code === DEFAULT_ZONE_COUNTRY).slice(0, 1);
}

/** Los tres grupos de un país: zonas agrupadas, divisiones y ciudades. */
function countryGroups(zones: QuoteCountryZones): [string, ZoneOption[]][] {
  return [
    [CAMPAIGN_COPY.zones.grouped, zones.groups.map((group) => ({ id: "", name: group.name, composition: group.composition }))],
    [zones.regionLabel, zones.regions.map((name) => ({ id: "", name }))],
    [CAMPAIGN_COPY.zones.cities, zones.cities.map((name) => ({ id: "", name }))],
  ];
}

/**
 * Opciones del buscador de zonas de un segmento, agrupadas por tipo y país.
 * Quita las ya elegidas, filtra por nombre o composición sin tildes y corta
 * en 40 por grupo y unas 160 en total.
 */
export function buildZoneOptionGroups(input: ZoneSearchInput): ZoneOptionGroup[] {
  const codes = sourceCountries(input);
  const needle = foldSearchText(input.query);
  const countryName = (code: string) => input.catalog.countries.find((country) => country.code === code)?.name ?? code;
  const result: ZoneOptionGroup[] = [];
  let total = 0;

  for (const code of codes) {
    for (const [label, options] of countryGroups(input.catalog.zones[code])) {
      if (total > MAX_ZONE_OPTIONS) return result;
      const matches = options
        .filter((option) => !input.target.zones.includes(option.name))
        .filter((option) => !needle || (foldSearchText(option.name).includes(needle) || foldSearchText(option.composition ?? "").includes(needle)))
        .slice(0, MAX_ZONES_PER_GROUP)
        .map((option) => ({ ...option, id: `${code}-${label}-${option.name}` }));
      if (!matches.length) continue;
      result.push({ label: codes.length > 1 ? `${label} · ${countryName(code)}` : label, options: matches });
      total += matches.length;
    }
  }
  return result;
}

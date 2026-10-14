import type { NominaArtistFinance } from "@/domain/entities/nomina-finance";
import type { ArtistTaxRow } from "@/types/nomina-finanzas.types";
import { computeNominaTax } from "@/utils/compute-nomina-tax";

/** Base gravable e impuesto de cada artista con utilidad, de mayor a menor. */
export function buildArtistTaxes(artists: NominaArtistFinance[]): ArtistTaxRow[] {
  const total = artists.reduce((sum, artist) => sum + computeNominaTax(artist.profit), 0);

  return artists
    .filter((artist) => artist.profit > 0)
    .map((artist) => {
      const tax = computeNominaTax(artist.profit);
      return { id: artist.id, name: artist.name, base: artist.profit, tax, share: total > 0 ? (tax / total) * 100 : 0 };
    })
    .sort((a, b) => b.base - a.base);
}

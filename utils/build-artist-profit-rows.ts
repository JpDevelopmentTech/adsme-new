import type { NominaArtistFinance } from "@/domain/entities/nomina-finance";
import type { ArtistProfitRow } from "@/types/nomina-finanzas.types";
import { netMargin } from "@/utils/net-margin";
import { resolveProfitLevel } from "@/utils/resolve-profit-level";
import { toFinanceFigures } from "@/utils/to-finance-figures";

/** Filas de «Rentabilidad por artista», de la mayor utilidad neta a la menor. */
export function buildArtistProfitRows(artists: NominaArtistFinance[]): ArtistProfitRow[] {
  return artists
    .map((artist) => {
      const figures = toFinanceFigures(artist);
      const margin = netMargin(artist.service, artist.profit);

      return {
        ...figures,
        id: artist.id,
        name: artist.name,
        shows: artist.shows,
        margin,
        level: resolveProfitLevel(margin, figures.netProfit),
        netPerShow: artist.shows > 0 ? figures.netProfit / artist.shows : null,
        fixedGoalProgress: artist.fixedGoalProgress,
      };
    })
    .sort((a, b) => b.netProfit - a.netProfit);
}

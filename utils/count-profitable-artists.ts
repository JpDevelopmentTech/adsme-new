import { PROFITABLE_MARGIN } from "@/constants/nomina-finanzas.constants";
import type { NominaPeriodTotals } from "@/domain/entities/nomina-finance";
import { netMargin } from "@/utils/net-margin";

/** Artistas cuya rentabilidad neta llega al 10 % o más. */
export function countProfitableArtists(artists: NominaPeriodTotals[]): number {
  return artists.filter((artist) => (netMargin(artist.service, artist.profit) ?? 0) >= PROFITABLE_MARGIN).length;
}

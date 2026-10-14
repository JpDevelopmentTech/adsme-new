import { ARTIST_SERIES_COLORS, FINANCE_TIMELINE_LIMIT } from "@/constants/nomina-finanzas.constants";
import { FINANCE_PROFIT_COPY } from "@/constants/nomina-finanzas-copy.constants";
import type { NominaLedgerRow } from "@/domain/entities/nomina-finance";
import type { StackedSeries } from "@/types/nomina-finanzas.types";
import { computeNominaTax } from "@/utils/compute-nomina-tax";

/**
 * Utilidad neta de cada artista mes a mes, sacada del libro: la Utilidad de sus
 * movimientos por Mes Asignado menos el 30 %. Seis artistas como mucho, por
 * utilidad neta del periodo; el resto se suma en «Otros».
 */
export function buildArtistNetTimeline(ledger: NominaLedgerRow[], months: string[]): StackedSeries[] {
  const byArtist = new Map<string, { name: string; data: number[] }>();

  ledger.forEach((row) => {
    const index = months.indexOf(row.assignedMonth);
    if (index < 0) return;
    const entry = byArtist.get(row.artistId) ?? { name: row.artistName, data: months.map(() => 0) };
    entry.data[index] += row.profit - computeNominaTax(row.profit);
    byArtist.set(row.artistId, entry);
  });

  const total = (data: number[]) => data.reduce((sum, value) => sum + value, 0);
  const ranked = [...byArtist.values()].filter((entry) => total(entry.data) > 0).sort((a, b) => total(b.data) - total(a.data));
  const named = ranked.slice(0, FINANCE_TIMELINE_LIMIT);
  const rest = ranked.slice(FINANCE_TIMELINE_LIMIT);
  const series = rest.length ? [...named, { name: FINANCE_PROFIT_COPY.others, data: months.map((_, index) => total(rest.map((entry) => entry.data[index]))) }] : named;

  return series.map((entry, index) => ({ ...entry, color: ARTIST_SERIES_COLORS[index % ARTIST_SERIES_COLORS.length] }));
}

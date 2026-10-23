import type { NominaFinance } from "@/domain/entities/nomina-finance";
import type { LedgerEntry } from "@/types/nomina-finanzas.types";
import { computeNominaTax } from "@/utils/compute-nomina-tax";

/** Movimientos del libro con impuestos, utilidad neta, inversión y la foto del artista. */
export function buildLedgerEntries(finance: NominaFinance): LedgerEntry[] {
  const photos = new Map(finance.artists.map((artist) => [artist.id, artist.photoUrl]));

  return finance.ledger.map((row) => {
    const taxes = computeNominaTax(row.profit);
    return {
      ...row,
      taxes,
      netProfit: row.profit - taxes,
      photoUrl: photos.get(row.artistId) ?? null,
    };
  });
}

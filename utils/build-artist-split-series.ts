import { BUCKET_META } from "@/constants/nomina-buckets.constants";
import type { ArtistProfitRow, StackedSeries } from "@/types/nomina-finanzas.types";

const KEYS = ["servicio", "utilidadNeta", "impuestos", "inversion"] as const;
const FIELDS = { servicio: "service", utilidadNeta: "netProfit", impuestos: "taxes", inversion: "investment" } as const;

/** Reparto de cada artista en cuatro bolsas apiladas, en el orden de la leyenda. */
export function buildArtistSplitSeries(rows: ArtistProfitRow[]): StackedSeries[] {
  return KEYS.map((key) => ({
    name: BUCKET_META[key].label,
    color: BUCKET_META[key].color,
    data: rows.map((row) => row[FIELDS[key]]),
  }));
}

import type { NominaArtistSummary, NominaScalability } from "@/domain/entities/nomina-artist";

/** Fila del roster: el artista con sus cifras del mes y acumuladas. */
export interface NominaRosterEntry extends NominaArtistSummary {
  monthIncome: number;
  monthEvents: number;
  scalability: NominaScalability;
  grossTotal: number;
  labelProfitTotal: number;
  nomina: number;
  availableBudget: number;
  /** Fecha de inicio de vigencia, en ISO. */
  joinedAt: string;
}

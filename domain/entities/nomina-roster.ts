import type { NominaArtistSummary, NominaScalability } from "@/domain/entities/nomina-artist";
import type { NominaBillingEntry } from "@/domain/entities/nomina-billing-entry";
import type { NominaSplitTerms } from "@/domain/entities/nomina-split-terms";

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
  /** Mínimo de shows y modelo de reparto, para repartir un ingreso nuevo desde la fila. */
  minShows: number;
  split: NominaSplitTerms;
  /** Ingresos registrados, para el acumulado del mes al repartir uno nuevo. */
  billing: NominaBillingEntry[];
}

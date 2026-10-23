import type { NominaSplitTerms } from "@/domain/entities/nomina-split-terms";

/** Configuración de nómina de un cliente inscrito en Nómina Plan. */
export interface NominaArtistConfig {
  clientId: string;
  /** Valor de un show, en COP. */
  nomina: number;
  minShows: number;
  /** Inicio de vigencia en formato `AAAA-MM-DD`. */
  startsOn: string;
  split: NominaSplitTerms;
}

import type { NominaArtistProfile } from "@/domain/entities/nomina-profile";
import type { NominaFinance } from "@/domain/entities/nomina-finance";
import type { NominaOverview } from "@/domain/entities/nomina-overview";
import type { NominaRosterEntry } from "@/domain/entities/nomina-roster";

/**
 * Port de lectura de la Nómina Plan. El dominio depende de esta abstracción y
 * no de la fuente concreta: hoy son datos de muestra y mañana una base real.
 * Las lecturas lanzan si la infraestructura falla.
 */
export interface NominaRepository {
  /** Resumen del mes en curso para el roster completo. */
  getOverview(): Promise<NominaOverview>;

  /** Artistas del roster en orden de alta. */
  listRoster(): Promise<NominaRosterEntry[]>;

  /** Perfil de un artista, o `null` si no existe. */
  getArtistProfile(artistId: string): Promise<NominaArtistProfile | null>;

  /** Finanzas del roster en el periodo por defecto (últimos 6 meses). */
  getFinance(): Promise<NominaFinance>;
}

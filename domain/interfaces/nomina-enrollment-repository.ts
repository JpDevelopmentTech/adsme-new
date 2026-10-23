import type { NominaArtistConfig } from "@/domain/entities/nomina-artist-config";
import type { NominaEligibleClient } from "@/domain/entities/nomina-eligible-client";
import type { NominaEnrollment } from "@/domain/entities/nomina-enrollment";
import type { NominaResult } from "@/domain/entities/nomina-enrollment-error";
import type { NominaSocialLink } from "@/domain/entities/nomina-social";
import type { NominaSplitTerms } from "@/domain/entities/nomina-split-terms";

/**
 * Port de las inscripciones en Nómina: qué clientes son artistas y con qué
 * configuración. Las lecturas lanzan si la infraestructura falla; las
 * escrituras devuelven `NominaResult` con los fallos esperables.
 */
export interface NominaEnrollmentRepository {
  /** Clientes inscritos, por inicio de vigencia. */
  listEnrollments(): Promise<NominaEnrollment[]>;

  /** Inscripción de un cliente, o `null` si no está en Nómina. */
  getEnrollment(clientId: string): Promise<NominaEnrollment | null>;

  /** Clientes que todavía no están en Nómina. */
  listEligibleClients(): Promise<NominaEligibleClient[]>;

  enroll(config: NominaArtistConfig): Promise<NominaResult<NominaArtistConfig>>;

  updateConfig(clientId: string, minShows: number, split: NominaSplitTerms): Promise<NominaResult<null>>;

  /** Redes del cliente: son identidad y se guardan en el propio cliente. */
  updateSocials(clientId: string, socials: NominaSocialLink[]): Promise<NominaResult<null>>;

  /** Saca al cliente de Nómina; el cliente se conserva. */
  unenroll(clientId: string): Promise<NominaResult<null>>;
}

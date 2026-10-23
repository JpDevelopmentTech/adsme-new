import type { Client } from "@/domain/entities/client";
import type { NominaEligibleClient } from "@/domain/entities/nomina-eligible-client";
import type { NominaEnrollment } from "@/domain/entities/nomina-enrollment";

export interface ClientNominaCardProps {
  client: Client;
  /** Inscripción en Nómina, o `null` si el cliente no está inscrito. */
  enrollment: NominaEnrollment | null;
}

export interface AddToNominaButtonProps {
  client: NominaEligibleClient;
}

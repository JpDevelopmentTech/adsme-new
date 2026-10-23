import type { NominaEnrollment } from "@/domain/entities/nomina-enrollment";
import type { NominaEnrollmentRepository } from "@/domain/interfaces/nomina-enrollment-repository";

/** Caso de uso: inscripción en Nómina de un cliente, o `null` si no está inscrito. */
export function createGetNominaEnrollment(repository: NominaEnrollmentRepository) {
  return async function getNominaEnrollment(clientId: string): Promise<NominaEnrollment | null> {
    return repository.getEnrollment(clientId);
  };
}

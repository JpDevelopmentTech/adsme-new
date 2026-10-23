import type { NominaEligibleClient } from "@/domain/entities/nomina-eligible-client";
import type { NominaEnrollmentRepository } from "@/domain/interfaces/nomina-enrollment-repository";

/** Caso de uso: clientes que se pueden inscribir en Nómina. */
export function createListNominaEligibleClients(repository: NominaEnrollmentRepository) {
  return async function listNominaEligibleClients(): Promise<NominaEligibleClient[]> {
    return repository.listEligibleClients();
  };
}

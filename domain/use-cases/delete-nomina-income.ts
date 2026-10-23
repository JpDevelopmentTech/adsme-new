import type { NominaResult } from "@/domain/entities/nomina-enrollment-error";
import type { NominaLedgerRepository } from "@/domain/interfaces/nomina-ledger-repository";

/** Caso de uso: eliminar un ingreso. */
export function createDeleteNominaIncome(repository: NominaLedgerRepository) {
  return async function deleteNominaIncome(id: string): Promise<NominaResult<null>> {
    return repository.deleteIncome(id);
  };
}

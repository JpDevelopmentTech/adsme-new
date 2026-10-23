import type { NominaResult } from "@/domain/entities/nomina-enrollment-error";
import type { NominaLedgerRepository } from "@/domain/interfaces/nomina-ledger-repository";

/** Caso de uso: eliminar un gasto. */
export function createDeleteNominaExpense(repository: NominaLedgerRepository) {
  return async function deleteNominaExpense(id: string): Promise<NominaResult<null>> {
    return repository.deleteExpense(id);
  };
}

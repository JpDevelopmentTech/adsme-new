import type { NominaResult } from "@/domain/entities/nomina-enrollment-error";
import type { NominaExpenseDraft } from "@/domain/entities/nomina-expense-draft";
import type { NominaLedgerRepository } from "@/domain/interfaces/nomina-ledger-repository";

/** Caso de uso: editar un gasto. */
export function createUpdateNominaExpense(repository: NominaLedgerRepository) {
  return async function updateNominaExpense(id: string, draft: NominaExpenseDraft): Promise<NominaResult<null>> {
    return repository.updateExpense(id, draft);
  };
}

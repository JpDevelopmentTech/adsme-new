import type { NominaResult } from "@/domain/entities/nomina-enrollment-error";
import type { NominaExpenseDraft } from "@/domain/entities/nomina-expense-draft";
import type { NominaLedgerRepository } from "@/domain/interfaces/nomina-ledger-repository";

/** Caso de uso: registrar un gasto (pago de Servicio o a un proveedor). */
export function createCreateNominaExpense(repository: NominaLedgerRepository) {
  return async function createNominaExpense(draft: NominaExpenseDraft): Promise<NominaResult<{ id: string }>> {
    return repository.createExpense(draft);
  };
}

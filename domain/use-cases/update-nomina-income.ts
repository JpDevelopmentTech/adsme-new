import type { NominaResult } from "@/domain/entities/nomina-enrollment-error";
import type { NominaIncomeDraft } from "@/domain/entities/nomina-income-draft";
import type { NominaLedgerRepository } from "@/domain/interfaces/nomina-ledger-repository";

/** Caso de uso: editar un ingreso; su reparto queda como se guarde ahora. */
export function createUpdateNominaIncome(repository: NominaLedgerRepository) {
  return async function updateNominaIncome(id: string, draft: NominaIncomeDraft): Promise<NominaResult<null>> {
    return repository.updateIncome(id, draft);
  };
}

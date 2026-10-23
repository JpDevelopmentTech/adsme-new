import type { NominaResult } from "@/domain/entities/nomina-enrollment-error";
import type { NominaIncomeDraft } from "@/domain/entities/nomina-income-draft";
import type { NominaLedgerRepository } from "@/domain/interfaces/nomina-ledger-repository";

/** Caso de uso: registrar un ingreso con el reparto que se calculó (o ajustó) al crearlo. */
export function createCreateNominaIncome(repository: NominaLedgerRepository) {
  return async function createNominaIncome(draft: NominaIncomeDraft): Promise<NominaResult<{ id: string }>> {
    return repository.createIncome(draft);
  };
}

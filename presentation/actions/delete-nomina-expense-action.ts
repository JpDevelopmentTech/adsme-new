"use server";

import { NOMINA_ENROLLMENT_ERRORS } from "@/constants/nomina-enrollment-messages.constants";
import { createDeleteNominaExpense } from "@/domain/use-cases/delete-nomina-expense";
import { loadNominaLedgerRepository } from "@/presentation/actions/nomina-action-context";
import { revalidateNominaPaths } from "@/presentation/actions/revalidate-nomina-paths";
import type { DeleteNominaRecordInput, NominaActionState } from "@/types/nomina-actions.types";
import { deleteLedgerRecordSchema } from "@/validators/nomina-ledger.validators";

/** Server Action que elimina un gasto de un artista. */
export async function deleteNominaExpenseAction(input: DeleteNominaRecordInput): Promise<NominaActionState> {
  const parsed = deleteLedgerRecordSchema.safeParse(input);
  if (!parsed.success) return { ok: false, message: NOMINA_ENROLLMENT_ERRORS.record_not_found };

  const result = await createDeleteNominaExpense(await loadNominaLedgerRepository())(parsed.data.id);
  if (!result.success) return { ok: false, message: NOMINA_ENROLLMENT_ERRORS[result.error.code] };

  revalidateNominaPaths(parsed.data.clientId);
  return { ok: true, message: null };
}

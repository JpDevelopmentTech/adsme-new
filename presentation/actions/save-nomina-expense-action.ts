"use server";

import { NOMINA_ENROLLMENT_ERRORS } from "@/constants/nomina-enrollment-messages.constants";
import { createCreateNominaExpense } from "@/domain/use-cases/create-nomina-expense";
import { createUpdateNominaExpense } from "@/domain/use-cases/update-nomina-expense";
import { loadNominaLedgerRepository } from "@/presentation/actions/nomina-action-context";
import { revalidateNominaPaths } from "@/presentation/actions/revalidate-nomina-paths";
import type { NominaActionState, SaveNominaExpenseInput } from "@/types/nomina-actions.types";
import { saveExpenseSchema } from "@/validators/nomina-ledger.validators";

/**
 * Server Action que registra o edita un gasto: un pago de Servicio o a un
 * proveedor, que se descuenta del Presupuesto de Ads o del Servicio.
 */
export async function saveNominaExpenseAction(input: SaveNominaExpenseInput): Promise<NominaActionState> {
  const parsed = saveExpenseSchema.safeParse(input);
  if (!parsed.success) return { ok: false, message: parsed.error.issues[0]?.message ?? NOMINA_ENROLLMENT_ERRORS.invalid_data };
  const { id, draft } = parsed.data;

  const repository = await loadNominaLedgerRepository();
  const result = id ? await createUpdateNominaExpense(repository)(id, draft) : await createCreateNominaExpense(repository)(draft);
  if (!result.success) return { ok: false, message: NOMINA_ENROLLMENT_ERRORS[result.error.code] };

  revalidateNominaPaths(draft.clientId);
  return { ok: true, message: null };
}

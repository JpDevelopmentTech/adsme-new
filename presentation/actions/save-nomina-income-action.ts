"use server";

import { NOMINA_ENROLLMENT_ERRORS } from "@/constants/nomina-enrollment-messages.constants";
import { createCreateNominaIncome } from "@/domain/use-cases/create-nomina-income";
import { createGetNominaEnrollment } from "@/domain/use-cases/get-nomina-enrollment";
import { createUpdateNominaIncome } from "@/domain/use-cases/update-nomina-income";
import { loadNominaEnrollmentRepository, loadNominaLedgerRepository } from "@/presentation/actions/nomina-action-context";
import { revalidateNominaPaths } from "@/presentation/actions/revalidate-nomina-paths";
import type { NominaActionState, SaveNominaIncomeInput } from "@/types/nomina-actions.types";
import { saveIncomeSchema } from "@/validators/nomina-ledger.validators";

/**
 * Server Action que registra o edita un ingreso con el reparto que se calculó
 * (o ajustó a mano) en el modal: queda congelado como en el original. Si el
 * Servicio va «asumido» lo decide la configuración guardada del artista, no el
 * navegador.
 */
export async function saveNominaIncomeAction(input: SaveNominaIncomeInput): Promise<NominaActionState> {
  const parsed = saveIncomeSchema.safeParse(input);
  if (!parsed.success) return { ok: false, message: parsed.error.issues[0]?.message ?? NOMINA_ENROLLMENT_ERRORS.invalid_data };
  const { id, draft } = parsed.data;

  const enrollment = await createGetNominaEnrollment(await loadNominaEnrollmentRepository())(draft.clientId);
  if (!enrollment) return { ok: false, message: NOMINA_ENROLLMENT_ERRORS.not_enrolled };
  const { split } = enrollment.config;
  const serviceAssumed = draft.concept !== "inversion" && split.hasService && split.servicePayer === "adsme";
  const record = { ...draft, serviceAssumed };

  const repository = await loadNominaLedgerRepository();
  const result = id ? await createUpdateNominaIncome(repository)(id, record) : await createCreateNominaIncome(repository)(record);
  if (!result.success) return { ok: false, message: NOMINA_ENROLLMENT_ERRORS[result.error.code] };

  revalidateNominaPaths(draft.clientId);
  return { ok: true, message: null };
}

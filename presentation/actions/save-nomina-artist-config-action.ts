"use server";

import { NOMINA_ENROLLMENT_ERRORS, NOMINA_NOT_VIABLE } from "@/constants/nomina-enrollment-messages.constants";
import { createGetNominaEnrollment } from "@/domain/use-cases/get-nomina-enrollment";
import { createUpdateNominaArtistConfig } from "@/domain/use-cases/update-nomina-artist-config";
import { loadNominaEnrollmentRepository } from "@/presentation/actions/nomina-action-context";
import { revalidateNominaPaths } from "@/presentation/actions/revalidate-nomina-paths";
import type { NominaActionState, SaveNominaConfigInput } from "@/types/nomina-actions.types";
import { isSplitViable } from "@/utils/is-split-viable";
import { configSchema } from "@/validators/nomina-artist.validators";

/**
 * Server Action que guarda el mínimo de shows y el modelo de reparto de un
 * artista. La viabilidad se revisa con la nómina guardada, no con la del cliente.
 */
export async function saveNominaArtistConfigAction(input: SaveNominaConfigInput): Promise<NominaActionState> {
  const parsed = configSchema.safeParse(input);
  if (!parsed.success) return { ok: false, message: parsed.error.issues[0]?.message ?? NOMINA_ENROLLMENT_ERRORS.invalid_data };
  const { data } = parsed;

  const repository = await loadNominaEnrollmentRepository();
  const enrollment = await createGetNominaEnrollment(repository)(data.clientId);
  if (!enrollment) return { ok: false, message: NOMINA_ENROLLMENT_ERRORS.not_enrolled };
  if (!isSplitViable(data.split, enrollment.config.nomina, data.minShows)) return { ok: false, message: NOMINA_NOT_VIABLE };

  const result = await createUpdateNominaArtistConfig(repository)(data.clientId, data.minShows, data.split);
  if (!result.success) return { ok: false, message: NOMINA_ENROLLMENT_ERRORS[result.error.code] };

  revalidateNominaPaths(data.clientId);
  return { ok: true, message: null };
}

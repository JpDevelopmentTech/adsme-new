"use server";

import { NOMINA_ENROLLMENT_ERRORS, NOMINA_NOT_VIABLE } from "@/constants/nomina-enrollment-messages.constants";
import { createEnrollNominaArtist } from "@/domain/use-cases/enroll-nomina-artist";
import { loadNominaEnrollmentRepository } from "@/presentation/actions/nomina-action-context";
import { revalidateNominaPaths } from "@/presentation/actions/revalidate-nomina-paths";
import type { EnrollNominaArtistInput, NominaActionState } from "@/types/nomina-actions.types";
import { isSplitViable } from "@/utils/is-split-viable";
import { enrollSchema } from "@/validators/nomina-artist.validators";

/**
 * Server Action que inscribe un cliente en Nómina con su configuración.
 * Valida con Zod y vuelve a revisar la viabilidad del modelo en el servidor.
 */
export async function enrollNominaArtistAction(input: EnrollNominaArtistInput): Promise<NominaActionState> {
  const parsed = enrollSchema.safeParse(input);
  if (!parsed.success) return { ok: false, message: parsed.error.issues[0]?.message ?? NOMINA_ENROLLMENT_ERRORS.invalid_data };
  const { data } = parsed;
  if (!isSplitViable(data.split, data.nomina, data.minShows)) return { ok: false, message: NOMINA_NOT_VIABLE };

  const repository = await loadNominaEnrollmentRepository();
  const result = await createEnrollNominaArtist(repository)(data);
  if (!result.success) return { ok: false, message: NOMINA_ENROLLMENT_ERRORS[result.error.code] };

  revalidateNominaPaths(data.clientId);
  return { ok: true, message: null };
}

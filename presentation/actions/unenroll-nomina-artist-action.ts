"use server";

import { NOMINA_ENROLLMENT_ERRORS } from "@/constants/nomina-enrollment-messages.constants";
import { createUnenrollNominaArtist } from "@/domain/use-cases/unenroll-nomina-artist";
import { loadNominaEnrollmentRepository } from "@/presentation/actions/nomina-action-context";
import { revalidateNominaPaths } from "@/presentation/actions/revalidate-nomina-paths";
import type { NominaActionState } from "@/types/nomina-actions.types";
import { unenrollSchema } from "@/validators/nomina-artist.validators";

/** Server Action que saca a un artista de Nómina; el cliente se conserva en Clientes. */
export async function unenrollNominaArtistAction(clientId: string): Promise<NominaActionState> {
  const parsed = unenrollSchema.safeParse({ clientId });
  if (!parsed.success) return { ok: false, message: NOMINA_ENROLLMENT_ERRORS.client_not_found };

  const repository = await loadNominaEnrollmentRepository();
  const result = await createUnenrollNominaArtist(repository)(parsed.data.clientId);
  if (!result.success) return { ok: false, message: NOMINA_ENROLLMENT_ERRORS[result.error.code] };

  revalidateNominaPaths(parsed.data.clientId);
  return { ok: true, message: null };
}

"use server";

import { NOMINA_ENROLLMENT_ERRORS } from "@/constants/nomina-enrollment-messages.constants";
import { createUpdateNominaArtistSocials } from "@/domain/use-cases/update-nomina-artist-socials";
import { loadNominaEnrollmentRepository } from "@/presentation/actions/nomina-action-context";
import { revalidateNominaPaths } from "@/presentation/actions/revalidate-nomina-paths";
import type { NominaActionState, SaveNominaSocialsInput } from "@/types/nomina-actions.types";
import { socialsSchema } from "@/validators/nomina-artist.validators";

/** Server Action que guarda las redes del artista en su ficha de cliente. */
export async function saveNominaArtistSocialsAction(input: SaveNominaSocialsInput): Promise<NominaActionState> {
  const parsed = socialsSchema.safeParse(input);
  if (!parsed.success) return { ok: false, message: parsed.error.issues[0]?.message ?? NOMINA_ENROLLMENT_ERRORS.invalid_data };

  const repository = await loadNominaEnrollmentRepository();
  const result = await createUpdateNominaArtistSocials(repository)(parsed.data.clientId, parsed.data.socials);
  if (!result.success) return { ok: false, message: NOMINA_ENROLLMENT_ERRORS[result.error.code] };

  revalidateNominaPaths(parsed.data.clientId);
  return { ok: true, message: null };
}

"use server";

import { NOMINA_ENROLLMENT_ERRORS, NOMINA_PHOTO_ERRORS } from "@/constants/nomina-enrollment-messages.constants";
import { NOMINA_PHOTO_FIELDS } from "@/constants/nomina-photo.constants";
import { CLIENT_AVATARS_BUCKET } from "@/constants/storage.constants";
import { createUpdateNominaArtistPhoto } from "@/domain/use-cases/update-nomina-artist-photo";
import { removeFromBucket, uploadToBucket } from "@/infrastructure/storage/bucket-storage";
import { loadNominaPhotoContext } from "@/presentation/actions/nomina-action-context";
import { revalidateNominaPaths } from "@/presentation/actions/revalidate-nomina-paths";
import type { NominaActionState } from "@/types/nomina-actions.types";
import { validateAvatarFile } from "@/utils/validate-avatar-file";
import { photoSchema } from "@/validators/nomina-artist.validators";

/**
 * Server Action que cambia la foto del artista desde su perfil de Nómina. Es
 * la misma foto de su ficha de cliente: sube la nueva al bucket de avatares,
 * la guarda en el cliente y solo entonces borra la anterior. La foto anterior
 * se lee del servidor, nunca del formulario.
 */
export async function saveNominaArtistPhotoAction(formData: FormData): Promise<NominaActionState> {
  const parsed = photoSchema.safeParse({ clientId: formData.get(NOMINA_PHOTO_FIELDS.clientId) });
  if (!parsed.success) return { ok: false, message: NOMINA_ENROLLMENT_ERRORS.invalid_data };

  const file = formData.get(NOMINA_PHOTO_FIELDS.photo);
  if (!(file instanceof File) || file.size === 0) return { ok: false, message: NOMINA_PHOTO_ERRORS.missingFile };
  const fileError = validateAvatarFile(file);
  if (fileError) return { ok: false, message: fileError };

  const { clientId } = parsed.data;
  const { supabase, userId, repository } = await loadNominaPhotoContext();
  const enrollment = await repository.getEnrollment(clientId);
  if (!enrollment) return { ok: false, message: NOMINA_ENROLLMENT_ERRORS.not_enrolled };

  let url: string;
  try {
    url = await uploadToBucket(supabase, CLIENT_AVATARS_BUCKET, userId, file);
  } catch {
    return { ok: false, message: NOMINA_PHOTO_ERRORS.storageFailed };
  }

  const result = await createUpdateNominaArtistPhoto(repository)(clientId, url);
  if (!result.success) {
    await removeFromBucket(supabase, CLIENT_AVATARS_BUCKET, url);
    return { ok: false, message: NOMINA_ENROLLMENT_ERRORS[result.error.code] };
  }

  await removeFromBucket(supabase, CLIENT_AVATARS_BUCKET, enrollment.avatarUrl);
  revalidateNominaPaths(clientId);
  return { ok: true, message: null };
}

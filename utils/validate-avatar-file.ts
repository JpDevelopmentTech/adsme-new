import {
  AVATAR_ACCEPTED_TYPES,
  AVATAR_MAX_SIZE_BYTES,
} from "@/constants/client-form.constants";
import { AVATAR_ERRORS } from "@/constants/client-form-copy.constants";

type AcceptedType = (typeof AVATAR_ACCEPTED_TYPES)[number];

/** Devuelve el mensaje de error de la imagen elegida, o null si es válida. */
export function validateAvatarFile(file: File): string | null {
  if (!AVATAR_ACCEPTED_TYPES.includes(file.type as AcceptedType)) {
    return AVATAR_ERRORS.type(file.type);
  }

  if (file.size > AVATAR_MAX_SIZE_BYTES) {
    return AVATAR_ERRORS.size;
  }

  return null;
}

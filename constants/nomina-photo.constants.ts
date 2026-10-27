import { AVATAR_ACCEPTED_TYPES } from "@/constants/client-form.constants";

/** Campos del formulario con el que se cambia la foto del artista. */
export const NOMINA_PHOTO_FIELDS = { clientId: "clientId", photo: "photo" } as const;

/** Tipos que ofrece el selector de archivos: los mismos que acepta el bucket. */
export const NOMINA_PHOTO_ACCEPT = AVATAR_ACCEPTED_TYPES.join(",");

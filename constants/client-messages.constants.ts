import type { ClientErrorCode } from "@/domain/entities/client-error";

/** Mensajes mostrados al usuario por cada motivo de fallo al guardar un cliente. */
export const CLIENT_ERROR_MESSAGES: Record<ClientErrorCode, string> = {
  duplicate_handle: "Ya tienes un cliente con ese @usuario.",
  not_found: "El cliente ya no existe.",
  invalid_data: "Revisa los datos: alguno no cumple el formato esperado.",
  storage_failed: "No pudimos subir la foto. Inténtalo de nuevo.",
  unknown: "No pudimos guardar el cliente. Inténtalo de nuevo.",
};

export const CLIENT_DELETE_ERROR = "No pudimos eliminar el cliente.";

/** Nombres de los campos auxiliares del formulario dentro del FormData. */
export const CLIENT_FORM_FIELDS = {
  clientId: "clientId",
  avatar: "avatar",
  previousAvatarUrl: "previousAvatarUrl",
  removeAvatar: "removeAvatar",
} as const;

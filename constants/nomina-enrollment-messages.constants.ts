import type { NominaEnrollmentErrorCode } from "@/domain/entities/nomina-enrollment-error";

/** Mensajes de las acciones de Nómina, por motivo de fallo. */
export const NOMINA_ENROLLMENT_ERRORS: Record<NominaEnrollmentErrorCode, string> = {
  already_enrolled: "Este cliente ya está en Nómina.",
  client_not_found: "No encontramos ese cliente. Recarga la página e inténtalo de nuevo.",
  not_enrolled: "Este artista ya no está en Nómina.",
  record_not_found: "Ese movimiento ya no existe. Recarga la página.",
  invalid_data: "Revisa los datos: hay valores fuera de lo permitido.",
  unknown: "No se pudo guardar. Inténtalo de nuevo.",
};

/** Fallos al cambiar la foto del artista desde su perfil. */
export const NOMINA_PHOTO_ERRORS = {
  missingFile: "Elige una imagen para la foto.",
  storageFailed: "No pudimos subir la foto. Inténtalo de nuevo.",
} as const;

/** Cuando el modelo de reparto no pasa la revisión de viabilidad en el servidor. */
export const NOMINA_NOT_VIABLE = "El modelo de reparto no es viable. Revisa el detalle antes de guardar.";

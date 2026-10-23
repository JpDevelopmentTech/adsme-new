import type { Result } from "@/domain/entities/result";

/** Motivos de fallo al inscribir o editar un artista que la UI distingue. */
export type NominaEnrollmentErrorCode = "already_enrolled" | "client_not_found" | "not_enrolled" | "record_not_found" | "invalid_data" | "unknown";

export interface NominaEnrollmentError {
  code: NominaEnrollmentErrorCode;
}

export type NominaResult<TValue> = Result<TValue, NominaEnrollmentError>;

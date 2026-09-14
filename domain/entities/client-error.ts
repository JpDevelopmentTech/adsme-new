import type { Result } from "@/domain/entities/result";

/** Motivos de fallo al escribir un cliente que la UI necesita distinguir. */
export type ClientErrorCode =
  | "duplicate_handle"
  | "not_found"
  | "invalid_data"
  | "storage_failed"
  | "unknown";

export interface ClientError {
  code: ClientErrorCode;
}

export type ClientResult<TValue> = Result<TValue, ClientError>;

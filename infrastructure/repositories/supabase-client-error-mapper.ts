import type { PostgrestError } from "@supabase/supabase-js";
import type { ClientError } from "@/domain/entities/client-error";

/** Violación de índice único en PostgreSQL. */
const UNIQUE_VIOLATION = "23505";

/** Violación de CHECK: los datos no cumplen las restricciones de la tabla. */
const CHECK_VIOLATION = "23514";

/** Normaliza un error de PostgREST al error de dominio equivalente. */
export function toClientError(error: PostgrestError | null): ClientError {
  if (error?.code === UNIQUE_VIOLATION) return { code: "duplicate_handle" };
  if (error?.code === CHECK_VIOLATION) return { code: "invalid_data" };

  return { code: "unknown" };
}

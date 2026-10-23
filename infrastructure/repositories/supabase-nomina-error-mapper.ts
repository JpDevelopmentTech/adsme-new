import type { PostgrestError } from "@supabase/supabase-js";
import type { NominaEnrollmentError } from "@/domain/entities/nomina-enrollment-error";

/** Normaliza un error de PostgREST al error de dominio de Nómina. */
export function toNominaError(error: PostgrestError | null): NominaEnrollmentError {
  if (error?.code === "23505") return { code: "already_enrolled" };
  if (error?.code === "23503") return { code: "client_not_found" };
  if (error?.code === "23514") return { code: "invalid_data" };
  return { code: "unknown" };
}

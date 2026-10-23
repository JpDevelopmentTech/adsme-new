import type { PostgrestError } from "@supabase/supabase-js";
import type { NominaEnrollmentError } from "@/domain/entities/nomina-enrollment-error";

/** Normaliza un error de PostgREST al escribir ingresos o gastos: sin inscripción no hay a quién asignarlos. */
export function toNominaLedgerError(error: PostgrestError): NominaEnrollmentError {
  if (error.code === "23503") return { code: "not_enrolled" };
  if (error.code === "23514" || error.code === "22P02") return { code: "invalid_data" };
  return { code: "unknown" };
}

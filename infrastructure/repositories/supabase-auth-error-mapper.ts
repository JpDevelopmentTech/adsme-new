import { AuthError as SupabaseAuthError } from "@supabase/supabase-js";
import type { AuthError, AuthErrorCode } from "@/domain/entities/auth-error";

const ERROR_CODE_MAP: Record<string, AuthErrorCode> = {
  invalid_credentials: "invalid_credentials",
  email_not_confirmed: "email_not_confirmed",
  over_request_rate_limit: "rate_limited",
  over_email_send_rate_limit: "rate_limited",
  provider_disabled: "provider_disabled",
  validation_failed: "invalid_credentials",
};

/**
 * Normaliza un error de Supabase Auth al error de dominio equivalente.
 * Cualquier código desconocido cae en `unknown` para no filtrar detalles del proveedor.
 */
export function toAuthError(error: unknown): AuthError {
  if (error instanceof SupabaseAuthError && error.code) {
    return { code: ERROR_CODE_MAP[error.code] ?? "unknown" };
  }

  return { code: "unknown" };
}

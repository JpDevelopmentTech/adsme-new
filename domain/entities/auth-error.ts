/** Motivos de fallo de autenticación que la UI necesita distinguir. */
export type AuthErrorCode =
  | "invalid_credentials"
  | "email_not_confirmed"
  | "rate_limited"
  | "provider_disabled"
  | "unknown";

/** Error de autenticación normalizado, independiente del proveedor que lo originó. */
export interface AuthError {
  code: AuthErrorCode;
}

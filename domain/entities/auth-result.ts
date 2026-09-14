import type { AuthError } from "@/domain/entities/auth-error";

/** Resultado de una operación de autenticación: éxito con payload o fallo tipado. */
export type AuthResult<TValue> =
  | { success: true; value: TValue }
  | { success: false; error: AuthError };

import type { AuthResult } from "@/domain/entities/auth-result";
import type { AuthRepository } from "@/domain/interfaces/auth-repository";

/**
 * Caso de uso: arrancar el flujo OAuth de Google Workspace.
 * Devuelve la URL de consentimiento; la redirección la ejecuta la capa de presentación.
 */
export function createStartGoogleSignIn(repository: AuthRepository) {
  return async function startGoogleSignIn(
    callbackUrl: string,
  ): Promise<AuthResult<string>> {
    return repository.createGoogleAuthorizationUrl(callbackUrl);
  };
}

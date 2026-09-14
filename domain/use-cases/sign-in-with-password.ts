import type { AuthResult } from "@/domain/entities/auth-result";
import type { AuthUser } from "@/domain/entities/auth-user";
import type { PasswordCredentials } from "@/domain/entities/password-credentials";
import type { AuthRepository } from "@/domain/interfaces/auth-repository";

/**
 * Caso de uso: iniciar sesión con correo y contraseña.
 * Recibe el repositorio por inyección para mantener el dominio libre de infraestructura.
 */
export function createSignInWithPassword(repository: AuthRepository) {
  return async function signInWithPassword(
    credentials: PasswordCredentials,
  ): Promise<AuthResult<AuthUser>> {
    return repository.signInWithPassword({
      email: credentials.email.trim().toLowerCase(),
      password: credentials.password,
    });
  };
}

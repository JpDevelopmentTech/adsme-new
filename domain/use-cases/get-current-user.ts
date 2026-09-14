import type { AuthUser } from "@/domain/entities/auth-user";
import type { AuthRepository } from "@/domain/interfaces/auth-repository";

/** Caso de uso: obtener el usuario de la sesión vigente. */
export function createGetCurrentUser(repository: AuthRepository) {
  return async function getCurrentUser(): Promise<AuthUser | null> {
    return repository.getCurrentUser();
  };
}

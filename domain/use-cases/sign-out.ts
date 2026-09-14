import type { AuthRepository } from "@/domain/interfaces/auth-repository";

/** Caso de uso: cerrar la sesión vigente. */
export function createSignOut(repository: AuthRepository) {
  return async function signOut(): Promise<void> {
    await repository.signOut();
  };
}

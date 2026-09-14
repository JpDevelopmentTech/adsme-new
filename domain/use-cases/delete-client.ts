import type { ClientResult } from "@/domain/entities/client-error";
import type { ClientRepository } from "@/domain/interfaces/client-repository";

/** Caso de uso: eliminar un cliente del usuario autenticado. */
export function createDeleteClient(repository: ClientRepository) {
  return async function deleteClient(
    clientId: string,
  ): Promise<ClientResult<null>> {
    return repository.deleteClient(clientId);
  };
}

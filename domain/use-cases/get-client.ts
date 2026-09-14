import type { Client } from "@/domain/entities/client";
import type { ClientRepository } from "@/domain/interfaces/client-repository";

/** Caso de uso: obtener un cliente por su identificador. */
export function createGetClient(repository: ClientRepository) {
  return async function getClient(clientId: string): Promise<Client | null> {
    return repository.getClient(clientId);
  };
}

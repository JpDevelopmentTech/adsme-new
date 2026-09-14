import type { Client } from "@/domain/entities/client";
import type { ClientDraft } from "@/domain/entities/client-draft";
import type { ClientResult } from "@/domain/entities/client-error";
import type { ClientRepository } from "@/domain/interfaces/client-repository";
import { normalizeClientDraft } from "@/domain/use-cases/normalize-client-draft";

/** Caso de uso: actualizar los datos de un cliente existente. */
export function createUpdateClient(repository: ClientRepository) {
  return async function updateClient(
    clientId: string,
    draft: ClientDraft,
  ): Promise<ClientResult<Client>> {
    return repository.updateClient(clientId, normalizeClientDraft(draft));
  };
}

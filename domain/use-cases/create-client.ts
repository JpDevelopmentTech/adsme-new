import type { Client } from "@/domain/entities/client";
import type { ClientDraft } from "@/domain/entities/client-draft";
import type { ClientResult } from "@/domain/entities/client-error";
import type { ClientRepository } from "@/domain/interfaces/client-repository";
import { normalizeClientDraft } from "@/domain/use-cases/normalize-client-draft";

/** Caso de uso: dar de alta un cliente. */
export function createCreateClient(repository: ClientRepository) {
  return async function createClient(
    draft: ClientDraft,
  ): Promise<ClientResult<Client>> {
    return repository.createClient(normalizeClientDraft(draft));
  };
}

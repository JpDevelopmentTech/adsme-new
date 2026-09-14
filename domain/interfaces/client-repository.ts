import type { Client } from "@/domain/entities/client";
import type { ClientDraft } from "@/domain/entities/client-draft";
import type { ClientResult } from "@/domain/entities/client-error";
import type { ClientRecord } from "@/domain/entities/client-listing";
import type { ClientListQuery } from "@/domain/entities/client-query";

/**
 * Port de clientes. El dominio depende de esta abstracción, nunca de la fuente
 * de datos concreta.
 *
 * Las lecturas lanzan si la infraestructura falla; las escrituras devuelven
 * `ClientResult` porque tienen fallos esperables que la UI debe explicar.
 */
export interface ClientRepository {
  /**
   * Clientes del usuario autenticado que cumplen la consulta, ya ordenados y
   * con el resumen de sus trabajos para que el listado los agregue.
   */
  listClients(query: ClientListQuery): Promise<ClientRecord[]>;

  /** Cliente por identificador, o `null` si no existe o no pertenece al usuario. */
  getClient(clientId: string): Promise<Client | null>;

  createClient(draft: ClientDraft): Promise<ClientResult<Client>>;

  updateClient(clientId: string, draft: ClientDraft): Promise<ClientResult<Client>>;

  deleteClient(clientId: string): Promise<ClientResult<null>>;
}

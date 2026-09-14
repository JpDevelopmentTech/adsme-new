import type { ClientListing } from "@/domain/entities/client-listing";
import type { ClientListQuery } from "@/domain/entities/client-query";
import { DEFAULT_CLIENT_LIST_QUERY } from "@/domain/entities/client-query";
import type { ClientRepository } from "@/domain/interfaces/client-repository";
import { buildClientListing } from "@/utils/build-client-listing";

/**
 * Caso de uso: listar los clientes del usuario autenticado según la consulta,
 * con la inversión del mes y su reparto por plataforma ya calculados.
 * Recibe el momento de referencia en vez de leer el reloj, para que servidor y
 * cliente rendericen el mismo mes.
 */
export function createListClients(repository: ClientRepository) {
  return async function listClients(
    query: ClientListQuery = DEFAULT_CLIENT_LIST_QUERY,
    now: Date = new Date(),
  ): Promise<ClientListing[]> {
    const records = await repository.listClients({
      ...query,
      search: query.search.trim(),
    });

    return records.map((record) => buildClientListing(record, now));
  };
}

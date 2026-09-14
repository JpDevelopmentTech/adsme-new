import type { SupabaseClient } from "@supabase/supabase-js";
import type { Client } from "@/domain/entities/client";
import type { ClientRecord } from "@/domain/entities/client-listing";
import type { ClientDraft } from "@/domain/entities/client-draft";
import type { ClientResult } from "@/domain/entities/client-error";
import type { ClientListQuery } from "@/domain/entities/client-query";
import type { ClientRepository } from "@/domain/interfaces/client-repository";
import {
  buildSearchFilter,
  resolveSort,
} from "@/infrastructure/repositories/client-query-builder";
import {
  CLIENT_COLUMNS,
  toClient,
  toClientRecord,
  type ClientRow,
} from "@/infrastructure/repositories/client-row";
import { toClientError } from "@/infrastructure/repositories/supabase-client-error-mapper";
import { toClientRow } from "@/infrastructure/repositories/to-client-row";
import { isUuid } from "@/utils/is-uuid";

const CLIENTS_TABLE = "clients";

/**
 * Implementación del port de clientes sobre Supabase.
 * El aislamiento entre usuarios lo garantizan las políticas RLS de la tabla,
 * no los filtros de estas consultas.
 */
export function createSupabaseClientRepository(
  supabase: SupabaseClient,
): ClientRepository {
  return {
    async listClients(query: ClientListQuery): Promise<ClientRecord[]> {
      const sort = resolveSort(query.sort);
      let request = supabase.from(CLIENTS_TABLE).select(CLIENT_COLUMNS);

      if (query.search) request = request.or(buildSearchFilter(query));
      if (query.kind !== "all") request = request.eq("kind", query.kind);

      const { data, error } = await request
        .order(sort.column, { ascending: sort.ascending })
        .returns<ClientRow[]>();

      if (error) throw error;

      const clients = data.map(toClientRecord);

      // `status` se deriva de los trabajos embebidos, así que el filtro no puede
      // bajar al `select`: Postgres no conoce la regla que los agrega.
      return query.status === "all"
        ? clients
        : clients.filter((client) => client.status === query.status);
    },

    async getClient(clientId: string): Promise<Client | null> {
      // Un id con otro formato no puede existir y Postgres lo rechazaría con 22P02.
      if (!isUuid(clientId)) return null;

      const { data, error } = await supabase
        .from(CLIENTS_TABLE)
        .select(CLIENT_COLUMNS)
        .eq("id", clientId)
        .maybeSingle<ClientRow>();

      if (error) throw error;

      return data ? toClient(data) : null;
    },

    async createClient(draft: ClientDraft): Promise<ClientResult<Client>> {
      const { data, error } = await supabase
        .from(CLIENTS_TABLE)
        .insert(toClientRow(draft))
        .select(CLIENT_COLUMNS)
        .single<ClientRow>();

      if (error || !data) {
        return { success: false, error: toClientError(error) };
      }

      return { success: true, value: toClient(data) };
    },

    async updateClient(
      clientId: string,
      draft: ClientDraft,
    ): Promise<ClientResult<Client>> {
      const { data, error } = await supabase
        .from(CLIENTS_TABLE)
        .update(toClientRow(draft))
        .eq("id", clientId)
        .select(CLIENT_COLUMNS)
        .maybeSingle<ClientRow>();

      if (error) return { success: false, error: toClientError(error) };
      if (!data) return { success: false, error: { code: "not_found" } };

      return { success: true, value: toClient(data) };
    },

    async deleteClient(clientId: string): Promise<ClientResult<null>> {
      const { error } = await supabase
        .from(CLIENTS_TABLE)
        .delete()
        .eq("id", clientId);

      if (error) return { success: false, error: toClientError(error) };

      return { success: true, value: null };
    },
  };
}

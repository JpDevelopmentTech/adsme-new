import type { SupabaseClient } from "@supabase/supabase-js";
import type {
  Connection,
  ConnectionDraft,
  ConnectionPlatform,
  ConnectionStatus,
  ConnectionTokenUpdate,
} from "@/domain/entities/connection";
import { decryptToken, encryptToken } from "@/infrastructure/security/token-cipher";

const CONNECTIONS_TABLE = "connections";

interface ConnectionRow {
  id: string;
  platform: string;
  account_label: string;
  external_account_id: string;
  login_customer_id: string | null;
  access_token: string;
  refresh_token: string | null;
  token_expires_at: string | null;
  scopes: string;
  status: string;
  connected_by: string | null;
  last_synced_at: string | null;
  extra_json: Record<string, unknown> | null;
}

const CONNECTION_COLUMNS =
  "id, platform, account_label, external_account_id, login_customer_id, access_token, refresh_token, token_expires_at, scopes, status, connected_by, last_synced_at, extra_json";

/** Descifra los tokens al salir de la base de datos. */
function toConnection(row: ConnectionRow): Connection | null {
  const accessToken = decryptToken(row.access_token);
  if (!accessToken) return null;

  return {
    id: row.id,
    platform: row.platform as ConnectionPlatform,
    accountLabel: row.account_label,
    externalAccountId: row.external_account_id,
    loginCustomerId: row.login_customer_id,
    accessToken,
    refreshToken: row.refresh_token ? decryptToken(row.refresh_token) : null,
    tokenExpiresAt: row.token_expires_at,
    scopes: row.scopes,
    status: row.status as ConnectionStatus,
    connectedBy: row.connected_by,
    lastSyncedAt: row.last_synced_at,
    extra: row.extra_json ?? {},
  };
}

export function createSupabaseConnectionRepository(supabase: SupabaseClient) {
  return {
    async listConnections(): Promise<Connection[]> {
      const { data, error } = await supabase
        .from(CONNECTIONS_TABLE)
        .select(CONNECTION_COLUMNS)
        .order("created_at", { ascending: true })
        .returns<ConnectionRow[]>();

      if (error) throw error;

      return data.map(toConnection).filter((item): item is Connection => item !== null);
    },

    /**
     * Todas las cuentas conectadas de una plataforma, de la más antigua a la
     * más reciente. La clave única de la tabla es `(owner_id, platform,
     * external_account_id)`, así que una misma plataforma puede tener varias
     * filas: una por cuenta publicitaria elegida.
     */
    async listByPlatform(platform: ConnectionPlatform): Promise<Connection[]> {
      const { data, error } = await supabase
        .from(CONNECTIONS_TABLE)
        .select(CONNECTION_COLUMNS)
        .eq("platform", platform)
        .order("created_at", { ascending: true })
        .returns<ConnectionRow[]>();

      if (error) return [];

      return data.map(toConnection).filter((item): item is Connection => item !== null);
    },

    /**
     * La primera conexión de una plataforma. Solo sirve donde la cuenta es
     * única por definición, como Google Ads: Meta y TikTok admiten varias y
     * quedarse con una dejaría fuera las demás.
     */
    async findByPlatform(
      platform: ConnectionPlatform,
    ): Promise<Connection | null> {
      const { data, error } = await supabase
        .from(CONNECTIONS_TABLE)
        .select(CONNECTION_COLUMNS)
        .eq("platform", platform)
        .order("created_at", { ascending: true })
        .limit(1)
        .maybeSingle<ConnectionRow>();

      if (error || !data) return null;

      return toConnection(data);
    },

    /**
     * Da de alta o actualiza la conexión, cifrando los tokens antes de guardar.
     * El `refresh_token` se omite cuando no viene en vez de escribirse a `null`:
     * las plataformas que lo entregan solo lo hacen en la primera autorización,
     * y sobrescribirlo con `null` dejaría la conexión sin poder renovarse.
     */
    async saveConnection(
      draft: ConnectionDraft,
      connectedBy: string,
    ): Promise<boolean> {
      const { error } = await supabase.from(CONNECTIONS_TABLE).upsert(
        {
          platform: draft.platform,
          account_label: draft.accountLabel,
          external_account_id: draft.externalAccountId,
          login_customer_id: draft.loginCustomerId ?? null,
          access_token: encryptToken(draft.accessToken),
          ...(draft.refreshToken
            ? { refresh_token: encryptToken(draft.refreshToken) }
            : {}),
          token_expires_at: draft.tokenExpiresAt,
          scopes: draft.scopes,
          status: "conectado",
          connected_by: connectedBy,
          extra_json: draft.extra ?? {},
        },
        { onConflict: "owner_id,platform,external_account_id" },
      );

      return !error;
    },

    /**
     * Renueva el acceso sin volver a pedir permiso al usuario. Solo escribe el
     * `refresh_token` cuando la plataforma devuelve uno nuevo: la mayoría no lo
     * reenvía al refrescar y hay que conservar el que ya está guardado.
     */
    async updateTokens(
      connectionId: string,
      tokens: ConnectionTokenUpdate,
    ): Promise<boolean> {
      const { error } = await supabase
        .from(CONNECTIONS_TABLE)
        .update({
          access_token: encryptToken(tokens.accessToken),
          ...(tokens.refreshToken
            ? { refresh_token: encryptToken(tokens.refreshToken) }
            : {}),
          token_expires_at: tokens.tokenExpiresAt,
          status: "conectado",
        })
        .eq("id", connectionId);

      return !error;
    },

    async setStatus(
      connectionId: string,
      status: ConnectionStatus,
    ): Promise<void> {
      await supabase
        .from(CONNECTIONS_TABLE)
        .update({ status })
        .eq("id", connectionId);
    },

    async markSynced(connectionId: string): Promise<void> {
      await supabase
        .from(CONNECTIONS_TABLE)
        .update({ last_synced_at: new Date().toISOString() })
        .eq("id", connectionId);
    },

    async deleteConnection(connectionId: string): Promise<void> {
      await supabase.from(CONNECTIONS_TABLE).delete().eq("id", connectionId);
    },
  };
}

export type ConnectionRepository = ReturnType<
  typeof createSupabaseConnectionRepository
>;

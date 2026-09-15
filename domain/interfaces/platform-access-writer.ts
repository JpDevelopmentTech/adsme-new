import type {
  Connection,
  ConnectionDraft,
  ConnectionPlatform,
  ConnectionTokenUpdate,
} from "@/domain/entities/connection";

/**
 * Port de escritura del acceso concedido por una plataforma: lo mínimo para
 * dejar constancia de una autorización nueva sin poder borrar nada.
 */
export interface PlatformAccessWriter {
  listByPlatform(platform: ConnectionPlatform): Promise<Connection[]>;
  saveConnection(draft: ConnectionDraft, connectedBy: string): Promise<boolean>;
  updateTokens(
    connectionId: string,
    tokens: ConnectionTokenUpdate,
  ): Promise<boolean>;
}

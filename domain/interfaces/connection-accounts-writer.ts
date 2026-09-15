import type {
  Connection,
  ConnectionDraft,
  ConnectionPlatform,
} from "@/domain/entities/connection";

/**
 * Port con el que se decide qué cuentas de una plataforma quedan conectadas.
 * Separado del de tokens porque este sí borra conexiones.
 */
export interface ConnectionAccountsWriter {
  listByPlatform(platform: ConnectionPlatform): Promise<Connection[]>;
  saveConnection(draft: ConnectionDraft, connectedBy: string): Promise<boolean>;
  deleteConnection(connectionId: string): Promise<void>;
}

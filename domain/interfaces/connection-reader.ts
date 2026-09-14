import type { Connection } from "@/domain/entities/connection";

/**
 * Port de solo lectura de conexiones. El dashboard únicamente necesita
 * enumerarlas, así que no depende del port completo de escritura.
 */
export interface ConnectionReader {
  listConnections(): Promise<Connection[]>;
}

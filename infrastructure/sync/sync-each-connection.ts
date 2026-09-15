import "server-only";

import type { Connection } from "@/domain/entities/connection";
import { syncFailed, type SyncOutcome } from "@/domain/entities/sync-outcome";

/**
 * Sincroniza una tras otra las cuentas conectadas de una plataforma y devuelve
 * el resultado de cada una.
 *
 * Va en serie a propósito: las cuentas comparten el mismo acceso y lanzarlas a
 * la vez multiplicaría las llamadas simultáneas contra la misma API. Cuando hay
 * más de una, los fallos se etiquetan con el nombre de la cuenta: sin él, «no
 * pudimos importar las campañas» no dice cuál de las dos hay que revisar.
 */
export async function syncEachConnection(
  connections: Connection[],
  sync: (connection: Connection) => Promise<SyncOutcome>,
): Promise<SyncOutcome[]> {
  const outcomes: SyncOutcome[] = [];

  for (const connection of connections) {
    const outcome = await sync(connection);

    outcomes.push(
      outcome.ok || connections.length === 1
        ? outcome
        : syncFailed(`${connection.accountLabel}: ${outcome.message}`),
    );
  }

  return outcomes;
}

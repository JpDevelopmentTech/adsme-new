import type { SelectConnectionAccountsInput } from "@/domain/entities/ad-account";
import type { ConnectionAccountsWriter } from "@/domain/interfaces/connection-accounts-writer";

/**
 * Caso de uso: fijar de qué cuentas de una plataforma se importan campañas.
 *
 * Trabaja sobre el conjunto entero en vez de cuenta a cuenta: las elegidas se
 * guardan —altas nuevas y refresco de las que ya estaban, para que un cambio de
 * nombre o de token no las deje desfasadas— y las que se quedan fuera se
 * desconectan. Sus campañas caen con ellas por la clave foránea, que es lo
 * correcto: pertenecen a esa cuenta y atribuirlas a otra falsearía los reportes.
 *
 * Primero guarda y solo después borra: si un alta falla, la selección anterior
 * sigue entera. Al revés, un fallo a mitad dejaría al usuario sin las cuentas
 * que acababa de desmarcar y sin las que quería poner en su lugar.
 *
 * Devuelve `false` —sin desconectar nada— si alguna cuenta no se pudo guardar.
 */
export function createSelectConnectionAccounts(
  connections: ConnectionAccountsWriter,
) {
  return async function selectConnectionAccounts(
    input: SelectConnectionAccountsInput,
  ): Promise<boolean> {
    const current = await connections.listByPlatform(input.platform);
    const chosen = new Set(
      input.selected.map((account) => account.externalAccountId),
    );

    const saved = await Promise.all(
      input.selected.map((account) =>
        connections.saveConnection(
          {
            ...input.access,
            platform: input.platform,
            accountLabel: account.label,
            externalAccountId: account.externalAccountId,
            extra: account.extra,
          },
          input.connectedBy,
        ),
      ),
    );

    if (!saved.every(Boolean)) return false;

    await Promise.all(
      current
        .filter((connection) => !chosen.has(connection.externalAccountId))
        .map((connection) => connections.deleteConnection(connection.id)),
    );

    return true;
  };
}

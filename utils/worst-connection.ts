import type { Connection } from "@/domain/entities/connection";

/** Ordena de peor a mejor: primero lo que no está conectado, luego lo que antes caduca. */
function rank(connection: Connection): [number, number] {
  return [
    connection.status === "conectado" ? 1 : 0,
    connection.tokenExpiresAt
      ? Date.parse(connection.tokenExpiresAt)
      : Number.POSITIVE_INFINITY,
  ];
}

/**
 * Conexión que decide el estado de una plataforma cuando tiene varias cuentas:
 * la que peor está. Es la que corta la importación, así que es la que la
 * pantalla debe enseñar; quedarse con la primera escondería el problema.
 */
export function worstConnection(
  connections: Connection[],
): Connection | undefined {
  return [...connections].sort((first, second) => {
    const [firstStatus, firstExpiry] = rank(first);
    const [secondStatus, secondExpiry] = rank(second);

    return firstStatus - secondStatus || firstExpiry - secondExpiry;
  })[0];
}

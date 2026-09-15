import type { ConnectionDraft } from "@/domain/entities/connection";
import type { PlatformAccessWriter } from "@/domain/interfaces/platform-access-writer";

/**
 * Caso de uso: guardar el acceso que la plataforma acaba de conceder.
 *
 * Si ya había cuentas conectadas solo renueva su token, porque el permiso las
 * cubre a todas por igual: escribirlo únicamente en la del borrador dejaría a
 * las demás con el token viejo, que caduca y corta su importación en silencio.
 * Cuando no había ninguna conecta la del borrador, para que la pantalla quede
 * en un estado válido; elegir el resto es cosa del selector de cuentas.
 *
 * Devuelve `false` si no se pudo guardar el acceso.
 */
export function createRegisterPlatformAccess(connections: PlatformAccessWriter) {
  return async function registerPlatformAccess(
    draft: ConnectionDraft,
    connectedBy: string,
  ): Promise<boolean> {
    const existing = await connections.listByPlatform(draft.platform);

    if (existing.length === 0) {
      return connections.saveConnection(draft, connectedBy);
    }

    const renewed = await Promise.all(
      existing.map((connection) =>
        connections.updateTokens(connection.id, {
          accessToken: draft.accessToken,
          refreshToken: draft.refreshToken,
          tokenExpiresAt: draft.tokenExpiresAt,
        }),
      ),
    );

    return renewed.every(Boolean);
  };
}

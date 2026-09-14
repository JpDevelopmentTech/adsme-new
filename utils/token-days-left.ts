import {
  TOKEN_RENEWS_ITSELF,
  TOKEN_WARNING_DAYS,
} from "@/constants/connections.constants";
import type { Connection } from "@/domain/entities/connection";

/**
 * Días que faltan para que caduque el token de la conexión, o `null` cuando no
 * hay fecha, todavía queda margen, o la plataforma se renueva sola. Un `0`
 * significa que ya caducó.
 */
export function tokenDaysLeft(
  connection: Connection | undefined | null,
  now: Date,
): number | null {
  if (!connection?.tokenExpiresAt) return null;
  if (TOKEN_RENEWS_ITSELF[connection.platform]) return null;

  const daysLeft = Math.ceil(
    (Date.parse(connection.tokenExpiresAt) - now.getTime()) / 86_400_000,
  );

  return daysLeft <= TOKEN_WARNING_DAYS ? Math.max(0, daysLeft) : null;
}

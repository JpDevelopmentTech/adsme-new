import {
  TOKEN_LIFETIME_DAYS,
  TOKEN_RENEWS_ITSELF,
  TOKEN_WARNING_DAYS,
} from "@/constants/connections.constants";
import type { Connection } from "@/domain/entities/connection";
import type { ConnectionAccess } from "@/domain/entities/platform-connection";

const DAY = 86_400_000;

/**
 * Vigencia de la autorización, medida contra la duración nominal del token de
 * su plataforma. Se muestra llena cuando no hay fecha de caducidad y cuando la
 * plataforma renueva su acceso sola: ahí `tokenExpiresAt` mide el token de
 * acceso —horas— y no el permiso, que es lo que le importa al usuario.
 */
export function buildConnectionAccess(
  connection: Connection,
  now: Date,
): ConnectionAccess {
  if (!connection.tokenExpiresAt || TOKEN_RENEWS_ITSELF[connection.platform]) {
    return { daysLeft: null, percent: 100, isExpiring: false };
  }

  const daysLeft = Math.max(
    0,
    Math.ceil((Date.parse(connection.tokenExpiresAt) - now.getTime()) / DAY),
  );
  const lifetime = TOKEN_LIFETIME_DAYS[connection.platform];

  return {
    daysLeft,
    percent: Math.min(100, Math.round((daysLeft / lifetime) * 100)),
    isExpiring: daysLeft <= TOKEN_WARNING_DAYS,
  };
}

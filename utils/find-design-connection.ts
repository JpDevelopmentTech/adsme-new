import { MOCK_CONNECTIONS } from "@/constants/connections.constants";
import type { JobPlatform } from "@/domain/entities/job";
import type { PlatformConnection } from "@/domain/entities/platform-connection";

/**
 * Tarjeta de una plataforma que todavía no tiene integración: sigue mostrando
 * el diseño hasta que exista su app OAuth. Devuelve `null` si ya es real, para
 * que quitar una maqueta no deje una llamada rota detrás.
 */
export function findDesignConnection(
  platform: JobPlatform,
): PlatformConnection | null {
  return MOCK_CONNECTIONS.find((item) => item.platform === platform) ?? null;
}

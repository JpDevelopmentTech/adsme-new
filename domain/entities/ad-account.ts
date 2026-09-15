import type { ConnectionPlatform, PlatformAccess } from "@/domain/entities/connection";

/**
 * Cuenta publicitaria elegida por el usuario, ya normalizada desde el formato
 * de su plataforma. Es todo lo que distingue a una conexión de otra: los tokens
 * pertenecen al acceso concedido, no a la cuenta.
 */
export interface AdAccountSelection {
  externalAccountId: string;
  label: string;
  /** Datos propios de la plataforma (moneda, id numérico…). */
  extra?: Record<string, unknown>;
}

/** Alta y baja de cuentas de una plataforma resueltas en una sola operación. */
export interface SelectConnectionAccountsInput {
  platform: ConnectionPlatform;
  /** Cuentas que quedan conectadas; las que falten se desconectan. */
  selected: AdAccountSelection[];
  /** Acceso con el que se dan de alta y se refrescan sus conexiones. */
  access: PlatformAccess;
  connectedBy: string;
}

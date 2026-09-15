/** Plataformas publicitarias que adsme puede conectar. */
export type ConnectionPlatform = "google_ads" | "meta" | "tiktok";

/** Estado de la cuenta conectada, tal como lo muestra la pantalla `B10`. */
export type ConnectionStatus = "conectado" | "expirado" | "revocado" | "error";

/**
 * Cuenta publicitaria conectada. Los tokens se exponen ya descifrados y solo
 * circulan por el servidor: nunca deben llegar al cliente.
 */
export interface Connection {
  id: string;
  platform: ConnectionPlatform;
  /** Nombre legible que decide el administrador. */
  accountLabel: string;
  /** `customer_id`, `act_…` o `advertiser_id` según la plataforma. */
  externalAccountId: string;
  /** Solo Google: identificador de la cuenta MCC. */
  loginCustomerId: string | null;
  accessToken: string;
  /** Nulo en Meta (token de larga duración) y en TikTok. */
  refreshToken: string | null;
  tokenExpiresAt: string | null;
  scopes: string;
  status: ConnectionStatus;
  connectedBy: string | null;
  lastSyncedAt: string | null;
  /** Datos específicos de cada plataforma que no merecen columna propia. */
  extra: Record<string, unknown>;
}

/** Renovación del acceso. Sin `refreshToken` se conserva el ya guardado. */
export interface ConnectionTokenUpdate {
  accessToken: string;
  refreshToken?: string | null;
  tokenExpiresAt: string | null;
}

/**
 * Permiso concedido por una plataforma. Es común a todas las cuentas que cubre:
 * autorizar una vez basta para conectar varias, y cada una guarda su copia.
 */
export interface PlatformAccess {
  accessToken: string;
  refreshToken?: string | null;
  tokenExpiresAt: string | null;
  scopes: string;
}

/** Datos necesarios para dar de alta o actualizar una conexión. */
export interface ConnectionDraft extends PlatformAccess {
  platform: ConnectionPlatform;
  accountLabel: string;
  externalAccountId: string;
  loginCustomerId?: string | null;
  extra?: Record<string, unknown>;
}

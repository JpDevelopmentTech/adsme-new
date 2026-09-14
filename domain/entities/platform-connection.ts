import type { JobPlatform } from "@/domain/entities/job";

/**
 * Vigencia de la autorización de una cuenta. Es lo que rompe la importación en
 * silencio cuando caduca, así que la tarjeta la muestra siempre, no solo cuando
 * urge.
 */
export interface ConnectionAccess {
  /** Días que quedan de autorización; `null` cuando el acceso no caduca. */
  daysLeft: number | null;
  /** Parte de la ventana de vigencia que queda, de 0 a 100. */
  percent: number;
  /** Queda menos margen del umbral de aviso. */
  isExpiring: boolean;
}

/**
 * Vista de una cuenta publicitaria para la tarjeta de `B10 · Conexiones`.
 * Es un modelo de presentación: la conexión real, con sus tokens, es
 * `Connection` en `domain/entities/connection.ts`.
 */
export interface PlatformConnection {
  platform: JobPlatform;
  /** Nombre comercial de la plataforma, distinto del de la pauta. */
  name: string;
  status: "connected" | "disconnected";
  accountName: string | null;
  activeCampaigns: number | null;
  /** Inversión sumada de las campañas que ha importado esta cuenta. */
  importedSpend: number | null;
  lastSyncedLabel: string | null;
  access: ConnectionAccess | null;
}

/** Una campaña ya importada, tal como la lista la tabla de `B10`. */
export interface ImportedCampaign {
  id: string;
  name: string;
  platform: JobPlatform;
  /** Plataforma de la que vino, en su nombre comercial. */
  accountName: string;
  /** Trabajo al que está asociada («Neón · Sofía Vega»); `null` si no lo está. */
  jobLabel: string | null;
  spend: number;
  syncedAtLabel: string;
}

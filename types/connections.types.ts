import type { ReactNode } from "react";
import type {
  ConnectionAccess,
  ImportedCampaign,
  PlatformConnection,
} from "@/domain/entities/platform-connection";

export interface ImportedCampaignsPanelProps {
  campaigns: ImportedCampaign[];
}

export interface ImportedCampaignRowProps {
  campaign: ImportedCampaign;
}

export interface MetaConnectedActionsProps {
  /** El acceso está por caducar: reautorizar pasa a ser la acción destacada. */
  isUrgent: boolean;
}

export interface SyncNowButtonProps {
  /** Sin cuenta conectada no hay nada que importar y el botón queda inerte. */
  isEnabled: boolean;
}

/** Estado de la importación que encabeza `B10`. */
export interface ConnectionsStatus {
  /** Minutos hasta la próxima importación; `null` si nunca se ha sincronizado. */
  minutesLeft: number | null;
  /** Parte del ciclo de una hora ya consumida, de 0 a 100. */
  elapsedPercent: number;
  headline: string;
  detail: string;
}

export interface SyncClockProps {
  minutesLeft: number | null;
  elapsedPercent: number;
}

export interface ConnectionsStatusBandProps {
  status: ConnectionsStatus;
  /** Sincronizar solo tiene sentido con alguna cuenta conectada. */
  canSync: boolean;
}

export interface ConnectionRowProps {
  connection: PlatformConnection;
  /** Acciones propias de la plataforma; sin ellas la fila solo informa. */
  actions?: ReactNode;
}

export interface ConnectionsPanelProps {
  /** Las filas de plataforma; el panel solo aporta cabecera y filetes. */
  children: ReactNode;
}

export interface ConnectionAccessRailProps {
  access: ConnectionAccess;
}

export interface ConnectionActionsMenuProps {
  platform: string;
  children: ReactNode;
}

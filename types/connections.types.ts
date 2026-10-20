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

/** Estado de la importación que encabeza `B10`. */
/** Tiempo hasta la próxima importación, ya partido en cifra y unidad. */
export interface Countdown {
  value: string;
  unit: string;
}

export interface ConnectionsStatus {
  /** Lo que falta para el próximo cron; `null` si no hay cuentas que importar. */
  countdown: Countdown | null;
  /** Parte del ciclo diario ya consumida, de 0 a 100. */
  elapsedPercent: number;
  headline: string;
  detail: string;
}

export interface SyncClockProps {
  countdown: Countdown | null;
  elapsedPercent: number;
}

export interface ConnectionsStatusBandProps {
  status: ConnectionsStatus;
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
  /** Server action que borra todas las cuentas de la plataforma. */
  disconnectAction: () => Promise<void>;
  children: ReactNode;
}

export interface DisconnectDialogProps {
  isOpen: boolean;
  /** Nombre visible de la plataforma, para el título y el aviso del diálogo. */
  platform: string;
  action: () => Promise<void>;
  onCancel: () => void;
}

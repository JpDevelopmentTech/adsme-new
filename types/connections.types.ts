import type { ReactNode } from "react";
import type {
  ConnectionAccess,
  ImportedCampaign,
  PlatformConnection,
} from "@/domain/entities/platform-connection";

export interface ConnectionCardProps {
  connection: PlatformConnection;
  /** Sustituye los botones deshabilitados por acciones reales de la plataforma. */
  actions?: ReactNode;
}

export interface ConnectionMetricsProps {
  connection: PlatformConnection;
}

export interface ConnectionAccessBarProps {
  access: ConnectionAccess;
}

export interface ConnectionEmptyProps {
  /** Nombre comercial de la plataforma, para la invitación a conectarla. */
  name: string;
  action?: ReactNode;
}

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

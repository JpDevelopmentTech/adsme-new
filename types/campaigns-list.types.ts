import type { ReactNode } from "react";
import type { CampaignListQuery } from "@/domain/entities/campaign";
import type { JobPlatform } from "@/domain/entities/job";
import type { FilterSelectOption } from "@/types/ui.types";

/** Cómo está la campaña ahora mismo, ya traducido desde el estado de su plataforma. */
export type CampaignState = "active" | "paused" | "ended";

/** Campaña tal como la pinta una fila de `B9`. */
export interface CampaignListItem {
  id: string;
  name: string;
  /** Segunda línea: identificador en la plataforma y objetivo. */
  reference: string;
  platform: JobPlatform;
  accountLabel: string;
  state: CampaignState;
  period: string;
  reach: number;
  spend: number;
}

/**
 * Un bloque de la lista. `jobId` en `null` es el grupo de las campañas que
 * todavía no alimentan ningún reporte, y va siempre el primero.
 */
export interface CampaignGroup {
  jobId: string | null;
  title: string;
  clientName: string;
  spend: number;
  campaigns: CampaignListItem[];
}

/** Reparto de lo importado entre lo que ya cuenta y lo que no, para la banda. */
export interface CampaignsSplit {
  linked: number;
  unlinked: number;
  unlinkedCount: number;
  totalCount: number;
  /** Parte del dinero importado que ya está vinculada, de 0 a 100. */
  linkedPercent: number;
}

export interface CampaignsSplitBandProps {
  split: CampaignsSplit;
}

export interface CampaignsToolbarProps {
  query: CampaignListQuery;
  accountOptions: FilterSelectOption<string>[];
  resultsLabel: string;
}

export interface CampaignsBoardProps {
  groups: CampaignGroup[];
  jobOptions: FilterSelectOption<string>[];
  isFiltered: boolean;
  toolbar: ReactNode;
}

export interface CampaignGroupHeadProps {
  group: CampaignGroup;
  /** Cuántas de sus campañas están marcadas ahora mismo. */
  selectedCount: number;
  onLink: () => void;
}

export interface CampaignRowProps {
  campaign: CampaignListItem;
  isSelected: boolean;
  /** Ya alimenta un trabajo: la acción de la fila pasa a ser moverla de sitio. */
  isLinked: boolean;
  onToggle: (campaignId: string) => void;
  onLink: (campaignId: string) => void;
}

export interface CampaignStateChipProps {
  state: CampaignState;
}

export interface LinkCampaignsDialogProps {
  campaigns: CampaignListItem[];
  jobOptions: FilterSelectOption<string>[];
  isOpen: boolean;
  onClose: () => void;
  onRemove: (campaignId: string) => void;
}

import type { Campaign } from "@/domain/entities/campaign";
import type { Connection, ConnectionPlatform } from "@/domain/entities/connection";
import type { FilterSelectOption } from "@/types/ui.types";

/** Campaña con el nombre de la cuenta de la que viene, para pintar la lista. */
export interface LinkableCampaign extends Campaign {
  accountLabel: string;
}

export interface LinkCampaignBoardProps {
  campaigns: LinkableCampaign[];
  connections: Connection[];
  jobOptions: FilterSelectOption<string>[];
}

export interface CampaignPickerItemProps {
  campaign: LinkableCampaign;
  isSelected: boolean;
  onToggle: (campaignId: string) => void;
}

export interface PlatformTabsProps {
  active: ConnectionPlatform;
  connected: ConnectionPlatform[];
  onChange: (platform: ConnectionPlatform) => void;
}

/** Estado devuelto por la acción de vinculación hacia el formulario. */
export interface LinkCampaignsState {
  message: string | null;
}

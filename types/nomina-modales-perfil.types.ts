import type { NominaSocialNetwork } from "@/domain/entities/nomina-social";
import type { NominaSocialMeta } from "@/types/nomina-modales.types";
import type { NominaSplitModelState } from "@/types/nomina-modales-artista.types";
import type { NominaModalArtist, ProfileActionsProps } from "@/types/nomina-modals.types";

/** Pestañas del modal de configuración. */
export type NominaSettingsTab = "modelo" | "redes";

/** Enlaces escritos por red. */
export type NominaSocialDraft = Record<NominaSocialNetwork, string>;

/** Estado del modal de configuración (hook `useArtistSettings`). */
export interface NominaSettingsState {
  tab: NominaSettingsTab;
  setTab: (tab: NominaSettingsTab) => void;
  minShows: number | null;
  setMinShows: (minShows: number | null) => void;
  split: NominaSplitModelState;
  links: NominaSocialDraft;
  setLink: (network: NominaSocialNetwork, url: string) => void;
  canSave: boolean;
  isSaving: boolean;
  error: string | null;
  /** Guarda la pestaña abierta: el modelo o las redes. */
  submit: () => void;
}

export interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  artist: NominaModalArtist;
}

export type SettingsModalProps = ProfileModalProps & Omit<ProfileActionsProps, "artist" | "movementCount">;

/** Baja de Nómina en curso (hook `useUnenrollArtist`). */
export interface UnenrollState {
  unenroll: () => void;
  isPending: boolean;
  error: string | null;
}

export interface DeleteArtistDialogProps extends ProfileModalProps {
  movementCount: number;
}

export interface SettingsTabsProps {
  value: NominaSettingsTab;
  onChange: (tab: NominaSettingsTab) => void;
}

export interface SettingsTabPanelProps {
  settings: NominaSettingsState;
  artist: NominaModalArtist;
}

export interface SocialLinkFieldProps {
  meta: NominaSocialMeta;
  value: string;
  onChange: (value: string) => void;
}

export interface SpotifySearchPanelProps {
  value: string;
  onChange: (value: string) => void;
}

export interface SocialNetworkIconProps {
  network: NominaSocialNetwork;
  color: string;
  size?: number;
}

export interface ShareSectionProps {
  title: string;
  emptyText: string;
}

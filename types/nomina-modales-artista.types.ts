import type { NominaEligibleClient } from "@/domain/entities/nomina-eligible-client";
import type { NominaSplitModel, NominaSplitSettings, NominaViability } from "@/types/nomina-modales.types";
import type { NominaSplitPatch } from "@/types/nomina-modales-reparto.types";

/** Estado del bloque «Modelo de reparto» (hook `useNominaSplitModel`). */
export interface NominaSplitModelState {
  settings: NominaSplitSettings;
  update: (patch: NominaSplitPatch) => void;
  model: NominaSplitModel | null;
  viability: NominaViability | null;
  isViable: boolean;
}

/** Formulario completo «Nuevo artista» (hook `useNewArtistForm`). */
export interface NewArtistFormState {
  client: NominaEligibleClient | null;
  setClient: (client: NominaEligibleClient | null) => void;
  nomina: number | null;
  setNomina: (nomina: number | null) => void;
  nominaError: string | null;
  suggestedMin: number | null;
  minShows: number | null;
  setMinShows: (minShows: number | null) => void;
  threshold: number | null;
  split: NominaSplitModelState;
  startDate: string;
  setStartDate: (date: string) => void;
  canSave: boolean;
  isSaving: boolean;
  error: string | null;
  /** Inscribe al cliente y abre su perfil de Nómina. */
  submit: () => void;
}

export interface NewArtistModalProps {
  isOpen: boolean;
  onClose: () => void;
  eligibleClients: NominaEligibleClient[];
  /** Cliente ya elegido (desde su ficha): el alta abre en el paso de nómina. */
  initialClient?: NominaEligibleClient;
}

export interface ClientPickerStepProps {
  clients: NominaEligibleClient[];
  onPick: (client: NominaEligibleClient) => void;
}

export interface EligibleClientOptionProps {
  client: NominaEligibleClient;
  onPick: (client: NominaEligibleClient) => void;
}

export interface SelectedClientCardProps {
  client: NominaEligibleClient;
  /** Sin él no se puede cambiar (alta abierta desde la ficha del cliente). */
  onChange?: () => void;
}

export interface NewArtistSectionProps {
  form: NewArtistFormState;
}

export interface ArtistSetupColumnProps extends NewArtistSectionProps {
  /** Si el cliente elegido se puede cambiar (no cuando el alta abre desde su ficha). */
  canChangeClient: boolean;
}

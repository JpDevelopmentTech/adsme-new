import type { ReactNode } from "react";
import type { NominaChoice, NominaSplitModel, NominaSplitSettings, NominaViability } from "@/types/nomina-modales.types";
import type { NominaSplitPatch } from "@/types/nomina-modales-reparto.types";

/** Estado del bloque «Modelo de reparto» (hook `useNominaSplitModel`). */
export interface NominaSplitModelState {
  settings: NominaSplitSettings;
  update: (patch: NominaSplitPatch) => void;
  model: NominaSplitModel | null;
  viability: NominaViability | null;
  isViable: boolean;
}

/** Foto elegida en el alta (hook `useArtistPhoto`). */
export interface ArtistPhotoState {
  url: string | null;
  error: string | null;
  selectFile: (file: File | null | undefined) => void;
  remove: () => void;
}

/** Bloque Express del alta (hook `useNewArtistExpress`). */
export interface NewArtistExpressState {
  isOn: boolean;
  setIsOn: (isOn: boolean) => void;
  preset: string;
  setPreset: (preset: string) => void;
  otherAmount: number | null;
  setOtherAmount: (amount: number | null) => void;
  coveredMonth: string;
  setCoveredMonth: (month: string) => void;
  /** Monto de entrada aceptado, ya resuelto. */
  amount: number;
}

/** Formulario completo «Nuevo artista» (hook `useNewArtistForm`). */
export interface NewArtistFormState {
  name: string;
  setName: (name: string) => void;
  isDuplicate: boolean;
  photo: ArtistPhotoState;
  nomina: number | null;
  setNomina: (nomina: number | null) => void;
  nominaError: string | null;
  suggestedMin: number | null;
  minShows: number | null;
  setMinShows: (minShows: number | null) => void;
  threshold: number | null;
  split: NominaSplitModelState;
  express: NewArtistExpressState;
  startDate: string;
  setStartDate: (date: string) => void;
  canSave: boolean;
}

export interface NewArtistModalProps {
  isOpen: boolean;
  onClose: () => void;
  existingNames: string[];
}

export interface NewArtistSectionProps {
  form: NewArtistFormState;
}

export interface ArtistPhotoPickerProps {
  photo: ArtistPhotoState;
}

export interface ArtistPhotoHelpProps {
  photo: ArtistPhotoState;
}

export interface ExpressDetailProps {
  express: NewArtistExpressState;
  /** Distribución ya pintada (o nada si el monto no es mayor que 0). */
  distribution: ReactNode;
  monthOptions: NominaChoice<string>[];
}

import type { NominaPhaseRow, NominaSplitModel, NominaSplitSettings, NominaViability } from "@/types/nomina-modales.types";

/** Cambio parcial del modelo que emite cada sección del editor. */
export type NominaSplitPatch = Partial<NominaSplitSettings>;

export interface SplitModelEditorProps {
  idPrefix: string;
  settings: NominaSplitSettings;
  /** Modelo resuelto; `null` mientras la nómina no sea válida. */
  model: NominaSplitModel | null;
  viability: NominaViability | null;
  onChange: (patch: NominaSplitPatch) => void;
  /** Muestra el rótulo «MODELO DE REPARTO» encima. */
  hasHeading?: boolean;
  isDetailInitiallyOpen?: boolean;
}

export interface SplitSectionProps {
  idPrefix: string;
  settings: NominaSplitSettings;
  model: NominaSplitModel | null;
  onChange: (patch: NominaSplitPatch) => void;
}

export interface SplitParamsFieldsProps {
  idPrefix: string;
  hasScalability: boolean;
  percent: number;
  post: number;
  onPercent: (value: number) => void;
  onPost: (value: number) => void;
  /** Muestra las ayudas bajo cada campo. */
  hasHelp?: boolean;
  /** Nómina del artista, para marcar en rojo una Utilidad por show mayor. */
  nomina?: number;
}

export interface ViabilityBoxProps {
  viability: NominaViability | null;
  isInitiallyOpen?: boolean;
}

export interface ViabilityDetailProps {
  viability: NominaViability;
}

export interface PhaseTableProps {
  phases: NominaPhaseRow[];
}

export interface PhaseRowProps {
  phase: NominaPhaseRow;
}

export interface MessageListProps {
  items: string[];
  prefix: string;
  className: string;
}

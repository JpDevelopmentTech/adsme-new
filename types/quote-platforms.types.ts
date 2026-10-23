import type { ReactNode } from "react";
import type { FOOTER_STAT_TONES } from "@/constants/quote-platforms-copy.constants";
import type { QuoteLine, QuotePlatform } from "@/domain/entities/quote";
import type { QuotePlatformPreset } from "@/domain/entities/quote-catalog";
import type { QuotePlatformFigures } from "@/domain/entities/quote-figures";

/** Aviso rojo de la plataforma: comisión negativa o presupuesto que no cubre el servicio. */
export type PlatformAlert = "loss" | "underBudget" | null;

export interface PlatformStatus {
  hasDiscount: boolean;
  alert: PlatformAlert;
}

/** Tramo de la barra proporcional de la cascada. */
export interface CascadeSegment {
  key: "service" | "fee" | "pauta";
  /** Fracción 0..1 del ancho. */
  share: number;
}

export interface PlatformCardProps {
  platform: QuotePlatform;
}

/** Parte de la tarjeta que pinta la plataforma con sus cifras ya calculadas. */
export interface PlatformFiguresProps {
  platform: QuotePlatform;
  figures: QuotePlatformFigures;
}

export interface PlatformHeaderProps extends PlatformFiguresProps {
  bodyId: string;
}

export interface PlatformBodyProps extends PlatformFiguresProps {
  id: string;
}

export interface PautaLineRowProps extends PlatformFiguresProps {
  line: QuoteLine;
  index: number;
  placeholder: string;
}

export interface LockToggleProps {
  isLocked: boolean;
  label: string;
  lockTitle: string;
  unlockTitle: string;
  onToggle: () => void;
  /** Invisible y deshabilitado, pero ocupa su sitio para no mover la fila. */
  isHidden?: boolean;
}

export interface FixedTagProps {
  label: string;
}

export interface FieldHeadingProps {
  label: string;
  tag?: ReactNode;
  note?: string;
  /** Tiñe la nota de ámbar cuando hay descuento. */
  isNoteWarning?: boolean;
  trailing?: ReactNode;
}

export interface CascadeStepProps {
  label: string;
  value: string;
  /** Clase de color del tramo de la barra que le corresponde. */
  swatch?: string;
  isHighlighted?: boolean;
}

export interface CascadeBarProps {
  segments: CascadeSegment[];
  label: string;
}

export interface FigureRowProps {
  label: string;
  value: string;
  isStrong?: boolean;
}

export type FooterStatTone = keyof typeof FOOTER_STAT_TONES;

export interface FooterStatProps {
  label: string;
  value: string;
  tone?: FooterStatTone;
}

export interface ChargeSwitchProps {
  label: string;
  isOn: boolean;
  onChange: (isOn: boolean) => void;
}

export interface MonthsStepperProps {
  platformId: string;
  months: number;
}

export interface QuoteTextareaProps {
  id: string;
  label: ReactNode;
  value: string;
  rows: number;
  placeholder: string;
  onChange: (value: string) => void;
}

export interface FormBlockHeadingProps {
  id: string;
  title: string;
  subtitle: string;
}

export interface PresetChipProps {
  preset: QuotePlatformPreset;
  onAdd: (preset: QuotePlatformPreset) => void;
}

export interface AddPlatformPanelProps {
  onAdd: (preset: QuotePlatformPreset) => void;
}

export interface CollapsedChipProps {
  label: string;
  amount: string;
  pct: string | null;
}

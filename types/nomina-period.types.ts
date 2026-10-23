import type { RefObject } from "react";
import type { NominaPeriodSelection } from "@/domain/entities/nomina-period";
import type { FinanceTab } from "@/types/nomina-finanzas.types";

/** Opción del selector (atajo o chip de trimestre/año), con si es la elegida. */
export interface PeriodChoice {
  id: string;
  label: string;
  isActive: boolean;
}

/** Cómo se pinta un mes de la rejilla: extremo del rango, dentro de él o fuera. */
export type PeriodMonthTone = "edge" | "inside" | "idle";

export interface PeriodMonthCell {
  /** `AAAA-MM`. */
  month: string;
  label: string;
  tone: PeriodMonthTone;
  isCurrent: boolean;
}

export interface PeriodPopoverProps {
  year: number;
  shortcuts: PeriodChoice[];
  chips: PeriodChoice[];
  months: PeriodMonthCell[];
  help: string;
  onShortcut?: (id: string) => void;
  onChip?: (id: string) => void;
  onMonth?: (month: string) => void;
  onMonthHover?: (month: string | null) => void;
  onYearChange?: (delta: number) => void;
}

export interface PeriodTriggerProps {
  label: string;
  range: string;
  isOpen: boolean;
  onClick: () => void;
}

/** Selector solo visual del Histórico del perfil. */
export interface PeriodSelectorProps {
  label: string;
  range: string;
}

export interface FinancePeriodSelectorProps {
  selection: NominaPeriodSelection;
  tab: FinanceTab;
  /** Rango resuelto `AAAA-MM`. */
  fromMonth: string;
  toMonth: string;
  /** Mes en curso en Bogotá, que también fija el año con el que abre. */
  currentMonth: string;
}

/** Estado de un popover que se cierra con Escape o al hacer clic fuera. */
export interface PopoverDismissState {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  toggle: () => void;
  containerRef: RefObject<HTMLDivElement | null>;
}

/** Lo que necesita el popover de Finanzas para elegir periodo. */
export type FinancePeriodPickerInput = FinancePeriodSelectorProps & { onPicked: () => void };

export interface PeriodShortcutListProps {
  shortcuts: PeriodChoice[];
  onSelect?: (id: string) => void;
}

export interface PeriodMonthGridProps {
  months: PeriodMonthCell[];
  onSelect?: (month: string) => void;
  onHover?: (month: string | null) => void;
}

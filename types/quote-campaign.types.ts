import type { KeyboardEvent, ReactNode } from "react";
import type { QuoteTarget } from "@/domain/entities/quote";
import type { QuoteCatalog, QuoteInterest, QuoteInterestPlatform } from "@/domain/entities/quote-catalog";
import type { QuoteStoredClient } from "@/types/quote-store.types";

/** Fila «Clave: valor» del resumen de la campaña recogida. */
export interface CampaignSummaryEntry {
  key: string;
  value: string;
}

/** Opción del buscador de zonas; las agrupadas traen las ciudades que incluyen. */
export interface ZoneOption {
  id: string;
  name: string;
  composition?: string;
}

export interface ZoneOptionGroup {
  label: string;
  options: ZoneOption[];
}

export interface ZoneSearchInput {
  catalog: QuoteCatalog;
  target: QuoteTarget;
  query: string;
}

/** Filtro de plataforma de los intereses; `all` las muestra todas. */
export type InterestPlatformFilter = QuoteInterestPlatform | "all";

export interface InterestFilter {
  query: string;
  platform: InterestPlatformFilter;
  /** Categoría activa; vacía = todas. Se ignora mientras hay búsqueda. */
  category: string;
}

/** Estado de un combobox: abierto, opción resaltada y teclado. */
export interface QuoteCombobox {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
}

export interface QuoteComboboxHandlers<T> {
  onPick: (option: T) => void;
  /** Enter sin opción resaltada: agrega lo escrito. */
  onEnterFree?: () => void;
}

export interface FoldButtonProps {
  isCollapsed: boolean;
  controlsId: string;
  onToggle: () => void;
}

export interface CampaignFieldGroupProps {
  label: string;
  hint?: string;
  /** Si el título nombra un input, se pinta como `<label htmlFor>`. */
  labelFor?: string;
  aside?: ReactNode;
  fold?: { isCollapsed: boolean; onToggle: () => void };
  collapsedSummary?: ReactNode;
  /** Contenido que se ve aunque el grupo esté recogido. */
  persistent?: ReactNode;
  children?: ReactNode;
}

export interface ChoiceChipProps {
  label: string;
  isSelected: boolean;
  onToggle: () => void;
  /** Texto pequeño a la derecha, como las letras «M T G». */
  detail?: string;
}

export interface RemovableChipProps {
  label: string;
  title?: string;
  onRemove: () => void;
}

export interface ClientOptionProps {
  id: string;
  client: QuoteStoredClient;
  isActive: boolean;
  onHover: () => void;
  onPick: () => void;
  onLoad: () => void;
}

export interface ClientOptionsListProps {
  listId: string;
  clients: QuoteStoredClient[];
  activeIndex: number;
  optionId: (index: number) => string;
  onHover: (index: number) => void;
  onPick: (client: QuoteStoredClient) => void;
  onLoad: (client: QuoteStoredClient) => void;
}

export interface TargetSegmentProps {
  target: QuoteTarget;
  index: number;
  isRemovable: boolean;
}

export interface TargetPartProps {
  target: QuoteTarget;
}

export interface TargetPctFieldProps {
  value: number | null;
  onChange: (pct: number | null) => void;
}

export interface ZoneOptionsListProps {
  listId: string;
  groups: ZoneOptionGroup[];
  query: string;
  activeIndex: number;
  optionId: (index: number) => string;
  onHover: (index: number) => void;
  onPick: (option: ZoneOption) => void;
}

export interface AgeSelectProps {
  label: string;
  value: string;
  ages: string[];
  onChange: (value: string) => void;
}

export interface InterestSearchProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

export interface InterestCategoryTabsProps {
  categories: string[];
  /** Categoría activa; `null` cuando hay búsqueda y ninguna lo está. */
  active: string | null;
  onSelect: (category: string) => void;
}

export interface InterestOptionsProps {
  interests: QuoteInterest[];
  selected: string[];
  query: string;
  onToggle: (name: string) => void;
}

export interface CampaignSummaryProps {
  id: string;
}

export interface CampaignHeaderProps {
  titleId: string;
  bodyId: string;
  isCollapsed: boolean;
  onToggle: () => void;
}

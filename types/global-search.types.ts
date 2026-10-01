import type { ReactNode } from "react";
import type { ClientAvatarGradient } from "@/domain/entities/client";
import type { GlobalSearchResults } from "@/domain/entities/global-search";
import type { JobPlatform } from "@/domain/entities/job";

export type SearchGroupKey = keyof GlobalSearchResults;

/** Miniatura de un resultado según su tipo. */
export type SearchItemVisual =
  | { type: "client"; initials: string; gradient: ClientAvatarGradient; avatarUrl: string | null }
  | { type: "job"; coverUrl: string | null }
  | { type: "campaign"; platform: JobPlatform };

/** Resultado ya listo para pintar y navegar: título, subtítulo y destino. */
export interface SearchItem {
  key: string;
  group: SearchGroupKey;
  href: string;
  title: string;
  subtitle: string;
  visual: SearchItemVisual;
}

/** Estado de la búsqueda en curso del buscador global. */
export type GlobalSearchStatus = "idle" | "loading" | "ready" | "error";

export interface GlobalSearchState {
  status: GlobalSearchStatus;
  items: SearchItem[];
}

export interface GlobalSearchResultsProps {
  listId: string;
  term: string;
  state: GlobalSearchState;
  activeIndex: number;
  optionId: (index: number) => string;
  onHover: (index: number) => void;
  onSelect: (item: SearchItem) => void;
}

export interface GlobalSearchOptionProps {
  id: string;
  item: SearchItem;
  term: string;
  isActive: boolean;
  onHover: () => void;
  onSelect: () => void;
}

export interface SearchItemThumbProps {
  visual: SearchItemVisual;
}

export interface HighlightedTextProps {
  text: string;
  term: string;
}

/** Trozo de texto, marcado si coincide con lo que se busca. */
export interface HighlightPart {
  text: string;
  isMatch: boolean;
}

export interface FloatingPanelProps {
  id?: string;
  className?: string;
  children: ReactNode;
}

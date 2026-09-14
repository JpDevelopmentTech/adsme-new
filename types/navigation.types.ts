import type { LucideIcon } from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  /** Etiqueta opcional a la derecha del ítem (por ejemplo la fase del roadmap). */
  badge?: string;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

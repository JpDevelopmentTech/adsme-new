import type { ReactNode } from "react";
import type { NavItem } from "@/types/navigation.types";

/** Identidad mostrada en el sidebar y la topbar del panel. */
export interface CurrentUserSummary {
  displayName: string;
  initials: string;
  role: string;
}

export interface AppSidebarProps {
  user: CurrentUserSummary;
}

export interface SidebarNavItemProps {
  item: NavItem;
}

export interface SidebarUserCardProps {
  user: CurrentUserSummary;
}

/** Silueta del avatar: círculo en el panel, cuadrado redondeado en el detalle de cliente. */
export type AvatarShape = "circle" | "rounded";

export interface AvatarProps {
  initials: string;
  /** Lado del cuadrado en px; el diseño usa 38 en el sidebar y 42 en la topbar. */
  size: number;
  fontSize?: number;
  shape?: AvatarShape;
  /** Gradiente propio; sin él se usa el de marca (violeta → magenta). */
  gradient?: { from: string; to: string };
  /** Foto del cliente; cuando existe reemplaza a las iniciales. */
  imageUrl?: string | null;
}

export interface SectionLabelProps {
  children: ReactNode;
}

export interface NavBadgeProps {
  label: string;
}

export interface PageHeaderProps {
  title: string;
  subtitle?: string;
  /** Punto verde de estado a la izquierda del subtítulo, como en `B1 · Dashboard`. */
  hasStatusDot?: boolean;
  actions?: ReactNode;
}

export interface PendingScreenNoticeProps {
  /** Identificador de la pantalla en el diseño, por ejemplo "B2 · Clientes". */
  screen: string;
}

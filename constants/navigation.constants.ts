import {
  Disc3,
  LayoutDashboard,
  LayoutGrid,
  Megaphone,
  MicVocal,
  Plug,
  Settings,
  Users,
  Wallet,
} from "lucide-react";
import {
  NOMINA_ARTISTS_ROUTE,
  NOMINA_FINANCE_ROUTE,
  NOMINA_ROUTE,
} from "@/constants/routes.constants";
import type { NavSection } from "@/types/navigation.types";

/** Rótulo del grupo de la Nómina Plan; bajo él se listan los artistas activos. */
export const NOMINA_NAV_TITLE = "NÓMINA PLAN";

/**
 * Navegación lateral del panel, tal como está agrupada en el diseño del `.pen`.
 * Finanzas (fase 2) se quitó del menú por decisión del usuario; su ruta sigue
 * existiendo pero sin acceso desde la navegación.
 */
export const NAV_SECTIONS: NavSection[] = [
  {
    title: "GENERAL",
    items: [
      { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { label: "Clientes", href: "/clientes", icon: Users },
      { label: "Trabajos", href: "/trabajos", icon: Disc3 },
      { label: "Campañas", href: "/campanas", icon: Megaphone },
    ],
  },
  {
    title: NOMINA_NAV_TITLE,
    items: [
      { label: "Resumen", href: NOMINA_ROUTE, icon: LayoutGrid, exact: true },
      { label: "Artistas", href: NOMINA_ARTISTS_ROUTE, icon: MicVocal },
      { label: "Finanzas", href: NOMINA_FINANCE_ROUTE, icon: Wallet },
    ],
  },
  {
    title: "INTEGRACIONES",
    items: [
      { label: "Conexiones", href: "/conexiones", icon: Plug },
    ],
  },
  {
    title: "SISTEMA",
    items: [{ label: "Ajustes", href: "/ajustes", icon: Settings }],
  },
];

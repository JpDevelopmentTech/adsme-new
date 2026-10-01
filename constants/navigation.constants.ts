import {
  Disc3,
  LayoutDashboard,
  Megaphone,
  Plug,
  Settings,
  Users,
} from "lucide-react";
import type { NavSection } from "@/types/navigation.types";

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

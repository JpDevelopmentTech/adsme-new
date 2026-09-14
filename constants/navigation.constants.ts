import {
  Disc3,
  LayoutDashboard,
  Megaphone,
  Plug,
  Settings,
  Users,
  Wallet,
} from "lucide-react";
import type { NavSection } from "@/types/navigation.types";

/** Navegación lateral del panel, tal como está agrupada en el diseño del `.pen`. */
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
      { label: "Finanzas", href: "/finanzas", icon: Wallet, badge: "FASE 2" },
    ],
  },
  {
    title: "SISTEMA",
    items: [{ label: "Ajustes", href: "/ajustes", icon: Settings }],
  },
];

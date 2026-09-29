"use client";

// Cliente: los ítems llevan el componente de icono de lucide, que no cruza el
// límite servidor→cliente, y la ruta activa se resuelve con usePathname.
import { NAV_SECTIONS } from "@/constants/navigation.constants";
import { SidebarBrand } from "@/presentation/components/dashboard/sidebar-brand";
import { SidebarNavItem } from "@/presentation/components/dashboard/sidebar-nav-item";
import { SidebarUserCard } from "@/presentation/components/dashboard/sidebar-user-card";
import { SectionLabel } from "@/presentation/components/ui/section-label";
import type { AppSidebarProps } from "@/types/dashboard.types";

/**
 * Menú lateral. Va sin panel propio, sobre el fondo, separado del contenido
 * por un filete: así no compite con los paneles donde están los datos.
 */
export function AppSidebar({ user }: AppSidebarProps) {
  return (
    <aside className="hidden w-[232px] shrink-0 flex-col gap-7 overflow-y-auto border-r border-border px-3 py-6 lg:flex">
      <SidebarBrand />

      {NAV_SECTIONS.map((section) => (
        <nav key={section.title} aria-label={section.title}>
          <SectionLabel>{section.title}</SectionLabel>
          <ul className="flex flex-col gap-[3px]">
            {section.items.map((item) => (
              <li key={item.href}>
                <SidebarNavItem item={item} />
              </li>
            ))}
          </ul>
        </nav>
      ))}

      <div className="flex-1" />
      <div className="h-px bg-border" />
      <SidebarUserCard user={user} />
    </aside>
  );
}

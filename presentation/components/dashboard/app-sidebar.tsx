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
 * Menú lateral: una franja de vidrio un grosor más tintada que la ventana, con
 * la navegación arriba y la tarjeta de la cuenta al pie.
 */
export function AppSidebar({ user }: AppSidebarProps) {
  return (
    <aside className="glass-sidebar hidden w-[248px] shrink-0 flex-col gap-7 overflow-y-auto px-5 pt-7 pb-5 lg:flex">
      <SidebarBrand />

      <div className="flex flex-1 flex-col gap-6">
        {NAV_SECTIONS.map((section) => (
          <nav key={section.title} aria-label={section.title}>
            <SectionLabel>{section.title}</SectionLabel>
            <ul className="flex flex-col gap-0.5">
              {section.items.map((item) => (
                <li key={item.href}>
                  <SidebarNavItem item={item} />
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <SidebarUserCard user={user} />
    </aside>
  );
}

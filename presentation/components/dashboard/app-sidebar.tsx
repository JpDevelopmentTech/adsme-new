"use client";

// Cliente: los ítems llevan el componente de icono de lucide, que no cruza el
// límite servidor→cliente, y la ruta activa se resuelve con usePathname.
import { NAV_SECTIONS } from "@/constants/navigation.constants";
import { SidebarNavItem } from "@/presentation/components/dashboard/sidebar-nav-item";
import { SidebarUserCard } from "@/presentation/components/dashboard/sidebar-user-card";
import { SidebarBrand } from "@/presentation/components/dashboard/sidebar-brand";
import { SectionLabel } from "@/presentation/components/ui/section-label";
import type { AppSidebarProps } from "@/types/dashboard.types";

export function AppSidebar({ user }: AppSidebarProps) {
  return (
    <aside className="hidden w-[260px] shrink-0 flex-col gap-1.5 overflow-y-auto border-r border-border bg-surface px-4 py-6 lg:flex">
      <SidebarBrand />

      {NAV_SECTIONS.map((section) => (
        <nav key={section.title} aria-label={section.title}>
          <SectionLabel>{section.title}</SectionLabel>
          <ul className="flex flex-col gap-1.5">
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

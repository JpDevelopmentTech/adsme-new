"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandBarsMark } from "@/presentation/components/ui/brand-bars-mark";
import { NavBadge } from "@/presentation/components/ui/nav-badge";
import type { SidebarNavItemProps } from "@/types/dashboard.types";
import { cn } from "@/utils/cn";

/**
 * Ítem del menú lateral. El activo se apoya en una píldora de vidrio y cambia su
 * icono por las tres barras de la «E» del logotipo.
 */
export function SidebarNavItem({ item }: SidebarNavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "flex items-center gap-3 rounded-[12px] border px-3 py-2.5 transition-colors duration-150",
        "focus-visible:ring-2 focus-visible:ring-lilac focus-visible:outline-none",
        isActive ? "border-border bg-surface" : "border-transparent hover:bg-surface",
      )}
    >
      {isActive ? (
        <BrandBarsMark />
      ) : (
        <Icon size={18} strokeWidth={1.5} className="shrink-0 text-text-secondary" aria-hidden />
      )}
      <span
        className={cn(
          "flex-1 text-sm",
          isActive ? "font-normal text-text-primary" : "font-light text-text-secondary",
        )}
      >
        {item.label}
      </span>

      {item.badge ? <NavBadge label={item.badge} /> : null}
    </Link>
  );
}

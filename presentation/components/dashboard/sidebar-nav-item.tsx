"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavBadge } from "@/presentation/components/ui/nav-badge";
import type { SidebarNavItemProps } from "@/types/dashboard.types";
import { cn } from "@/utils/cn";

export function SidebarNavItem({ item }: SidebarNavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "flex items-center gap-[11px] rounded-md border px-[11px] py-[8px] transition-colors duration-150",
        "focus-visible:ring-2 focus-visible:ring-ink/30 focus-visible:outline-none",
        isActive
          ? "border-border bg-card"
          : "border-transparent hover:bg-g-200/70",
      )}
    >
      <Icon
        size={17}
        strokeWidth={1.5}
        className={isActive ? "text-text-primary" : "text-text-muted"}
        aria-hidden
      />
      <span
        className={cn(
          "flex-1 text-[13px]",
          isActive ? "font-normal text-text-primary" : "font-light text-text-secondary",
        )}
      >
        {item.label}
      </span>

      {item.badge ? <NavBadge label={item.badge} /> : null}
    </Link>
  );
}

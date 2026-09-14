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
        "relative flex items-center gap-3 rounded-md px-3 py-2.5 transition-colors",
        isActive ? "bg-card-elevated" : "hover:bg-card",
      )}
    >
      {isActive ? (
        <span
          aria-hidden
          className="absolute left-0 h-[18px] w-[3px] rounded-pill bg-brand-gradient"
        />
      ) : null}

      <Icon
        size={19}
        strokeWidth={1.75}
        className={isActive ? "text-brand-violet" : "text-text-secondary"}
        aria-hidden
      />
      <span
        className={cn(
          "flex-1 text-sm",
          isActive
            ? "font-semibold text-text-primary"
            : "font-medium text-text-secondary",
        )}
      >
        {item.label}
      </span>

      {item.badge ? <NavBadge label={item.badge} /> : null}
    </Link>
  );
}

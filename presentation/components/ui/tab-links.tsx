import Link from "next/link";
import type { TabLinksProps } from "@/types/nomina-ui.types";
import { cn } from "@/utils/cn";

/**
 * Pestañas que son enlaces: cada una es una URL, así que se pueden compartir y
 * el botón atrás funciona. La activa lleva el subrayado lila.
 */
export function TabLinks({ label, items, className }: TabLinksProps) {
  return (
    <nav aria-label={label} className={cn("flex gap-7 overflow-x-auto", className)}>
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          scroll={false}
          aria-current={item.isActive ? "page" : undefined}
          className={cn(
            "shrink-0 border-b-2 px-0.5 pb-3 text-sm whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:ring-lilac focus-visible:outline-none",
            item.isActive
              ? "border-lilac font-normal text-text-primary"
              : "border-transparent font-light text-text-muted hover:text-text-secondary",
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

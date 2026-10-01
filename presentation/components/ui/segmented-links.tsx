import Link from "next/link";
import { LinkPendingLabel } from "@/presentation/components/ui/link-pending-label";
import type { SegmentedLinksProps } from "@/types/ui.types";
import { cn } from "@/utils/cn";

/**
 * Como `SegmentedControl`, pero cada opción es un enlace: sirve cuando elegir
 * cambia la URL, así se puede abrir en otra pestaña, compartir o volver atrás.
 * Ninguna queda marcada si la selección vigente no es una de ellas.
 */
export function SegmentedLinks({ label, items }: SegmentedLinksProps) {
  return (
    <nav
      aria-label={label}
      className="flex h-11 max-w-full shrink-0 items-center gap-0.5 overflow-x-auto rounded-pill border border-border bg-surface p-1 [scrollbar-width:none]"
    >
      {items.map((item) => (
        <Link
          key={item.key}
          href={item.href}
          aria-current={item.isActive ? "page" : undefined}
          className={cn(
            "flex h-full shrink-0 items-center rounded-pill px-3.5 text-[13px] font-normal whitespace-nowrap",
            "transition-[background-color,color,transform] duration-150 ease-out active:scale-[0.97]",
            "focus-visible:ring-2 focus-visible:ring-lilac focus-visible:outline-none",
            item.isActive ? "bg-ink text-g-50" : "text-text-secondary hover:text-text-primary",
          )}
        >
          <LinkPendingLabel>{item.label}</LinkPendingLabel>
        </Link>
      ))}
    </nav>
  );
}

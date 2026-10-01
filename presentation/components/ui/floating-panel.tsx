import type { FloatingPanelProps } from "@/types/global-search.types";
import { cn } from "@/utils/cn";

/**
 * Panel flotante genérico anclado bajo su contenedor (que debe ser `relative`):
 * el vidrio de los menús, con su sombra de flotar. Agnóstico de lo que contenga.
 */
export function FloatingPanel({ id, className, children }: FloatingPanelProps) {
  return (
    <div
      id={id}
      className={cn("glass-menu absolute top-full right-0 z-30 mt-2 rounded-[18px] p-2", className)}
    >
      {children}
    </div>
  );
}

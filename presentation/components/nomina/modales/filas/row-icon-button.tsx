import type { RowIconButtonProps } from "@/types/nomina-modales-filas.types";
import { cn } from "@/utils/cn";

/** Botón de icono pequeño de una fila de tabla (asa, editar, eliminar). */
export function RowIconButton({ label, onClick, icon, tone = "neutral", isHandle = false }: RowIconButtonProps) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      onClick={onClick}
      className={cn(
        "grid size-8 shrink-0 place-items-center rounded-sm transition-colors focus-visible:ring-2 focus-visible:ring-lilac focus-visible:outline-none",
        isHandle ? "cursor-grab text-text-muted hover:text-text-secondary active:cursor-grabbing" : "cursor-pointer hover:bg-surface",
        !isHandle && (tone === "danger" ? "text-danger/80 hover:text-danger" : "text-text-secondary hover:text-text-primary"),
      )}
    >
      {icon}
    </button>
  );
}

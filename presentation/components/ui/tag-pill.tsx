import type { TagPillProps } from "@/types/ui.types";

/** Etiqueta neutra en píldora; en `B2` marca el género musical del cliente. */
export function TagPill({ label }: TagPillProps) {
  return (
    <span className="rounded-pill bg-card-elevated px-[11px] py-[5px] text-xs font-medium text-text-secondary">
      {label}
    </span>
  );
}

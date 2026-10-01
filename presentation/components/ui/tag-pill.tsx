import type { TagPillProps } from "@/types/ui.types";

/** Etiqueta neutra en píldora; en `B2` marca el género musical del cliente. */
export function TagPill({ label }: TagPillProps) {
  return (
    <span className="rounded-pill border border-border bg-surface px-2.5 py-1 text-xs font-normal text-text-secondary">
      {label}
    </span>
  );
}

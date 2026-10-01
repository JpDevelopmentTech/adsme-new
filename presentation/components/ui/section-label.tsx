import type { SectionLabelProps } from "@/types/dashboard.types";

/** Encabezado de grupo dentro de la navegación lateral. */
export function SectionLabel({ children }: SectionLabelProps) {
  return (
    <p className="px-3 pb-1.5 text-[11px] font-normal tracking-[1.4px] text-text-muted uppercase">
      {children}
    </p>
  );
}

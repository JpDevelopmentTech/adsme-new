import type { ShareSectionProps } from "@/types/nomina-modales-perfil.types";

/** Sección de accesos con su rótulo en mayúsculas y el texto de vacío. */
export function ShareSection({ title, emptyText }: ShareSectionProps) {
  return (
    <section className="flex flex-col gap-2.5">
      <h3 className="text-[11px] font-light tracking-[0.14em] text-text-muted uppercase">{title}</h3>
      <p className="rounded-md border border-dashed border-border px-4 py-3.5 text-[13px] font-light text-text-secondary">{emptyText}</p>
    </section>
  );
}

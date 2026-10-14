import type { PortalStateCardProps } from "@/types/nomina-perfil.types";

/** Estado de entrada del portal: una tarjeta centrada con icono, título, texto y acción. */
export function PortalStateCard({ icon, title, description, action }: PortalStateCardProps) {
  return (
    <section className="glass-panel mx-auto my-auto flex w-full max-w-[420px] flex-col items-center gap-4 rounded-card px-8 py-12 text-center">
      <span className="grid size-[52px] place-items-center rounded-[16px] border border-border-strong bg-surface text-text-primary">{icon}</span>
      <h1 className="text-lg font-normal text-text-primary">{title}</h1>
      {description ? <p className="text-[13px] leading-[1.5] text-text-muted">{description}</p> : null}
      {action}
    </section>
  );
}

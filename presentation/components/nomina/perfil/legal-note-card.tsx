import type { LegalNoteCardProps } from "@/types/nomina-perfil.types";

/** Tarjeta corta de Legal: icono lila, título y la frase de que aún no hay nada. */
export function LegalNoteCard({ icon: Icon, title, description }: LegalNoteCardProps) {
  return (
    <section className="glass-panel flex min-w-0 flex-1 flex-col gap-4 rounded-card p-6">
      <div className="flex items-center gap-3">
        <span className="grid size-9 place-items-center rounded-[11px] border border-border bg-surface text-lilac">
          <Icon size={17} strokeWidth={1.5} aria-hidden />
        </span>
        <h2 className="text-lg font-light text-text-primary">{title}</h2>
      </div>
      <p className="text-[13px] text-text-muted">{description}</p>
    </section>
  );
}

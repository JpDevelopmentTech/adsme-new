import { Hammer } from "lucide-react";
import type { PendingScreenNoticeProps } from "@/types/dashboard.types";

/** Marcador para las secciones cuyo diseño existe en el `.pen` pero aún no se implementó. */
export function PendingScreenNotice({ screen }: PendingScreenNoticeProps) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-card border border-dashed border-border bg-surface px-8 py-16 text-center">
      <Hammer size={22} className="text-text-muted" aria-hidden />
      <p className="text-sm text-text-secondary">
        Pantalla pendiente de implementar.
      </p>
      <p className="text-[13px] text-text-muted">
        Diseño disponible en <span className="text-text-secondary">{screen}</span>
      </p>
    </div>
  );
}

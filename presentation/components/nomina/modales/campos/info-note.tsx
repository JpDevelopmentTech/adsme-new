import { AlertTriangle } from "lucide-react";
import type { InfoNoteProps } from "@/types/nomina-modales-fields.types";

/** Nota explicativa en gris con el icono de aviso, bajo la distribución. */
export function InfoNote({ children }: InfoNoteProps) {
  return (
    <p className="flex items-start gap-2 text-xs leading-[1.45] font-light text-text-secondary">
      <AlertTriangle size={12} strokeWidth={1.75} aria-hidden className="mt-0.5 shrink-0" />
      <span>{children}</span>
    </p>
  );
}

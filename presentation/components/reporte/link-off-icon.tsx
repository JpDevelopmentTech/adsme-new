import { Unlink } from "lucide-react";

/** Icono del estado de enlace inválido, sobre el círculo atenuado del sistema. */
export function LinkOff() {
  return (
    <span className="grid size-14 place-items-center rounded-pill bg-card-elevated">
      <Unlink size={24} className="text-text-muted" aria-hidden />
    </span>
  );
}

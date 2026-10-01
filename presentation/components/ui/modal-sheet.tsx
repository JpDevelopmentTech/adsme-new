"use client";

import { useEffect, useRef } from "react";
import type { ModalSheetProps } from "@/types/ui.types";

/**
 * Contenedor modal genérico: pone la lámina por encima de todo y deja el
 * contenido a quien lo abre. Usa `<dialog>` nativo, que ya trae el cierre con
 * Escape, el atrapado de foco y el fondo inerte.
 */
export function ModalSheet({
  isOpen,
  label,
  onClose,
  children,
}: ModalSheetProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  return (
    <dialog
      ref={dialogRef}
      aria-label={label}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose();
      }}
      className="glass-float m-auto w-[min(460px,calc(100vw-2rem))] rounded-[30px] p-0 text-text-primary backdrop:bg-[#0a041a8c] backdrop:backdrop-blur-[8px]"
    >
      {children}
    </dialog>
  );
}

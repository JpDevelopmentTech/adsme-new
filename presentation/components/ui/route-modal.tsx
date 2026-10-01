"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import type { RouteModalProps } from "@/types/ui.types";

/**
 * Modal ligado a una ruta interceptada: se abre al montarse y, al cerrarse con
 * Escape o pulsando fuera, vuelve atrás en el historial para que la URL y la
 * pantalla de debajo queden como estaban. Usa `<dialog>` nativo.
 */
export function RouteModal({ label, children }: RouteModalProps) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
  }, []);

  return (
    <dialog
      ref={dialogRef}
      aria-label={label}
      onCancel={(event) => {
        event.preventDefault();
        router.back();
      }}
      onClick={(event) => {
        if (event.target === dialogRef.current) router.back();
      }}
      className="m-auto max-h-[calc(100dvh-2rem)] w-[min(940px,calc(100vw-2rem))] overflow-visible bg-transparent p-0 text-text-primary backdrop:bg-[#0a041a8c] backdrop:backdrop-blur-[8px]"
    >
      {children}
    </dialog>
  );
}

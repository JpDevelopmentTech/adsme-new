"use client";

import { Trash2 } from "lucide-react";
import { useState } from "react";
import type { InlineDeleteButtonProps } from "@/types/nomina-modales-filas.types";
import { cn } from "@/utils/cn";

/**
 * Papelera con confirmación en línea: el primer clic la cambia por la píldora
 * roja «¿Eliminar?» y el segundo borra; perder el foco la devuelve a papelera.
 */
export function InlineDeleteButton({ label, confirmLabel, onConfirm, isPending = false }: InlineDeleteButtonProps) {
  const [isConfirming, setIsConfirming] = useState(false);

  const click = () => {
    if (!isConfirming) return setIsConfirming(true);
    setIsConfirming(false);
    onConfirm();
  };

  return (
    <button
      type="button"
      title={isConfirming ? undefined : label}
      aria-label={isConfirming ? `${confirmLabel} ${label}` : label}
      aria-busy={isPending}
      disabled={isPending}
      onClick={click}
      onBlur={() => setIsConfirming(false)}
      className={cn(
        "grid h-8 shrink-0 cursor-pointer place-items-center rounded-pill transition-colors focus-visible:ring-2 focus-visible:ring-lilac focus-visible:outline-none disabled:cursor-wait disabled:opacity-50",
        isConfirming ? "bg-danger px-3 text-xs font-normal text-canvas" : "w-8 text-danger/80 hover:bg-surface hover:text-danger",
      )}
    >
      {isConfirming ? confirmLabel : <Trash2 size={15} strokeWidth={1.5} aria-hidden />}
    </button>
  );
}

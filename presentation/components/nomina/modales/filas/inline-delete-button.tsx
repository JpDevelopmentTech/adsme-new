"use client";

import { Trash2 } from "lucide-react";
import { useState } from "react";
import type { InlineDeleteButtonProps } from "@/types/nomina-modales-filas.types";
import { cn } from "@/utils/cn";

/**
 * Papelera con confirmación en línea: el primer clic la cambia por la píldora
 * roja «¿Eliminar?»; perder el foco la devuelve a papelera. Sin persistencia, el
 * segundo clic solo cierra la confirmación.
 */
export function InlineDeleteButton({ label, confirmLabel }: InlineDeleteButtonProps) {
  const [isConfirming, setIsConfirming] = useState(false);

  return (
    <button
      type="button"
      title={isConfirming ? undefined : label}
      aria-label={isConfirming ? `${confirmLabel} ${label}` : label}
      onClick={() => setIsConfirming((value) => !value)}
      onBlur={() => setIsConfirming(false)}
      className={cn(
        "grid h-8 shrink-0 cursor-pointer place-items-center rounded-pill transition-colors focus-visible:ring-2 focus-visible:ring-lilac focus-visible:outline-none",
        isConfirming ? "bg-danger px-3 text-xs font-normal text-canvas" : "w-8 text-danger/80 hover:bg-surface hover:text-danger",
      )}
    >
      {isConfirming ? confirmLabel : <Trash2 size={15} strokeWidth={1.5} aria-hidden />}
    </button>
  );
}

"use client";

import { useEffect, useRef } from "react";
import type { ConfirmDialogProps } from "@/types/ui.types";
import { cn } from "@/utils/cn";

/** Cuadro tintado del icono según el tono del diálogo. */
const TONE_CLASSES = {
  danger: "bg-danger/14 text-danger",
  warning: "bg-warning/14 text-warning",
} as const;

/**
 * Diálogo modal de confirmación para acciones destructivas, en vidrio flotante.
 * Usa `<dialog>` nativo: aporta cierre con Escape y atrapado de foco.
 */
export function ConfirmDialog({
  isOpen,
  title,
  description,
  cancelLabel,
  onCancel,
  icon,
  tone = "danger",
  children,
}: ConfirmDialogProps) {
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
      onClose={onCancel}
      onClick={(event) => {
        if (event.target === dialogRef.current) onCancel();
      }}
      className="glass-float m-auto w-[min(420px,calc(100vw-2rem))] rounded-[26px] p-7 text-text-primary backdrop:bg-[#0a041a8c] backdrop:backdrop-blur-[8px]"
    >
      <div className="flex flex-col gap-5">
        {icon ? (
          <span className={cn("grid size-12 place-items-center rounded-[16px]", TONE_CLASSES[tone])}>
            {icon}
          </span>
        ) : null}

        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-light">{title}</h2>
          <p className="text-sm leading-[1.5] text-text-secondary">{description}</p>
        </div>

        <div className="flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onCancel}
            className="cursor-pointer rounded-pill border border-border-strong bg-surface px-[18px] py-[10px] text-sm font-normal text-text-primary transition-colors hover:bg-g-100"
          >
            {cancelLabel}
          </button>
          {children}
        </div>
      </div>
    </dialog>
  );
}

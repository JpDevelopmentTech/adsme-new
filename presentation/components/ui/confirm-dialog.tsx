"use client";

import { useEffect, useRef } from "react";
import type { ConfirmDialogProps } from "@/types/ui.types";

/**
 * Diálogo modal de confirmación para acciones destructivas.
 * Usa `<dialog>` nativo: aporta cierre con Escape y atrapado de foco.
 */
export function ConfirmDialog({
  isOpen,
  title,
  description,
  cancelLabel,
  onCancel,
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
      className="m-auto w-[min(420px,calc(100vw-2rem))] rounded-card border border-border bg-card p-6 text-text-primary backdrop:bg-black/40 backdrop:backdrop-blur-sm"
    >
      <div className="flex flex-col gap-2">
        <h2 className="font-display text-lg font-bold">{title}</h2>
        <p className="text-[13px] leading-[1.5] text-text-secondary">
          {description}
        </p>
      </div>

      <div className="mt-6 flex items-center justify-end gap-2.5">
        <button
          type="button"
          onClick={onCancel}
          className="cursor-pointer rounded-pill border border-border-strong px-5 py-2.5 text-[13px] font-semibold text-text-primary transition-colors hover:bg-card-elevated"
        >
          {cancelLabel}
        </button>
        {children}
      </div>
    </dialog>
  );
}

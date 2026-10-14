"use client";

import { ModalSheet } from "@/presentation/components/ui/modal-sheet";
import type { ActionDialogProps } from "@/types/modal-layout.types";

/**
 * Diálogo de confirmación con cuerpo propio: a diferencia de `ConfirmDialog`,
 * admite descripción con énfasis y contenido extra (p. ej. un campo que hay que
 * llenar para habilitar la acción).
 */
export function ActionDialog({ isOpen, onClose, icon, title, description, children, actions }: ActionDialogProps) {
  return (
    <ModalSheet isOpen={isOpen} label={title} onClose={onClose} widthClassName="w-[min(460px,calc(100vw-2rem))]">
      <div className="flex flex-col gap-5 p-7">
        <span aria-hidden className="grid size-12 place-items-center rounded-[16px] bg-danger/14 text-danger">
          {icon}
        </span>
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-light">{title}</h2>
          <div className="text-sm leading-[1.5] font-light text-text-secondary">{description}</div>
        </div>
        {children}
        <div className="flex flex-wrap items-center justify-end gap-2.5">{actions}</div>
      </div>
    </ModalSheet>
  );
}

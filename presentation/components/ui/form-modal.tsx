"use client";

import { ModalFooter } from "@/presentation/components/ui/modal-footer";
import { ModalHeader } from "@/presentation/components/ui/modal-header";
import { ModalSheet } from "@/presentation/components/ui/modal-sheet";
import type { FormModalProps } from "@/types/modal-layout.types";

/**
 * Lámina modal con formulario: cabecera y pie fijos, cuerpo con scroll propio.
 * Enviar no hace nada por sí mismo; quien lo usa decide qué pasa en `onSubmit`.
 */
export function FormModal({
  isOpen,
  onClose,
  title,
  subtitle,
  closeLabel,
  widthClassName,
  headerExtra,
  submitLabel,
  cancelLabel,
  isSubmitDisabled,
  onSubmit,
  children,
}: FormModalProps) {
  return (
    <ModalSheet isOpen={isOpen} label={title} onClose={onClose} widthClassName={widthClassName}>
      <form
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          if (!isSubmitDisabled) onSubmit();
        }}
        className="flex max-h-[calc(100dvh-2rem)] flex-col"
      >
        <div className="border-b border-border">
          <ModalHeader title={title} subtitle={subtitle} closeLabel={closeLabel} onClose={onClose} />
          {headerExtra}
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-6 sm:px-8">{children}</div>
        <ModalFooter submitLabel={submitLabel} cancelLabel={cancelLabel} isSubmitDisabled={isSubmitDisabled} onCancel={onClose} />
      </form>
    </ModalSheet>
  );
}

"use client";

import { CLIENT_FORM_COPY } from "@/constants/client-form-copy.constants";
import { ClientCreateForm } from "@/presentation/components/clientes/client-create-form";
import { ModalSheet } from "@/presentation/components/ui/modal-sheet";
import type { ClientCreateDialogProps } from "@/types/client-form.types";

/**
 * Alta de cliente sin salir de la pantalla en curso. El formulario se monta al
 * abrir y se desmonta al cerrar, así cada apertura empieza en limpio; al
 * cerrarse, el `<dialog>` nativo devuelve el foco al selector que lo abrió.
 */
export function ClientCreateDialog({ isOpen, ...form }: ClientCreateDialogProps) {
  return (
    <ModalSheet
      isOpen={isOpen}
      label={CLIENT_FORM_COPY.createTitle}
      onClose={form.onClose}
      widthClassName="w-[min(940px,calc(100vw-2rem))]"
      surfaceClassName="overflow-visible bg-transparent"
    >
      {isOpen ? <ClientCreateForm {...form} /> : null}
    </ModalSheet>
  );
}

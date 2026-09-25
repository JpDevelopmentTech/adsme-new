"use client";

import { CONNECTIONS_COPY } from "@/constants/connections.constants";
import { ConfirmDialog } from "@/presentation/components/ui/confirm-dialog";
import { DangerButton } from "@/presentation/components/ui/danger-button";
import type { DisconnectDialogProps } from "@/types/connections.types";

/**
 * Confirmación de «Desconectar». No se hace de un clic porque borra las
 * campañas importadas y las saca de los trabajos a los que estaban asignadas.
 */
export function DisconnectDialog({
  isOpen,
  platform,
  action,
  onCancel,
}: DisconnectDialogProps) {
  return (
    <ConfirmDialog
      isOpen={isOpen}
      onCancel={onCancel}
      title={CONNECTIONS_COPY.disconnectTitle(platform)}
      description={CONNECTIONS_COPY.disconnectDescription(platform)}
      cancelLabel={CONNECTIONS_COPY.cancel}
    >
      <form action={action}>
        <DangerButton type="submit">{CONNECTIONS_COPY.disconnect}</DangerButton>
      </form>
    </ConfirmDialog>
  );
}

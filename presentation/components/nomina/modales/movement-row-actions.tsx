"use client";

import { GripVertical, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { DELETE_COPY } from "@/constants/nomina-modales-perfil-copy.constants";
import { MODAL_COMMON_COPY } from "@/constants/nomina-modales-copy.constants";
import { RowIconButton } from "@/presentation/components/nomina/modales/filas/row-icon-button";
import { IncomeModal } from "@/presentation/components/nomina/modales/ingreso/income-modal";
import { ConfirmDialog } from "@/presentation/components/ui/confirm-dialog";
import { DangerButton } from "@/presentation/components/ui/danger-button";
import type { MovementRowActionsProps } from "@/types/nomina-modals.types";
import { formatExactCurrency } from "@/utils/format-exact-currency";
import { formatLongDate } from "@/utils/format-nomina-dates";
import { incomeConceptLabel } from "@/utils/income-concept-label";
import { resolveIncomeContext } from "@/utils/resolve-income-context";

/** Acciones de un movimiento: asa de reordenar (solo visual), editar y eliminar. */
export function MovementRowActions({ artist, movement, ...month }: MovementRowActionsProps) {
  const [dialog, setDialog] = useState<"edit" | "delete" | null>(null);
  const close = () => setDialog(null);

  return (
    <div className="flex items-center justify-end gap-0.5">
      <RowIconButton label={DELETE_COPY.movementDrag} icon={<GripVertical size={15} strokeWidth={1.5} aria-hidden />} isHandle />
      <RowIconButton label={DELETE_COPY.movementEdit} icon={<Pencil size={15} strokeWidth={1.5} aria-hidden />} onClick={() => setDialog("edit")} />
      <RowIconButton label={DELETE_COPY.movementRemove} icon={<Trash2 size={15} strokeWidth={1.5} aria-hidden />} tone="danger" onClick={() => setDialog("delete")} />
      {dialog === "edit" ? <IncomeModal isOpen onClose={close} artist={artist} movement={movement} {...resolveIncomeContext(artist.nomina, month)} /> : null}
      <ConfirmDialog
        isOpen={dialog === "delete"}
        title={DELETE_COPY.movementTitle}
        description={DELETE_COPY.movementText(incomeConceptLabel(movement), formatExactCurrency(movement.amount), formatLongDate(movement.eventDate))}
        cancelLabel={MODAL_COMMON_COPY.cancel}
        onCancel={close}
        icon={<Trash2 size={20} strokeWidth={1.5} aria-hidden />}
      >
        <DangerButton type="button" onClick={close}>
          {DELETE_COPY.movementButton}
        </DangerButton>
      </ConfirmDialog>
    </div>
  );
}

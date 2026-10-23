"use client";

import { Pencil } from "lucide-react";
import { useState } from "react";
import { EXPENSE_MODAL_COPY } from "@/constants/nomina-modales-gasto-copy.constants";
import { deleteNominaExpenseAction } from "@/presentation/actions/delete-nomina-expense-action";
import { FieldMessage } from "@/presentation/components/nomina/modales/campos/field-message";
import { InlineDeleteButton } from "@/presentation/components/nomina/modales/filas/inline-delete-button";
import { RowIconButton } from "@/presentation/components/nomina/modales/filas/row-icon-button";
import { ExpenseModal } from "@/presentation/components/nomina/modales/gasto/expense-modal";
import { useNominaAction } from "@/presentation/hooks/use-nomina-action";
import type { ExpenseRowActionsProps } from "@/types/nomina-modals.types";

/** Editar un gasto (modal precargado) y eliminarlo con confirmación en línea. */
export function ExpenseRowActions({ artist, expense }: ExpenseRowActionsProps) {
  const [isEditing, setIsEditing] = useState(false);
  const remove = useNominaAction(deleteNominaExpenseAction, () => undefined);

  return (
    <div className="flex flex-col items-end gap-1">
      <div className="flex items-center justify-end gap-0.5">
        <RowIconButton label={EXPENSE_MODAL_COPY.edit(expense.concept)} icon={<Pencil size={15} strokeWidth={1.5} aria-hidden />} onClick={() => setIsEditing(true)} />
        <InlineDeleteButton
          label={EXPENSE_MODAL_COPY.remove(expense.concept)}
          confirmLabel={EXPENSE_MODAL_COPY.confirmRemove}
          isPending={remove.isPending}
          onConfirm={() => remove.run({ id: expense.id, clientId: artist.id })}
        />
      </div>
      {remove.error ? <FieldMessage tone="danger">{remove.error}</FieldMessage> : null}
      {isEditing ? <ExpenseModal isOpen onClose={() => setIsEditing(false)} artist={artist} expense={expense} /> : null}
    </div>
  );
}

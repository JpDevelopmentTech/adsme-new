"use client";

import { MODAL_COMMON_COPY } from "@/constants/nomina-modales-copy.constants";
import { EXPENSE_MODAL_COPY } from "@/constants/nomina-modales-gasto-copy.constants";
import { saveNominaExpenseAction } from "@/presentation/actions/save-nomina-expense-action";
import { FieldMessage } from "@/presentation/components/nomina/modales/campos/field-message";
import { ExpenseDateFields } from "@/presentation/components/nomina/modales/gasto/expense-date-fields";
import { ExpenseMainFields } from "@/presentation/components/nomina/modales/gasto/expense-main-fields";
import { FormModal } from "@/presentation/components/ui/form-modal";
import { useExpenseForm } from "@/presentation/hooks/use-expense-form";
import { useNominaAction } from "@/presentation/hooks/use-nomina-action";
import type { ExpenseModalProps } from "@/types/nomina-modales-gasto.types";
import { buildExpenseDraft } from "@/utils/build-expense-draft";

/** Modal «Nuevo Gasto» / «Editar Gasto» (con `expense`): guarda el gasto del artista. */
export function ExpenseModal({ isOpen, onClose, artist, expense }: ExpenseModalProps) {
  const form = useExpenseForm(expense);
  const save = useNominaAction(saveNominaExpenseAction, onClose);
  const isEdit = expense !== undefined;

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? EXPENSE_MODAL_COPY.editTitle : EXPENSE_MODAL_COPY.newTitle}
      subtitle={EXPENSE_MODAL_COPY.subtitle(artist.name)}
      closeLabel={MODAL_COMMON_COPY.close}
      widthClassName="w-[min(560px,calc(100vw-2rem))]"
      submitLabel={save.isPending ? MODAL_COMMON_COPY.saving : isEdit ? MODAL_COMMON_COPY.saveChanges : EXPENSE_MODAL_COPY.submitNew}
      cancelLabel={MODAL_COMMON_COPY.cancel}
      isSubmitDisabled={!form.canSave || save.isPending}
      onSubmit={() => save.run({ id: expense?.id, draft: buildExpenseDraft(artist.id, form.values) })}
    >
      <div className="flex flex-col gap-6">
        <ExpenseMainFields form={form} />
        <ExpenseDateFields form={form} />
        {save.error ? <FieldMessage tone="danger">{save.error}</FieldMessage> : null}
      </div>
    </FormModal>
  );
}

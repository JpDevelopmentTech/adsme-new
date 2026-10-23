"use client";

import { INCOME_CONCEPT_OPTIONS } from "@/constants/nomina-modales.constants";
import { MODAL_COMMON_COPY } from "@/constants/nomina-modales-copy.constants";
import { INCOME_MODAL_COPY } from "@/constants/nomina-modales-ingreso-copy.constants";
import { saveNominaIncomeAction } from "@/presentation/actions/save-nomina-income-action";
import { ChoiceButtons } from "@/presentation/components/nomina/modales/campos/choice-buttons";
import { FieldMessage } from "@/presentation/components/nomina/modales/campos/field-message";
import { FieldShell } from "@/presentation/components/nomina/modales/campos/field-shell";
import { ClientChip } from "@/presentation/components/nomina/modales/ingreso/client-chip";
import { IncomeConceptBlock } from "@/presentation/components/nomina/modales/ingreso/income-concept-block";
import { IncomeDatesFields } from "@/presentation/components/nomina/modales/ingreso/income-dates-fields";
import { IncomeExtraFields } from "@/presentation/components/nomina/modales/ingreso/income-extra-fields";
import { FormModal } from "@/presentation/components/ui/form-modal";
import { useIncomeForm } from "@/presentation/hooks/use-income-form";
import { useNominaAction } from "@/presentation/hooks/use-nomina-action";
import type { IncomeModalProps } from "@/types/nomina-modales-ingreso.types";

/**
 * Modal «Nuevo Ingreso» / «Editar Ingreso» (con `movement`). Calcula la
 * distribución con el modelo del artista y la guarda tal cual queda.
 */
export function IncomeModal({ isOpen, onClose, artist, movement }: IncomeModalProps) {
  const form = useIncomeForm(artist, movement);
  const save = useNominaAction(saveNominaIncomeAction, onClose);
  const isEdit = movement !== undefined;

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? INCOME_MODAL_COPY.editTitle : INCOME_MODAL_COPY.newTitle}
      subtitle={isEdit ? INCOME_MODAL_COPY.editSubtitle : INCOME_MODAL_COPY.newSubtitle}
      closeLabel={MODAL_COMMON_COPY.close}
      widthClassName="w-[min(640px,calc(100vw-2rem))]"
      submitLabel={save.isPending ? MODAL_COMMON_COPY.saving : isEdit ? MODAL_COMMON_COPY.saveChanges : INCOME_MODAL_COPY.submitNew}
      cancelLabel={MODAL_COMMON_COPY.cancel}
      isSubmitDisabled={!form.canSave || save.isPending}
      onSubmit={() => save.run({ id: movement?.id, draft: form.draft })}
    >
      <div className="flex flex-col gap-6">
        <ClientChip artist={artist} />
        <FieldShell label={INCOME_MODAL_COPY.concept}>
          <ChoiceButtons
            label={INCOME_MODAL_COPY.concept}
            value={form.values.concept}
            options={INCOME_CONCEPT_OPTIONS}
            onChange={(concept) => form.setSplitInput({ concept, amount: form.values.amount ?? artist.nomina })}
          />
        </FieldShell>
        <IncomeConceptBlock form={form} artist={artist} />
        <IncomeDatesFields form={form} artist={artist} />
        <IncomeExtraFields form={form} artist={artist} />
        {save.error ? <FieldMessage tone="danger">{save.error}</FieldMessage> : null}
      </div>
    </FormModal>
  );
}

import { INCOME_MODAL_COPY } from "@/constants/nomina-modales-ingreso-copy.constants";
import { FieldShell } from "@/presentation/components/nomina/modales/campos/field-shell";
import { FileDropZone } from "@/presentation/components/nomina/modales/campos/file-drop-zone";
import { TextAreaInput } from "@/presentation/components/nomina/modales/campos/text-area-input";
import type { IncomeSectionProps } from "@/types/nomina-modales-ingreso.types";

/** «Descripción (opcional)» y «Comprobante de pago (opcional)». */
export function IncomeExtraFields({ form }: IncomeSectionProps) {
  return (
    <>
      <FieldShell htmlFor="income-description" label={INCOME_MODAL_COPY.description} hint={INCOME_MODAL_COPY.descriptionHelp}>
        <TextAreaInput
          id="income-description"
          value={form.values.description}
          placeholder={INCOME_MODAL_COPY.descriptionPlaceholder}
          onChange={(event) => form.set({ description: event.target.value })}
        />
      </FieldShell>
      <FieldShell htmlFor="income-receipt" label={INCOME_MODAL_COPY.receipt}>
        <FileDropZone
          id="income-receipt"
          fileName={form.values.fileName}
          onChange={(fileName) => form.set({ fileName })}
          emptyLabel={INCOME_MODAL_COPY.receiptEmpty}
          changeLabel={INCOME_MODAL_COPY.receiptChange}
        />
      </FieldShell>
    </>
  );
}

import { Check } from "lucide-react";
import { PrimaryButton } from "@/presentation/components/ui/primary-button";
import { SecondaryButton } from "@/presentation/components/ui/secondary-button";
import type { ModalFooterProps } from "@/types/modal-layout.types";

/** Pie de una lámina con formulario: «Cancelar» y el primario blanco con check. */
export function ModalFooter({ submitLabel, cancelLabel, isSubmitDisabled, onCancel }: ModalFooterProps) {
  return (
    <footer className="flex items-center justify-end gap-2.5 border-t border-border px-6 py-5 sm:px-8">
      <SecondaryButton type="button" icon={null} onClick={onCancel}>
        {cancelLabel}
      </SecondaryButton>
      <PrimaryButton type="submit" disabled={isSubmitDisabled}>
        <Check size={16} strokeWidth={1.75} aria-hidden />
        {submitLabel}
      </PrimaryButton>
    </footer>
  );
}

import { Check, X } from "lucide-react";
import { CLIENT_FORM_COPY } from "@/constants/client-form-copy.constants";
import { PrimaryButton } from "@/presentation/components/ui/primary-button";
import { SecondaryButton } from "@/presentation/components/ui/secondary-button";
import type { ClientFormFooterProps } from "@/types/client-form.types";

/** Pie del modal de cliente: cancelar y guardar, alineados a la derecha. */
export function ClientFormFooter({ isPending, onClose }: ClientFormFooterProps) {
  return (
    <div className="flex shrink-0 items-center justify-end gap-2.5 border-t border-border px-7 py-[18px]">
      <SecondaryButton
        type="button"
        onClick={onClose}
        icon={<X size={16} strokeWidth={1.75} aria-hidden />}
      >
        {CLIENT_FORM_COPY.cancel}
      </SecondaryButton>
      <PrimaryButton type="submit" isLoading={isPending}>
        {isPending ? null : <Check size={16} strokeWidth={1.75} aria-hidden />}
        {CLIENT_FORM_COPY.save}
      </PrimaryButton>
    </div>
  );
}

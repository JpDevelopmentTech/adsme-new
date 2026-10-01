import { X } from "lucide-react";
import { CLIENT_FORM_COPY } from "@/constants/client-form-copy.constants";
import { IconButton } from "@/presentation/components/ui/icon-button";
import type { ClientFormHeaderProps } from "@/types/client-form.types";

/** Cabecera del modal de cliente: el título y el botón de cerrar. */
export function ClientFormHeader({ title, onClose }: ClientFormHeaderProps) {
  return (
    <div className="flex shrink-0 items-center gap-4 border-b border-border py-5 pr-6 pl-8">
      <h1 className="flex-1 text-2xl font-light text-text-primary">{title}</h1>
      <IconButton
        label={CLIENT_FORM_COPY.cancel}
        onClick={onClose}
        icon={<X size={18} strokeWidth={1.5} className="text-text-primary" aria-hidden />}
      />
    </div>
  );
}

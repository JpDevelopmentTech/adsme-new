import { X } from "lucide-react";
import { IconButton } from "@/presentation/components/ui/icon-button";
import type { ModalHeaderProps } from "@/types/modal-layout.types";

/** Cabecera de una lámina modal: título, subtítulo y botón redondo de cerrar. */
export function ModalHeader({ title, subtitle, closeLabel, onClose }: ModalHeaderProps) {
  return (
    <header className="flex items-start justify-between gap-4 px-6 pt-6 pb-5 sm:px-8">
      <div className="flex min-w-0 flex-col gap-1">
        <h2 className="text-[22px] leading-tight font-light text-text-primary">{title}</h2>
        {subtitle ? <p className="text-[13px] font-light text-text-secondary">{subtitle}</p> : null}
      </div>
      <IconButton icon={<X size={18} strokeWidth={1.75} aria-hidden />} label={closeLabel} onClick={onClose} />
    </header>
  );
}

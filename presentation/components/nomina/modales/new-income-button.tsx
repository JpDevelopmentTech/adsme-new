"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { INCOME_MODAL_COPY } from "@/constants/nomina-modales-ingreso-copy.constants";
import { IncomeModal } from "@/presentation/components/nomina/modales/ingreso/income-modal";
import { PrimaryButton } from "@/presentation/components/ui/primary-button";
import type { NewIncomeButtonProps } from "@/types/nomina-modals.types";
import { resolveIncomeContext } from "@/utils/resolve-income-context";

/** Abre «Nuevo Ingreso» con el artista preseleccionado; `icon` es el «+» de la fila del roster. */
export function NewIncomeButton({ artist, variant, ...month }: NewIncomeButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(true);

  return (
    <>
      {variant === "icon" ? (
        <button
          type="button"
          title={INCOME_MODAL_COPY.openFor(artist.name)}
          aria-label={INCOME_MODAL_COPY.openFor(artist.name)}
          aria-haspopup="dialog"
          onClick={open}
          className="grid size-7 cursor-pointer place-items-center rounded-[9px] border border-lilac/30 bg-lilac/16 text-lilac transition-colors hover:bg-lilac/24 focus-visible:ring-2 focus-visible:ring-lilac focus-visible:outline-none"
        >
          <Plus size={14} strokeWidth={1.75} aria-hidden />
        </button>
      ) : (
        <PrimaryButton type="button" aria-haspopup="dialog" onClick={open}>
          <Plus size={16} strokeWidth={1.75} aria-hidden />
          {INCOME_MODAL_COPY.newTitle}
        </PrimaryButton>
      )}
      {isOpen ? <IncomeModal isOpen onClose={() => setIsOpen(false)} artist={artist} {...resolveIncomeContext(artist.nomina, month)} /> : null}
    </>
  );
}

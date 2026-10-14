"use client";

import { Receipt } from "lucide-react";
import { useState } from "react";
import { EXPENSE_MODAL_COPY } from "@/constants/nomina-modales-gasto-copy.constants";
import { ExpenseModal } from "@/presentation/components/nomina/modales/gasto/expense-modal";
import { SecondaryButton } from "@/presentation/components/ui/secondary-button";
import type { NewExpenseButtonProps } from "@/types/nomina-modals.types";

/** Abre «Nuevo Gasto» del artista. */
export function NewExpenseButton({ artist }: NewExpenseButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <SecondaryButton
        type="button"
        aria-haspopup="dialog"
        icon={<Receipt size={16} strokeWidth={1.5} aria-hidden />}
        aria-label={EXPENSE_MODAL_COPY.openFor(artist.name)}
        onClick={() => setIsOpen(true)}
      >
        {EXPENSE_MODAL_COPY.newTitle}
      </SecondaryButton>
      {isOpen ? <ExpenseModal isOpen onClose={() => setIsOpen(false)} artist={artist} /> : null}
    </>
  );
}

"use client";

import { UserPlus } from "lucide-react";
import { useState } from "react";
import { NOMINA_SHELL_COPY } from "@/constants/nomina-copy.constants";
import { NewArtistModal } from "@/presentation/components/nomina/modales/nuevo-artista/new-artist-modal";
import { PrimaryButton } from "@/presentation/components/ui/primary-button";
import type { NewArtistButtonProps } from "@/types/nomina-modals.types";

/**
 * Acción «Nuevo artista»: abre el modal de alta. El modal se monta al abrirlo,
 * así cada apertura empieza con el formulario limpio.
 */
export function NewArtistButton({ eligibleClients }: NewArtistButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <PrimaryButton type="button" aria-haspopup="dialog" onClick={() => setIsOpen(true)}>
        <UserPlus size={16} strokeWidth={1.75} aria-hidden />
        {NOMINA_SHELL_COPY.newArtist}
      </PrimaryButton>
      {isOpen ? <NewArtistModal isOpen onClose={() => setIsOpen(false)} eligibleClients={eligibleClients} /> : null}
    </>
  );
}

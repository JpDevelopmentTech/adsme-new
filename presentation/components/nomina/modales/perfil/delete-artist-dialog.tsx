"use client";

import { AlertTriangle } from "lucide-react";
import { useState } from "react";
import { MODAL_COMMON_COPY } from "@/constants/nomina-modales-copy.constants";
import { DELETE_COPY } from "@/constants/nomina-modales-perfil-copy.constants";
import { TextInput } from "@/presentation/components/nomina/modales/campos/text-input";
import { ActionDialog } from "@/presentation/components/ui/action-dialog";
import { DangerButton } from "@/presentation/components/ui/danger-button";
import { SecondaryButton } from "@/presentation/components/ui/secondary-button";
import type { DeleteArtistDialogProps } from "@/types/nomina-modales-perfil.types";

/**
 * Eliminar artista en dos pasos: aviso con los movimientos que se pierden y,
 * luego, escribir el nombre (sin distinguir mayúsculas) para habilitar el borrado.
 */
export function DeleteArtistDialog({ isOpen, onClose, artist, movementCount }: DeleteArtistDialogProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [typed, setTyped] = useState("");
  const matches = typed.trim().toLocaleLowerCase("es") === artist.name.toLocaleLowerCase("es");
  const cancel = <SecondaryButton type="button" icon={null} onClick={onClose}>{MODAL_COMMON_COPY.cancel}</SecondaryButton>;

  if (step === 1) {
    return (
      <ActionDialog
        isOpen={isOpen}
        onClose={onClose}
        icon={<AlertTriangle size={20} strokeWidth={1.5} />}
        title={DELETE_COPY.artistTitle(artist.name)}
        description={
          <p>
            {DELETE_COPY.artistLead} <strong className="font-normal text-text-primary">{DELETE_COPY.artistCount(movementCount)}</strong> {DELETE_COPY.artistTail}{" "}
            <strong className="font-normal text-text-primary">{DELETE_COPY.artistIrreversible}</strong>
          </p>
        }
        actions={<>{cancel}<DangerButton type="button" onClick={() => setStep(2)}>{DELETE_COPY.continue}</DangerButton></>}
      />
    );
  }

  return (
    <ActionDialog
      isOpen={isOpen}
      onClose={onClose}
      icon={<AlertTriangle size={20} strokeWidth={1.5} />}
      title={DELETE_COPY.confirmTitle}
      description={<p>{DELETE_COPY.confirmLead} <strong className="font-normal text-text-primary">{artist.name}</strong></p>}
      actions={<>{cancel}<DangerButton type="submit" form="delete-artist-form" disabled={!matches}>{DELETE_COPY.confirmButton}</DangerButton></>}
    >
      <form id="delete-artist-form" onSubmit={(event) => { event.preventDefault(); if (matches) onClose(); }}>
        <TextInput
          autoFocus
          aria-label={DELETE_COPY.confirmInput}
          value={typed}
          placeholder={artist.name}
          isInvalid={typed !== "" && !matches}
          onChange={(event) => setTyped(event.target.value)}
        />
      </form>
    </ActionDialog>
  );
}

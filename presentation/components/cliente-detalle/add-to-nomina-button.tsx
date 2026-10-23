"use client";

import { UserPlus } from "lucide-react";
import { useState } from "react";
import { CLIENT_NOMINA_COPY } from "@/constants/client-nomina-copy.constants";
import { NewArtistModal } from "@/presentation/components/nomina/modales/nuevo-artista/new-artist-modal";
import { PrimaryButton } from "@/presentation/components/ui/primary-button";
import type { AddToNominaButtonProps } from "@/types/client-nomina.types";

/** «Agregar a Nómina» desde la ficha: abre el alta con este cliente ya elegido. */
export function AddToNominaButton({ client }: AddToNominaButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <PrimaryButton type="button" aria-haspopup="dialog" onClick={() => setIsOpen(true)}>
        <UserPlus size={16} strokeWidth={1.75} aria-hidden />
        {CLIENT_NOMINA_COPY.add}
      </PrimaryButton>
      {isOpen ? <NewArtistModal isOpen onClose={() => setIsOpen(false)} eligibleClients={[]} initialClient={client} /> : null}
    </>
  );
}

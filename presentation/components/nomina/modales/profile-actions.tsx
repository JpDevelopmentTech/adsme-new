"use client";

import { Settings, Share2, Trash2 } from "lucide-react";
import { useState } from "react";
import { PROFILE_ACTIONS_COPY } from "@/constants/nomina-modales-perfil-copy.constants";
import { DeleteArtistDialog } from "@/presentation/components/nomina/modales/perfil/delete-artist-dialog";
import { SettingsModal } from "@/presentation/components/nomina/modales/perfil/settings-modal";
import { ShareModal } from "@/presentation/components/nomina/modales/perfil/share-modal";
import { SecondaryButton } from "@/presentation/components/ui/secondary-button";
import type { ProfileActionsProps } from "@/types/nomina-modals.types";

/** Acciones del perfil: Compartir, Configuración y Eliminar artista, cada una con su modal. */
export function ProfileActions({ movementCount, ...settingsProps }: ProfileActionsProps) {
  const [open, setOpen] = useState<"share" | "settings" | "delete" | null>(null);
  const close = () => setOpen(null);
  const { artist } = settingsProps;

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <button
        type="button"
        aria-haspopup="dialog"
        onClick={() => setOpen("share")}
        className="flex cursor-pointer items-center gap-2 rounded-pill border border-lilac/30 bg-lilac/14 px-[18px] py-[10px] text-sm font-normal text-lilac transition-colors hover:bg-lilac/22 focus-visible:ring-2 focus-visible:ring-lilac focus-visible:outline-none"
      >
        <Share2 size={16} strokeWidth={1.5} aria-hidden />
        {PROFILE_ACTIONS_COPY.share}
      </button>
      <SecondaryButton type="button" aria-haspopup="dialog" icon={<Settings size={16} strokeWidth={1.5} aria-hidden />} onClick={() => setOpen("settings")}>
        {PROFILE_ACTIONS_COPY.settings}
      </SecondaryButton>
      <button
        type="button"
        aria-haspopup="dialog"
        onClick={() => setOpen("delete")}
        className="flex cursor-pointer items-center gap-2 rounded-pill px-3 py-[10px] text-sm font-light text-danger transition-colors hover:bg-danger/10 focus-visible:ring-2 focus-visible:ring-lilac focus-visible:outline-none"
      >
        <Trash2 size={16} strokeWidth={1.5} aria-hidden />
        {PROFILE_ACTIONS_COPY.remove}
      </button>
      {open === "share" ? <ShareModal isOpen onClose={close} artist={artist} /> : null}
      {open === "settings" ? <SettingsModal isOpen onClose={close} {...settingsProps} /> : null}
      {open === "delete" ? <DeleteArtistDialog isOpen onClose={close} artist={artist} movementCount={movementCount} /> : null}
    </div>
  );
}

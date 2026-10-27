"use client";

import { Camera, LoaderCircle } from "lucide-react";
import { PROFILE_COPY } from "@/constants/nomina-perfil-copy.constants";
import { NOMINA_PHOTO_ACCEPT } from "@/constants/nomina-photo.constants";
import { ArtistAvatar } from "@/presentation/components/nomina/artist-avatar";
import { useArtistPhotoUpload } from "@/presentation/hooks/use-artist-photo-upload";
import type { EditableProfilePhotoProps } from "@/types/nomina-perfil.types";
import { cn } from "@/utils/cn";

/**
 * Foto grande del artista con el botón para cambiarla: abre el selector de
 * archivos, enseña la imagen elegida mientras se sube y avisa si falla.
 */
export function EditableProfilePhoto({ clientId, name, photoUrl, semaphore }: EditableProfilePhotoProps) {
  const { inputRef, previewUrl, error, isPending, pick, onFileChange } = useArtistPhotoUpload(clientId);
  const label = isPending ? PROFILE_COPY.uploadingPhoto : PROFILE_COPY.changePhoto;

  return (
    <div className="relative shrink-0">
      <span className={cn("block transition-opacity", isPending && "opacity-60")}>
        <ArtistAvatar name={name} photoUrl={previewUrl ?? photoUrl} size={104} semaphore={semaphore} />
      </span>
      <input ref={inputRef} type="file" accept={NOMINA_PHOTO_ACCEPT} onChange={onFileChange} className="sr-only" tabIndex={-1} aria-hidden />
      <button
        type="button"
        onClick={pick}
        disabled={isPending}
        aria-label={label}
        title={label}
        className="absolute bottom-0 left-0 grid size-8 cursor-pointer place-items-center rounded-pill border border-border-strong bg-[#140b28] text-text-primary transition-colors hover:bg-[#21143d] focus-visible:ring-2 focus-visible:ring-lilac focus-visible:outline-none disabled:cursor-wait"
      >
        {isPending ? <LoaderCircle size={15} strokeWidth={1.5} className="animate-spin" aria-hidden /> : <Camera size={15} strokeWidth={1.5} aria-hidden />}
      </button>
      {error ? (
        <p role="alert" className="absolute top-full left-0 mt-2 w-56 text-xs text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}

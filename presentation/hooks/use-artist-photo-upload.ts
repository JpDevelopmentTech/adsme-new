"use client";

import { useEffect, useRef, useState, useTransition, type ChangeEvent } from "react";
import { NOMINA_PHOTO_FIELDS } from "@/constants/nomina-photo.constants";
import { saveNominaArtistPhotoAction } from "@/presentation/actions/save-nomina-artist-photo-action";
import type { ArtistPhotoUploadState } from "@/types/nomina-perfil.types";
import { validateAvatarFile } from "@/utils/validate-avatar-file";

/**
 * Cambio de foto desde el perfil: valida la imagen elegida, la enseña mientras
 * se sube y llama a la acción. Al terminar suelta la previsualización: la foto
 * guardada llega con el perfil refrescado.
 */
export function useArtistPhotoUpload(clientId: string): ArtistPhotoUploadState {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
  }, [previewUrl]);

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    const fileError = validateAvatarFile(file);
    if (fileError) return setError(fileError);

    setError(null);
    setPreviewUrl(URL.createObjectURL(file));
    startTransition(async () => {
      const formData = new FormData();
      formData.set(NOMINA_PHOTO_FIELDS.clientId, clientId);
      formData.set(NOMINA_PHOTO_FIELDS.photo, file);
      const result = await saveNominaArtistPhotoAction(formData);
      if (!result.ok) setError(result.message);
      setPreviewUrl(null);
    });
  };

  return { inputRef, previewUrl, error, isPending, pick: () => inputRef.current?.click(), onFileChange };
}

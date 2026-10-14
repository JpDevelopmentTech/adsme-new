"use client";

import { useState } from "react";
import { ARTIST_PHOTO_COPY } from "@/constants/nomina-modales-copy.constants";
import type { ArtistPhotoState } from "@/types/nomina-modales-artista.types";

/**
 * Foto elegida para un artista nuevo, leída en el navegador como data URL para
 * previsualizarla. Solo vive en el cliente: no se sube a ningún sitio.
 */
export function useArtistPhoto(): ArtistPhotoState {
  const [url, setUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const selectFile = (file: File | null | undefined) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError(ARTIST_PHOTO_COPY.notImage);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setUrl(typeof reader.result === "string" ? reader.result : null);
      setError(null);
    };
    reader.onerror = () => setError(ARTIST_PHOTO_COPY.unreadable);
    reader.readAsDataURL(file);
  };

  const remove = () => {
    setUrl(null);
    setError(null);
  };

  return { url, error, selectFile, remove };
}

"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { validateAvatarFile } from "@/utils/validate-avatar-file";

/**
 * Gestiona la foto elegida para el cliente: valida el archivo, expone una URL
 * de previsualización y libera el object URL anterior para no filtrar memoria.
 * El `<input type="file">` sigue siendo la fuente del archivo que se envía.
 */
export function useAvatarPreview(
  initialUrl: string | null,
  inputRef: RefObject<HTMLInputElement | null>,
) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialUrl);
  const [error, setError] = useState<string | null>(null);
  const [isRemoved, setIsRemoved] = useState(false);
  const objectUrlRef = useRef<string | null>(null);

  useEffect(() => {
    return () => {
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    };
  }, []);

  const releaseObjectUrl = () => {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
  };

  const selectFile = (file: File | null) => {
    releaseObjectUrl();

    if (!file) {
      if (inputRef.current) inputRef.current.value = "";
      setPreviewUrl(null);
      setError(null);
      setIsRemoved(true);
      return;
    }

    const validationError = validateAvatarFile(file);
    if (validationError) {
      if (inputRef.current) inputRef.current.value = "";
      setError(validationError);
      return;
    }

    const url = URL.createObjectURL(file);
    objectUrlRef.current = url;
    setPreviewUrl(url);
    setError(null);
    setIsRemoved(false);
  };

  return { previewUrl, error, isRemoved, selectFile };
}

"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { COPY_FEEDBACK_DURATION_MS } from "@/constants/ui.constants";
import type { UseCopyToClipboard } from "@/types/hooks.types";

/**
 * Copia texto al portapapeles y expone una confirmación temporal.
 * Si el navegador no expone la Clipboard API o deniega el permiso, no confirma.
 */
export function useCopyToClipboard(): UseCopyToClipboard {
  const [hasCopied, setHasCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const copy = useCallback(async (text: string) => {
    if (!navigator.clipboard) return;

    try {
      await navigator.clipboard.writeText(text);
    } catch {
      return;
    }

    setHasCopied(true);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(
      () => setHasCopied(false),
      COPY_FEEDBACK_DURATION_MS,
    );
  }, []);

  return { copy, hasCopied };
}

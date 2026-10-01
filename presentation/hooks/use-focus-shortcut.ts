"use client";

import { useEffect, type RefObject } from "react";

/** Enfoca y selecciona el campo con ⌘K (macOS) o Ctrl+K (resto), desde cualquier pantalla. */
export function useFocusShortcut(inputRef: RefObject<HTMLInputElement | null>, key = "k") {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === key) {
        event.preventDefault();
        inputRef.current?.focus();
        inputRef.current?.select();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [inputRef, key]);
}

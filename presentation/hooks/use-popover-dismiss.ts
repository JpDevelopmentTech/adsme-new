"use client";

import { useEffect, useRef, useState } from "react";
import type { PopoverDismissState } from "@/types/nomina-period.types";

/** Abre y cierra un popover; se cierra con Escape o al hacer clic fuera de su contenedor. */
export function usePopoverDismiss(): PopoverDismissState {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setIsOpen(false);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return { isOpen, setIsOpen, toggle: () => setIsOpen((open) => !open), containerRef };
}

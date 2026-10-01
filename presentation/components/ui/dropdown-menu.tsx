"use client";

import { useEffect, useRef, useState } from "react";
import type { DropdownMenuProps } from "@/types/ui.types";
import { cn } from "@/utils/cn";

/** Menú flotante genérico: se cierra al pulsar Escape o al hacer clic fuera. */
export function DropdownMenu({
  trigger,
  children,
  align = "start",
  side = "top",
  label,
}: DropdownMenuProps) {
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

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label={label}
        onClick={() => setIsOpen((open) => !open)}
        className="w-full cursor-pointer rounded-[16px] text-left focus-visible:ring-2 focus-visible:ring-lilac focus-visible:outline-none"
      >
        {trigger(isOpen)}
      </button>

      {isOpen ? (
        <div
          role="menu"
          // Elegir una opción cierra el menú, pero en la siguiente tarea: React
          // aplica el cambio en una microtarea, antes de que el navegador envíe
          // el formulario del botón pulsado, y un formulario ya desmontado se
          // cancela sin avisar — «Desconectar» o «Cerrar sesión» no hacían nada.
          onClick={() => window.setTimeout(() => setIsOpen(false))}
          className={cn(
            "glass-menu absolute z-20 min-w-full rounded-[16px] p-1.5",
            side === "top" ? "bottom-full mb-2" : "top-full mt-2",
            align === "end" ? "right-0" : "left-0",
          )}
        >
          {children}
        </div>
      ) : null}
    </div>
  );
}

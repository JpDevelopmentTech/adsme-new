"use client";

import { useEffect } from "react";
import { LoaderBars } from "@/presentation/components/ui/loader-bars";
import type { ScreenLoaderProps } from "@/types/ui.types";

/**
 * Lámina de espera a pantalla completa. Se usa cuando la acción rehace datos
 * repartidos por toda la pantalla y un botón ocupado no basta: tapa la interfaz
 * entera, así que no se puede pulsar nada más ni lanzar la acción dos veces.
 */
export function ScreenLoader({ isActive, title, hint }: ScreenLoaderProps) {
  // La lámina tapa los clics, pero no la rueda: sin esto el contenido sigue
  // desplazándose por debajo mientras se espera.
  useEffect(() => {
    if (!isActive) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previous;
    };
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy
      className="fixed inset-0 z-50 grid place-items-center bg-ink/45 px-5 backdrop-blur-sm"
    >
      <div className="glass-panel flex flex-col items-center gap-3.5 rounded-card px-9 py-8 text-center text-accent">
        <LoaderBars />

        <span className="flex flex-col gap-1">
          <span className="font-display text-[15px] font-normal tracking-[-0.2px] text-text-primary">
            {title}
          </span>
          {hint ? (
            <span className="text-[12px] text-text-secondary">{hint}</span>
          ) : null}
        </span>
      </div>
    </div>
  );
}
